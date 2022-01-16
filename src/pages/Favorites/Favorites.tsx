import React, { useContext, useEffect, useState } from 'react';
import { API_KEY } from '../../api/apiConfig';
import { mapApiResponse } from '../../api/apiUtils';
import MoviesList from '../../components/MoviesCards';
import { ThemeContext } from '../../context/ThemeProvider';
import store from '../../redux/store/store';
import { Movie } from '../../types/Movie';
import scss from './Favorites.module.scss';

const Favorites = () => {
    const {theme} = useContext(ThemeContext)
    const [movies, setMovies] = useState<Movie[]>([]);
    const userFavorites = Object.values(store.getState().favoritesSlice.entities)
    useEffect(() => {
        setMovies([]);
        userFavorites.forEach(item => {
            fetch(
                `https://api.themoviedb.org/3/movie/${item?.movie}?api_key=${API_KEY}&language=en-US`            
            )
            .then(res => res.json())
            .then(res => setMovies(existing => [...existing, mapApiResponse(res)]))
        })
    }, [])

    return (
        <div className={movies.length > 0 ? scss.favoritesBlock : scss.favoritesBlock_nothing}>
            <h2 className={theme === "dark" ? scss.favTextColor : ''}>Favorites</h2>
            {movies.length > 0 ? (
                <MoviesList results={movies}/>
            ) : (
                <p className={theme === "dark" ? scss.favTextColor : ''}>Nothing found</p>
            )}
        </div>
    );
};

export default Favorites;
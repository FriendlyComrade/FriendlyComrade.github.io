import {  useEffect, useState } from "react";
import {moviesAPI} from "../../redux/services/MovieService";
import { Movie } from "../../types/Movie";
import MovieItem from "../MovieItem/MovieItem";
import scss from './MoviesList.module.scss';

interface ListProps {
    results: Movie[]
}

const MoviesList = (props: ListProps ) => {
    const {results} = props;
    // const [pageNumber, setPageNumber] = useState(1)
    // const {data: moviesData = []} = moviesAPI.useGetPopularMoviesQuery(pageNumber)
    // const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    // const [fetching, setFething] = useState<boolean>(false)
    
    // useEffect (() => {
    //     if (fetching) {
    //         setPageNumber(prevNumber => prevNumber + 1)
    //         setPopularMovies([...popularMovies, ...moviesData])
    //         setFething(false)
    //     }
    // }, [fetching])


    // useEffect (() => {
    //     document.addEventListener('scroll', scrollHandler);
    //     return function () {
    //         document.removeEventListener('scroll', scrollHandler);
    //     }
    // }, [])


    // const scrollHandler = (e: any): void => {
    //     if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
    //             setFething(true)
    //             console.log('scroll')
    //     }
    // }

        return (
            <div className={scss.moviesBlock}>
                <div className={scss.wrapper}>      
                    <ul>
                        {results?.map((item, index) =>
                            <MovieItem key={index} {...item}/>
                        )} 
                    </ul>
                </div>
            </div>
        );
    // }
};

export default MoviesList;
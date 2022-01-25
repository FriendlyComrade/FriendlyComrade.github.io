import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TMDB_IMAGE_PATH } from '../../api/apiConfig';
import { ThemeContext } from '../../context/ThemeProvider';
import { Movie } from '../../types/Movie';
import scss from './MovieItem.module.scss'

const MovieItem = ({ id, title, posterPath, releaseDate, voteAverage }: Movie) => {
    
    const {theme} = useContext(ThemeContext);
    const path = `/movie/${id}`;

let image;
if (!posterPath) {
    image = (
        <>
            <img
            src={'https://images.pexels.com/photos/1446948/pexels-photo-1446948.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}  
            className={scss.noImage}
            alt={title}
            />
            <strong className={scss.strong}>No image</strong>
        </>
    )
} else {
    image = (
        <img 
        src={`${TMDB_IMAGE_PATH}${posterPath}`} 
        className={scss.movieImg}
        alt={title}
        />
    )
}


    return (
            <li className={scss.movieCard} key={id}>
                <Link to={path}>
                    {image}
                </Link>
                    <div className={theme === "light" ? scss.cardTextBlock__light : scss.cardTextBlock__dark}>
                        <p>{title}<span>{releaseDate}</span></p>
                        <p>Rated: <span>{voteAverage}</span></p>
                    </div>

            </li>
    );
};

export default MovieItem;
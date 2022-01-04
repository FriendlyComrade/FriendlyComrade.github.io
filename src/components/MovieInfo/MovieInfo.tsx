import scss from './MovieInfo.module.scss'
import { TMDB_IMAGE_PATH } from "../../api/apiConfig";
import { MovieInfoType } from "../../types/MovieInfoType";
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeProvider';

// credits: {
//     cast: Actors[],
//     crew: Director[]
// }

function MovieInfo (movie:MovieInfoType){
    const {theme} = useContext(ThemeContext)
    const {title, releaseDate, voteAverage, backdropPath, posterPath, credits, countries} = movie;

        const {cast, crew} = credits;    
        const filterActors =  cast?.filter(obj => obj.known_for_department === "Acting")
        const sliceActors = filterActors?.slice(0, 12).map(actor => actor.name) 
        const actors =  sliceActors?.join(', ')

        const findDirectors = crew?.filter(obj => obj.job === "Director")
        .map(director => director.name)
        const directors = findDirectors?.join(', ')
        
        const country = movie?.countries?.map(obj => obj.name).join(', ');

        return (
            <div 
            className={theme === "light" ? scss.movieDescBlock : scss.movieDescBlock__dark}
            style={{backgroundImage: `url(${TMDB_IMAGE_PATH}${backdropPath})`}}
            >
                <img 
                src={`${TMDB_IMAGE_PATH}${posterPath}`} 
                className={scss.movieInfoImg}
                alt={movie?.title}
                />
                <div className={scss.movieDescText}>
                    <div>
                        <p>{title}</p>
                    </div>
                    <div>
                        <p>Year: 
                            <span>{releaseDate}</span>
                        </p>
                        <p>Rated: 
                            <span>{voteAverage}</span>
                        </p>
                    </div>
                    <p>Country:
                        <span>{country}</span>
                    </p>
                    <p>Director:
                        <span>{directors}</span>
                    </p>
                    <p>Actors: 
                        <span>{actors}</span>
                    </p>
                    <p>Plot: 
                        <span>{movie?.overview}</span>
                    </p>
                        
                </div>
                <div className={scss.maska}></div>
            </div>
        );
};

export default MovieInfo;
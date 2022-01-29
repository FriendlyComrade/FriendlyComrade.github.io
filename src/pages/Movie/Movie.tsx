import { useParams } from 'react-router';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieInfo from '../../components/MovieInfo';
import { useGetMovieInfoQuery } from '../../redux/services/MovieService';
import { MovieInfoType } from '../../types/MovieInfoType';
import scss from './Movie.module.scss'
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeProvider';
import MainLoader from '../../components/MainLoader/MainLoader';


const Movie = () => {
    const { theme } = useContext(ThemeContext)
    const {id = 0} = useParams();
    const {data: film, isFetching, isSuccess, isError} = useGetMovieInfoQuery(+id)

    return (
        <div className={scss.movieInfoPage}>
            <div className={scss.wrapper}>
                {isFetching &&
                    <MainLoader theme={theme}/>
                }
                {isSuccess && <MovieInfo {...(film as MovieInfoType)}/>}
                {isError && <ErrorMessage/>}
            </div>

        </div>
    );
};

export default Movie;
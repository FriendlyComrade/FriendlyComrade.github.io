import { moviesAPI } from '../../redux/services/MovieService';


const FilmsConteiner = () => {
    const {data} = moviesAPI.useFetchAllMoviesQuery('')
    const movies = data?.results

    return (
        <>
            {movies && movies.map(movie => 
                <div key={movie.id}>
                    <img 
                        alt='img' 
                        src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                    ></img>
                </div>
            )}
        </>
    );
};

export default FilmsConteiner;
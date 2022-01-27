import scss from './MovieInfo.module.scss'
import { TMDB_IMAGE_PATH } from "../../api/apiConfig";
import { MovieInfoType } from "../../types/MovieInfoType";
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeProvider';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { useNavigate } from 'react-router';
import { addFav, removeFav } from '../../redux/store/slices/favorites/favoritesSlice';
import fullHeartIcon from '../../assets/images/full-heart.png'
import heartIcon from '../../assets/images/heart.png'

function MovieInfo (movie:MovieInfoType){
    const navigator = useNavigate()
    const dispatch = useDispatch()

    const {theme} = useContext(ThemeContext)
    const {
        id, 
        title, 
        releaseDate, 
        voteAverage, 
        backdropPath, 
        posterPath, 
        credits, 
        overview, 
        videos} = movie;

    const favoritesList = useSelector(
        (state: RootState) => Object.values(state.favoritesSlice.entities),
        shallowEqual
    )
    const currentUserID = useSelector(
        (state: RootState) => state.userSlice.id,
        shallowEqual
    )

    const favIcon = (favoritesList.find(item => item?.movie === id)) ?
        fullHeartIcon :
        heartIcon 

    const toggleFavorites = () => {
        if (currentUserID === 0) {
            navigator("/signin");
            return;
        } else {
            if (favoritesList.find(item => item?.movie === id)) {
                dispatch(removeFav(id))
            } else {
                dispatch(addFav({id: id, movie: id}))
            }
        }
    }

    const {cast, crew} = credits;    
    const filterActors =  cast?.filter(obj => obj.known_for_department === "Acting")
    const sliceActors = filterActors?.slice(0, 12).map(actor => actor.name) 
    const actors =  sliceActors?.join(', ')

    const findDirectors = crew?.filter(obj => obj.job === "Director")
    .map(director => director.name)
    const directors = findDirectors?.join(', ')
    
    const country = movie?.countries?.map(obj => obj.name).join(', ');

    const trailerVideo = videos?.results[0]?.key

    let trailer;
    if (trailerVideo) {
        trailer = (
            <iframe
                title={title}
                className={scss.trailerBlock}
                src={`https://www.youtube.com/embed/${trailerVideo}`}
                allowFullScreen
                >
            </iframe>   
        ) 
    } else {
        trailer = null 
    }

    let image;
    if (!posterPath) {
    image = (
        <>
            <img
            src={'https://images.pexels.com/photos/1446948/pexels-photo-1446948.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}  
            className={scss.movieInfoImg}
            alt={title}
            />
            <figcaption className={scss.noImageText}>No image</figcaption>
        </>
    )
    } else {
    image = (
        <img 
        src={`${TMDB_IMAGE_PATH}${posterPath}`} 
        className={scss.movieInfoImg}
        alt={`${title}-img`}
        />
    )
    }


        return (
            <div className={scss.infoConteiner}>
                <div 
                className={theme === "light" ? scss.movieDescBlock : scss.movieDescBlock__dark}
                style={backdropPath ? {backgroundImage: `url(${TMDB_IMAGE_PATH}${backdropPath})`} :
                    {backgroundImage: `url(https://images.unsplash.com/photo-1514306191717-452ec28c7814?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80})`}}
                >
                    <div className={scss.movieInfoImgWrapper}>                        
                        {/* <img 
                        src={`${TMDB_IMAGE_PATH}${posterPath}`} 
                        className={scss.movieInfoImg}
                        alt={`${title}-img`}
                        /> */}
                        {image}
                        <h3>{title}</h3>
                        <div className={scss.favoriteConteiner}>
                            <img onClick={toggleFavorites} src={favIcon} alt="favorite-img"/>
                        </div>
                        
                    </div>
                    <div className={scss.movieDescText}>
                        <div> <p>{title}</p> </div>
                        <div>
                            <p>Year: <span>{releaseDate}</span> </p>
                            <p>Rated: <span>{voteAverage}</span> </p>
                        </div>
                        <p>Country: <span>{country}</span> </p>
                        <p>Director:<span>{directors}</span> </p>
                        <p>Actors: <span>{actors}</span> </p>
                    </div>
                    <div className={scss.maska}></div>
                </div>
                <div className={theme === "light" ? scss.overviewBlock : scss.overviewBlock_dark}>
                        <p className={scss.mobMovieDesc}>Year: </p> 
                        <span className={scss.mobMovieDesc}>{releaseDate}</span> 
                        <p className={scss.mobMovieDesc}>Rated: </p> 
                        <span className={scss.mobMovieDesc}>{voteAverage}</span> 
                        <p className={scss.mobMovieDesc}>Country: </p> 
                        <span className={scss.mobMovieDesc}>{country}</span> 
                        <p className={scss.mobMovieDesc}>Director:</p> 
                        <span className={scss.mobMovieDesc}>{directors}</span> 
                    <p className={scss.movieDescActors}>Actors:</p> 
                    <span className={scss.movieDescActors}>{actors}</span>
                    <p>Plot</p><span>{overview}</span> 
                </div>
                {trailer}
            </div>

        );
};

export default MovieInfo;
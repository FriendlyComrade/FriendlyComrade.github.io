import { Movie } from "../../types/Movie";
import { TMDB_IMAGE_PATH } from '../../api/apiConfig';
import scss from './Slider.module.scss';
import { Link } from "react-router-dom";


interface TypeSlider {
    slides: Movie[],
    current: number,
}

const ShowSlide = ({slides, current}:TypeSlider):JSX.Element => {
    
    return (
        <>
            {slides.map((slide, index) =>
                <div 
                className={index === current ? scss.slideActive : scss.slide}
                key={index}
                >
                    <Link to={`/movie/${slide.id}`}>
                        {index === current && 
                            <img 
                            src={`${TMDB_IMAGE_PATH}${slide.backdropPath}`} 
                            alt={`${slide.title}-img`}
                            /> }
                            <p className={scss.slideCaption}>{slide.title}</p>
                    </Link>
                </div>
            )}
        </>
    );

    

};

export default ShowSlide;
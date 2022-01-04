import Loader from "react-loader-spinner";
import { Movie } from "../../types/Movie";
import { TMDB_IMAGE_PATH } from '../../api/apiConfig';
import scss from './Slider.module.scss';


interface TypeSlider {
    slides: Movie[],
    current: number,
}

const ShowSlide = ({slides, current}:TypeSlider):JSX.Element => {


        // return (
        //     <Loader
        //         type="Bars"
        //         color="#00BFFF"
        //         height={300}
        //         width={400}
        //         timeout={3000} //3 secs
        //     />
        // )


    return (
        <>
            {slides.map((slide, index) =>
                <div 
                className={index === current ? scss.slideActive : scss.slide}
                key={index}
                >
                    {index === current && 
                    <img 
                    src={`${TMDB_IMAGE_PATH}${slide.backdropPath}`} 
                    alt={`${slide.title}-img`}
                    /> }
                    <p className={scss.slideCaption}>{slide.title}</p>
                </div>
            )}
        </>
    );

    

};

export default ShowSlide;
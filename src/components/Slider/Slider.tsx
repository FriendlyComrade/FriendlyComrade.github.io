import React, { useContext, useState, MouseEvent} from 'react';
import { ThemeContext } from '../../context/ThemeProvider';
import { moviesAPI } from '../../redux/services/MovieService';
import scss from './Slider.module.scss';
import {IoIosArrowForward, IoIosArrowBack} from 'react-icons/io'
import ShowSlide from './ShowSlide';


const Slider = ():JSX.Element => {

    const {theme} = useContext(ThemeContext)
    const {data: movies = []} = moviesAPI.useGetPopularMoviesQuery(1)
    const [current, setCurrent] = useState(0);
    const [activeDot, setActiveDot] = useState(null);
    const slides = movies?.slice(0,15)

    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1)
    }

    const handleActiveDot = (i: number) => {
        setCurrent(i)
    }

    return (
        <div className={scss.sliderBlock}>
            <div className={scss.wrapper}>
                <div className={scss.sliderConteiner}>
                    <IoIosArrowBack className={scss.leftArrow} onClick={prevSlide}/>
                    <IoIosArrowForward className={scss.rightArrow} onClick={nextSlide}/>
                    <ShowSlide slides={slides} current={current}/>  
                    <div className={scss.sliderDotsBlock}>
                        {slides.map((slide, index) => 
                            <div 
                            className={index === current ? scss.sliderDot__active : scss.sliderDot}
                            onClick={() => handleActiveDot(index)}
                            key={index}
                            >
                            </div>
                        )}
                    </div>
                </div>
                <div className={theme === "light" ? scss.shadow__light : scss.shadow__dark}></div>
            </div>
        </div>
    );
};

export default Slider;
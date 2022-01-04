import React, { Suspense, useContext, useEffect, useState } from 'react';
import { TMDB_IMAGE_PATH } from '../../api/apiConfig';
import { ThemeContext } from '../../context/ThemeProvider';
import { moviesAPI } from '../../redux/services/MovieService';
import scss from './Slider.module.scss';
import {IoIosArrowForward, IoIosArrowBack} from 'react-icons/io'
import ShowSlide from './ShowSlide';


const Slider = ():JSX.Element => {

    const {theme} = useContext(ThemeContext)
    const {data: movies = []} = moviesAPI.useGetPopularMoviesQuery(1)
    const [current, setCurrent] = useState(0)
    const slides = movies?.slice(0,19)

    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1)
    }

    return (
        <div className={scss.sliderBlock}>
            <div className={scss.wrapper}>
                <div className={scss.sliderConteiner}>
                    <IoIosArrowBack className={scss.leftArrow} onClick={prevSlide}/>
                    <IoIosArrowForward className={scss.rightArrow} onClick={nextSlide}/>
                    <ShowSlide slides={slides} current={current}/>                        
                </div>
                <div className={theme === "light" ? scss.shadow__light : scss.shadow__dark}></div>
            </div>
        </div>
    );
};

export default Slider;
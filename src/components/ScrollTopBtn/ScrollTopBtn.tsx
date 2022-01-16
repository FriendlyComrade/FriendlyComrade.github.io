import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeProvider';
import scss from './ScrollTopBtn.module.scss';

const ScrollTopBtn = () => {
    const [scrollToTopBtnVisible, setScrollToTopBtnVisible] = useState<boolean>(false)

    const {theme} = useContext(ThemeContext)

    const toggleVisibility = () => {
        if (window.scrollY > 2700) {
            setScrollToTopBtnVisible(true)          
        } else {
            setScrollToTopBtnVisible(false)
        }
    }

    let btnScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    useEffect (() => {
        window.addEventListener('scroll', toggleVisibility);
        return function () {
            window.removeEventListener('scroll', toggleVisibility);
        }
    }, [])

    let targetBtn;
    if (theme === 'light') {
        targetBtn = (
            <img src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-rocket-business-kiranshastry-solid-kiranshastry.png"
            onClick={btnScrollToTop}
            className={scss.btnUp}
            alt="btnToTop-img"
            />
        )
    } else {
        targetBtn = (
            <img src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-rocket-business-kiranshastry-gradient-kiranshastry.png"
            onClick={btnScrollToTop}
            className={scss.btnUp}
            alt="btnToTop-img"
            />
        )
    }

    return (
        <>
            {scrollToTopBtnVisible ?
            targetBtn :                
            null} 
        </>
    );
};

export default ScrollTopBtn;
import {  useEffect, useState } from "react";
import {moviesAPI} from "../../redux/services/MovieService";
import { Movie } from "../../types/Movie";
import MovieItem from "../MovieItem/MovieItem";
import ScrollTopBtn from "../ScrollTopBtn";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import scss from './MoviesList.module.scss';

interface ListProps {
    results: Movie[]
}

const MoviesList = (props: ListProps ) => {
    const {results} = props;

        return (
            <>
            <div className={scss.moviesBlock}>
                <div className={scss.wrapper}>      
                    <ul>
                        {results?.map((item, index) =>
                            <MovieItem key={index} {...item}/>
                        )} 
                    </ul>
                    <ScrollTopBtn />
                </div>
            </div>

            </>

        );
    // }
};

export default MoviesList;
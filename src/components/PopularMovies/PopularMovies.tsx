import {  useEffect, useState, useRef } from "react";
import {moviesAPI} from "../../redux/services/MovieService";
import { Movie } from "../../types/Movie";
import MoviesList from "../MoviesCards";

const PopularMovies = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const {data: moviesData = [], isFetching} = moviesAPI.useGetPopularMoviesQuery(pageNumber)
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [fetching, setFething] = useState<boolean>(false)

    useEffect(() => {
      setPopularMovies([...popularMovies, ...moviesData])
      setFething(true)
    }, [pageNumber])

    const pageEnd = useRef<HTMLLIElement>(null);

    useEffect(()=>{
        if(fetching){
          const observer = new IntersectionObserver(entries =>{
            if(entries[0]?.isIntersecting){
              setPageNumber(prevPage => prevPage + 1)
              if(pageNumber >= 500){
                if (pageEnd && pageEnd.current) {
                    observer?.unobserve(pageEnd?.current)
                }                
              }
            }
    
          },{ threshold: 0});
          if (pageEnd && pageEnd.current) {
            observer?.observe(pageEnd?.current)
          }

        }
    
      },[fetching])

    return (
        <>
            <MoviesList results={popularMovies}/>
            <li ref={pageEnd} className="observer-element"></li>
            
        </>
    );
};

export default PopularMovies;
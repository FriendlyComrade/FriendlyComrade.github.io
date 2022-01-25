import {useContext, useEffect, useState, useRef} from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MainLoader from "../../components/MainLoader/MainLoader";
import MoviesList from "../../components/MoviesCards";
import SearchBlock from "../../components/SearchBlock";
import { ThemeContext } from "../../context/ThemeProvider";
import { useQuery } from "../../redux/hooks/redux";
import {useGetFoundMoviesQuery } from "../../redux/services/MovieService";
import { Movie } from "../../types/Movie";
import scss from "./Search.module.scss"

const Search = ():JSX.Element => {
    const {theme} = useContext(ThemeContext)
    const query = useQuery();
    const searchQuery = query.get("query") || ""

    const [pageNumber, setPageNumber] = useState(1)    
    const {
        data: movies = [],
        isFetching,
        isSuccess,
        isError
    } = useGetFoundMoviesQuery({page:pageNumber, title: searchQuery}, {skip: !searchQuery}) 
    // , {skip: !searchQuery}

    const [foundMovies, setFoundMovies] = useState<Movie[]>([]);
    const [fetching, setFetching] = useState<boolean>(false)

    // useEffect(() => {
    //     setFoundMovies([...movies.slice(0)])
    // }, [])

    // useEffect (() => {
    //     if (fetching) {
    //         setPageNumber(prevNumber => prevNumber + 1)
    //         setFoundMovies([...foundMovies, ...movies])
    //         setFetching(false)
    //         console.log(foundMovies)
    //     }
    // }, [fetching])

    // useEffect (() => {
    //     document.addEventListener('scroll', scrollHandler);
    //     return function () {
    //         document.removeEventListener('scroll', scrollHandler);
    //     }
    // }, [])


    // const scrollHandler = (e: any): void => {
    //     if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
    //             setFetching(true)
    //     }
    // }

    useEffect(() => {
        setFoundMovies([...foundMovies, ...movies])
        setFetching(true)
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

    let searchResults;
    if(isSuccess) {
        searchResults = 
            movies.length > 0 ? (
                <>
                    <MoviesList results={[...foundMovies]}/> 
                </>
            ) : (
                <p>Nothing found..</p>
            )
    }

    return (
        <>  
            <SearchBlock/>
            {searchQuery && 
            <h3 className={theme ==='light' ? scss.searchResults: scss.searchResults__dark}>Search results</h3>
            }
            {isFetching && <MainLoader theme={theme}/>}
            {isSuccess && searchResults}
            <li ref={pageEnd} className="observer-element"></li>  
            {isError && <ErrorMessage/>}
        </>
    );
};

export default Search;
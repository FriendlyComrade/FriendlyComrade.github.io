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

    console.log(movies)

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
                if(movies.length < 20){
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

    let nothingFound = movies.length > 0 ? (
        <p className={theme ==='light' ? scss.searchResults : scss.searchResults__dark}>Nothing found.</p>
    ) : null

    return (
        <div className={scss.searchPage}>  
            <SearchBlock/>
            {searchQuery && 
            <h3
            id='searchRes'
            className={theme ==='light' ? scss.searchResults : scss.searchResults__dark}>
                Search results
            </h3>
            }
            {isFetching && <MainLoader theme={theme}/>}
            {isError && <ErrorMessage/>}
            {isSuccess && <MoviesList results={foundMovies}/>}
            {nothingFound}
            <li ref={pageEnd} className="observer-element"></li> 
        </div>
    );
};

export default Search;
import { useCallback, useContext, useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MoviesList from "../../components/MoviesCards";
import SearchBlock from "../../components/SearchBlock";
import { ThemeContext } from "../../context/ThemeProvider";
import { useQuery } from "../../redux/hooks/redux";
import { moviesAPI, useGetFoundMoviesQuery } from "../../redux/services/MovieService";
import { Movie } from "../../types/Movie";
import scss from "./Search.module.scss"

const Search = ():JSX.Element => {
    console.log('перерендер')

    const {theme} = useContext(ThemeContext)
    const query = useQuery();
    const searchQuery = query.get("query") || ""

    const [pageNumber, setPageNumber] = useState(1)    
    const {
        data: movies = [],
        isFetching,
        isSuccess,
        isError
    } = useGetFoundMoviesQuery({page:pageNumber, title: searchQuery}) 
    // , {skip: !searchQuery}

    const [foundMovies, setFoundMovies] = useState<Movie[]>([]);
    const [fetching, setFetching] = useState<boolean>(false)

    useEffect(() => {
        setFoundMovies([...movies.slice(0)])
    }, [])
    useEffect (() => {
        if (fetching) {
            setPageNumber(prevNumber => prevNumber + 1)
            setFoundMovies([...foundMovies, ...movies])
            setFetching(false)
            console.log(foundMovies)
        }
    }, [fetching])

    useEffect (() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [])


    const scrollHandler = (e: any): void => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
                setFetching(true)
        }
    }

    let searchResults;
    if(isSuccess) {
        searchResults = 
            movies.length > 0 ? (
                <MoviesList results={foundMovies}/>  
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
            {/* {isFetching && <Spinner} */}
            {isSuccess && searchResults}
            {isError && <ErrorMessage/>}
        </>
    );
};

export default Search;
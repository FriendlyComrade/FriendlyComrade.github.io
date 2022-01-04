import { useContext } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MoviesList from "../../components/MoviesCards";
import SearchBlock from "../../components/SearchBlock";
import { ThemeContext } from "../../context/ThemeProvider";
import { useQuery } from "../../redux/hooks/redux";
import { useGetFoundMoviesQuery } from "../../redux/services/MovieService";
import scss from "./Search.module.scss"

const Search = ():JSX.Element => {
    const {theme} = useContext(ThemeContext)
    const query = useQuery();
    const searchQuery = query.get("query") || ""

    const {
        data: movies = [],
        isFetching,
        isSuccess,
        isError
    } = useGetFoundMoviesQuery(searchQuery, {skip: !searchQuery})

    let searchResults;
    if(isSuccess) {
        searchResults = 
            movies.length > 0 ? (
                <MoviesList results={movies}/>
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
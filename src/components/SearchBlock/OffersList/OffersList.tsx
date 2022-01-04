import { useGetFoundMoviesQuery } from "../../../redux/services/MovieService";
import scss from "./OffersList.module.scss"
import OffersListItem from "./OffersListItem";


type OffersListTypes = {
    searchFilms: string
}

const OffersList = ({searchFilms}: OffersListTypes) => {
    const {
        data: movies = [],
        isFetching,
        isSuccess,
        isError
    } = useGetFoundMoviesQuery(searchFilms)

    let content;
    if(isFetching) {
        content = (
            <li className={scss.searchList__item_loading}>
                Loading...
            </li>
        )
    } else if(isSuccess) {
        content =
            movies.length > 0 ? (
                movies
                    .slice(0,5)
                    .map(movie => <OffersListItem key={movie.id} {...movie}/>)
            ) : (
                <li className={scss.searchList__item_nothing}>
                    Nothing found
                </li>
            )
    } else if (isError) {
        <li className={scss.searchList__item_error}>
            Nothing found
        </li>
    }

    return (
        <div className={scss.searchList}>
            <ol className={scss.searchList__offers}>{content}</ol>
        </div>
    );
};

export default OffersList;
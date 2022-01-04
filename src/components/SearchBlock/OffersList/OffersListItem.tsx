import { Link } from "react-router-dom";
import { Movie } from "../../../types/Movie";
import scss from "./OffersList.module.scss"

const OffersListItem = ({id, title, releaseDate:year}: Movie) => {
    const path = `/movie/${id}`
    return (
        <li className={scss.searchList__item}>
            <Link to={path}>{`${title} (${year})`}</Link>
        </li>
    );
};

export default OffersListItem;
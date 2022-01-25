import { useContext } from 'react';
import { useSelector } from 'react-redux';
import SearchHistoryList from '../../components/SearchHistoryList/SearchHistoryList';
import { ThemeContext } from '../../context/ThemeProvider';
import { RootState } from '../../redux/store/store';
import scss from './History.module.scss';

const SEARCH_PATH = "/search?query=";

const History = () => {
    const {theme} = useContext(ThemeContext)
    const searchHistory = useSelector((state: RootState) => 
        Object.values(state.historySlice.entities)
    )

    const historyResult = searchHistory.map((searchText) => ({
        path: SEARCH_PATH + searchText?.query.trim().replaceAll(" ", "+"),
        text: searchText?.query || "" 
    }))
    return (
    <div className={scss.history_page}>
        <h2 className={theme === "light" ? scss.history_page__title : scss.history_page__title_dark}>Search history</h2>
        <SearchHistoryList results={historyResult} />
    </div>
    );
};

export default History;
import { useSelector } from 'react-redux';
import SearchHistoryList from '../../components/SearchHistoryList/SearchHistoryList';
import { RootState } from '../../redux/store/store';

const SEARCH_PATH = "/search?query=";

const History = () => {
    const searchHistory = useSelector((state: RootState) => 
        Object.values(state.historySlice.entities)
    )

    const historyResult = searchHistory.map((searchText) => ({
        path: SEARCH_PATH + searchText?.query.trim().replaceAll(" ", "+"),
        text: searchText?.query || "" 
    }))
    return (
    <div className="history-page">
        <h2 className="history-page__title">Search history</h2>
        <SearchHistoryList results={historyResult} />
    </div>
    );
};

export default History;
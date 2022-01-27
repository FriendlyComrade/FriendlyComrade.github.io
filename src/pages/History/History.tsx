import { useContext } from 'react';
import { useSelector } from 'react-redux';
import SearchHistoryList from '../../components/SearchHistoryList/SearchHistoryList';
import { ThemeContext } from '../../context/ThemeProvider';
import { RootState } from '../../redux/store/store';
import scss from './History.module.scss';

const SEARCH_PATH = "/search?query=";

interface historyResProps {
    path: string,
    text: string
}

const History = () => {
    const {theme} = useContext(ThemeContext)
    const searchHistory = useSelector((state: RootState) => 
        Object.values(state.historySlice.entities)
    )

    const history = searchHistory.map((searchText) => ({
        path: SEARCH_PATH + searchText?.query.trim().replaceAll(" ", "+"),
        text: searchText?.query || "" 
    }))

    const filteredHistoryResult = history.reduce((uniq:historyResProps, value:historyResProps) => uniq.hasOwnProperty(value.text.toLowerCase())
    ? uniq : {...uniq, [value.text.toLowerCase()]: value.path}, {} as historyResProps)

    let historyResult:historyResProps[] = [];
    for (let [title, query] of Object.entries(filteredHistoryResult)){
        title = title[0].toUpperCase() + title.slice(1)
        historyResult.push({path: query, text: title.length > 20 ? title.slice(0, 17) + '...' : title})
    }

    return (
    <div className={scss.history_page}>
        <h2 className={theme === "light" ? scss.history_page__title : scss.history_page__title_dark}>Search history</h2>
        <SearchHistoryList results={historyResult} />
    </div>
    );
};

export default History;
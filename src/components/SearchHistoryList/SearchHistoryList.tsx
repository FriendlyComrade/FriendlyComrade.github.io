import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeProvider';
import scss from './SearchHistoryList.module.scss';

type HistoryResults = {
    path: string | any;
    text: string | any;
  };
  
  type SearchHistoryListProps = {
    results: HistoryResults[];
  };

const SearchHistoryList = (props: SearchHistoryListProps) => {
    const {theme} = useContext(ThemeContext)
    const { results } = props;

    return (
      <ol className={theme === "light" ? scss.search_history__list : scss.search_history__list_dark}>
        {results.map(({ path, text }) => (
          <li key={path}>
            <Link to={path}>{text}</Link>
          </li>
        ))}
      </ol>
    );
  };
export default SearchHistoryList;
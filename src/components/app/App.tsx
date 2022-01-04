import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeProvider';
import {Routes, Route} from 'react-router-dom'
import Header from '../Header';
import scss from './App.module.scss';
import Home from '../../pages/Home';
import Movie from '../../pages/Movie/Movie';
import Search from '../../pages/Search';

function App(): JSX.Element {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={theme === "light" ? scss.App_light : scss.App_dark}>
      <ErrorBoundary>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/movie/:id" element={<Movie/>}/>
            <Route path="/search" element={<Search/>}/>
          </Routes> 
      </ErrorBoundary>

    </div>
  );
}

export default App;

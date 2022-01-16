import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeProvider';
import {Routes, Route} from 'react-router-dom'
import Header from '../Header';
import scss from './App.module.scss';
import Home from '../../pages/Home';
import Search from '../../pages/Search';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import AuthForm from '../../pages/AuthForm';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Favorites from '../../pages/Favorites';
import Movie from '../../pages/Movie/Movie';
import History from '../../pages/History';

function App(): JSX.Element {
  const { theme } = useContext(ThemeContext)

// let div = document.createElement('div');
// div.style.overflowY = 'scroll';
// div.style.width = '50px';
// div.style.height = '50px';

// document.body.append(div);
// let scrollWidth = div.offsetWidth - div.clientWidth;

// div.remove();

// alert(scrollWidth);

  return (
    <div className={theme === "light" ? scss.App_light : scss.App_dark}>
      <ErrorBoundary>
      <ScrollToTop />
        <Header/>
          <Routes>
            <Route path="/signin" element={<AuthForm isLoginPage={true}/>}/>
            <Route path="/signup" element={<AuthForm isLoginPage={false}/>}/>
            <Route path="/favorites" element= {
              <PrivateRoute component={<Favorites/>} redirectPath="/signin"/>
            }/>
            <Route path="/history" element= {
              <PrivateRoute component={<History/>} redirectPath="/signin"/>
            }/>
            <Route path="/" element={<Home/>}/>
            <Route path="/movie/:id" element={<Movie/>}/>
            <Route path="/search" element={<Search/>}/>
          </Routes> 
      </ErrorBoundary>
      
    </div>
  );
}

export default App;

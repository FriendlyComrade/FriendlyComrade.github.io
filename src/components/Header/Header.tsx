import { useContext } from 'react';
import NavBtns from '../NavBtns';
import scss from './Header.module.scss'
import logoLight from '../../assets/images/logo.png'
import logoDark from '../../assets/images/logo-dark.png'
import sun from '../../assets/images/sun.png'
import moon from '../../assets/images/moon.png'
import { ThemeContext } from '../../context/ThemeProvider';
import { Link } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { resetUser } from '../../redux/store/slices/user/userSlice';

const Header = (): JSX.Element => {
    const dispatch = useDispatch()
    const email = useSelector(
        (state: RootState) => state.userSlice.email,
        shallowEqual
        )

    const signOut = (): void => {
        dispatch(resetUser())
    }

    const {theme, toggleTheme} = useContext(ThemeContext)
    const ThemeSwitcher = (
        <input
            type="image"
            className={theme === "light" ? scss.themeButtonDark : scss.themeButtonLight}
            src={theme === "light" ? moon : sun}
            onClick={toggleTheme}
            alt="theme button"
        />
    )

    let headerBtns;
    if (email.length > 1) {
        headerBtns = (
        <div className={scss.headerRightSideContent}>
            <div className={scss.navBtnsBlock_user}>
                <Link to='/favorites'>
                    <NavBtns value="Favorites" theme={theme}/>
                </Link>
                <Link to='/history'>                    
                    <NavBtns value="History" theme={theme}/>
                </Link>
                <Link to='/'>                    
                    <NavBtns value="Sign Out" theme={theme} handleClick={signOut}/>
                </Link>
            </div>
            <span className={theme === "light" ? scss.emailStyle : scss.emailStyle_dark}>
                {email}
            </span>
            <div className={scss.themeBtnBlock}>
                {ThemeSwitcher}
            </div>
        </div>    
        )
    } else {
        headerBtns = (
            <div className={scss.headerRightSideContent}>
                <div className={scss.navBtnsBlock}>
                    <Link to='/signin'>
                        <NavBtns value="Sign In" theme={theme}/>
                    </Link>
                    <Link to='/signup'>                    
                        <NavBtns value="Sign Up" theme={theme}/>
                    </Link>
                </div>
                <div className={scss.themeBtnBlock}>
                    {ThemeSwitcher}
                </div>
            </div>            
        )
    }

    return (
        <header className={ theme === "light" ? scss.principalHeader__light : scss.principalHeader__dark}>
            <div className={scss.wrapper}>
                <Link to="/">
                    <div>                      
                        <img 
                        src={ theme === "light" ? logoLight : logoDark} 
                        className={scss.logo} 
                        alt="logo-img"/>
                        <p className={theme === "light" ? scss.logoTextLight : scss.logoTextDark}>Movies</p>
                    </div>
                </Link>
                {headerBtns}
            </div>
        </header>
    );
};

export default Header;

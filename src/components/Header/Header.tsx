import { useContext } from 'react';
import NavBtns from '../NavBtns';
import scss from './Header.module.scss'
import logoLight from '../../assets/images/logo.png'
import logoDark from '../../assets/images/logo-dark.png'
import sun from '../../assets/images/sun.png'
import moon from '../../assets/images/moon.png'
import { ThemeContext } from '../../context/ThemeProvider';
import { Link } from 'react-router-dom';

const Header = (): JSX.Element => {

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
                <div>
                    <NavBtns value="Sign In" theme={theme}/>
                    <NavBtns value="Sign Up" theme={theme}/>
                    <div className={scss.themeBtnBlock}>
                        {ThemeSwitcher}
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;

{/* <figure class="sign">
<p><img src="images/helen.jpg" width="150" height="212" alt="Скульптура"></p>
<figcaption>Деревянная скульптура</figcaption>
</figure> */}
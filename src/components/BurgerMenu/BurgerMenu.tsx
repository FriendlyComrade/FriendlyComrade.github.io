import ReactDom  from 'react-dom';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeProvider';
import { useContext } from 'react';
import close from '../../assets/images/close.png';
import scss from './BurgerMenu.module.scss';

type BurgerMenuProps = {
    isUser: boolean,
    menuState: boolean,
    onClose: React.Dispatch<React.SetStateAction<boolean>>,
    onOut: () => void,
    email: string
}

const BurgerMenu = ({email, onOut, isUser, menuState, onClose}:BurgerMenuProps) => {

    const {theme, toggleTheme} = useContext(ThemeContext)
    const guestBtn = [{value: 'Sign In', link: '/signin'}, {value: 'Sign Up', link: '/signup'}];
    const userBtn = [{value: 'Favorites', link: '/favorites'}, {value: 'History', link: '/history'}]

    let burgerMenuBtns;
    let signOutLi;
    if (isUser) {
        burgerMenuBtns = userBtn;
        signOutLi = (
            <Link to='/' onClick={() => onClose(!menuState)}>
                <li onClick={onOut}>
                    Sign Out
                </li>
            </Link>
        )
    } else {
        burgerMenuBtns = guestBtn;
        signOutLi = null;
    }

    let themeBtn;
    if (window.innerWidth <= 480) {
        themeBtn = (
            <li onClick={toggleTheme}>
                Theme: {theme}
            </li>
        )
    } else {
        themeBtn = null
    }

    let userEmail;
    if (isUser) {
        userEmail = (
            <li> {email} </li>
        )
    } else {
        userEmail = null;
    }

    const portal = document.getElementById('portal')
        return portal ? ReactDom.createPortal(
            <div className={scss.burgerMenu}>
                <div className={scss.blur}/>
                <div className={scss.menuContent}>
                    <button onClick={() => onClose(!menuState)} type="button">
                        <img src={close} alt='menu-close-img'></img>
                    </button>
                    <ul>
                        {userEmail}
                        {burgerMenuBtns.map(item => 
                            <Link to={item.link}>
                                <li onClick={() => onClose(!menuState)}>
                                    {item.value}
                                </li>
                            </Link>
                        )}
                        {signOutLi}
                        {themeBtn}
                    </ul>
                </div>
            </div>,
            portal
        ) : null
};

export default BurgerMenu;
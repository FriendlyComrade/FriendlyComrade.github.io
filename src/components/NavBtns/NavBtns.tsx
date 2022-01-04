import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeProvider';
import scss from './NavBtns.module.scss'


interface Types {
    value: string,
    theme: string
}

const HeaderBtns = ({value, theme}: Types): JSX.Element => {    

    return (
        <div className={scss.conteiner}>
            <a href="#" className={theme === "light" ? scss.btnLight : scss.btnDark}>{value}</a>
        </div>

    );
};

export default HeaderBtns;
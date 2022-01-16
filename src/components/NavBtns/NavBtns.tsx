import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeProvider';
import scss from './NavBtns.module.scss'


interface Types {
    value: string,
    theme: string,
    handleClick?: React.MouseEventHandler<HTMLButtonElement>
}

const HeaderBtns = ({value, theme, handleClick}: Types): JSX.Element => {    

    return (
        <button onClick={handleClick} className={theme === "light" ? scss.btnLight : scss.btnDark}>{value}</button>
    );
};

export default HeaderBtns;
import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { ThemeContext } from '../../context/ThemeProvider';
import { loadFavs } from '../../redux/store/slices/favorites/favoritesSlice';
import { loadHistory } from '../../redux/store/slices/history/historySlice';
import { setUser } from '../../redux/store/slices/user/userSlice';
import { User } from '../../types/User';
import { nanoid } from '@reduxjs/toolkit';
import scss from './AuthForm.module.scss';

type AuthFormProps = {
    isLoginPage: boolean
}

const AuthForm = ({isLoginPage}:AuthFormProps) => {
    const {theme} = useContext(ThemeContext)
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const localStorageUser = localStorage.getItem("user") || "[]"

    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isLoginPage) {
            handleLogin()
        } else {
            handleSignUp()
        }
    }
    
    const nameOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        setUserName(event.currentTarget.value)
    }

    const emailOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        setUserEmail(event.currentTarget.value)
    }

    const passwordOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        setUserPassword(event.currentTarget.value)
    }

    const loginSetStates = (foundUser: User) => {
        const FavsArr = foundUser.favorites.map(item => {
            return {id: item, movie: item}
        })
        const HistArr = foundUser.history.map(item => {
            return {id: nanoid(), query: item}
        })
        dispatch(loadHistory(HistArr))
        dispatch(loadFavs(FavsArr))
        dispatch(setUser(foundUser))    
    }

    const handleLogin = () => {
        const userListString:string = localStorage.getItem("user") || "[]";
        const userList: User[] = JSON.parse(userListString);

        const foundUser = userList.find(
            item => item.email === userEmail && item.password === userPassword
        )
        if (foundUser) {
            console.log(foundUser)
            loginSetStates(foundUser)
            setUserName("")
            setUserEmail("")
            setUserPassword("")
            navigate("/")
        }
    }

    const handleSignUp = () => {
        const userInfo = JSON.stringify([
            {   
                id: Number(new Date()),
                name: userName,
                email: userEmail,
                password: userPassword,
                favorites: [],
                history: []                
            },
            ...JSON.parse(localStorageUser)
        ])
        localStorage.setItem("user", userInfo)
        setUserName("")
        setUserEmail("")
        setUserPassword("")
        navigate("/signin")
    }

    const submitButtonText = isLoginPage ? "SignIn" : "SignUp" 
    const submitAuthButton = (
        <button className={scss.authForm_submitAuthButton} type="submit">
            {submitButtonText}
        </button>
    )

    return (
        <div className={scss.authForm_conteiner}>
            <form
                onSubmit={onSubmitForm}
                className={isLoginPage ? scss.authForm : scss.authForm_dark}
            >
                <h3 className={scss.authForm_text}>{submitButtonText}</h3>
                <div>
                    <div className={scss.authForm_input_title}>Your Name:</div>
                    <input 
                        value={userName}
                        type="name"
                        name="name"
                        placeholder="Name"
                        className = {theme === "light" ? scss.authForm_input : scss.authForm_input_dark}
                        onChange={nameOnChange}
                        required
                    />
                </div>
                <div>
                    <div className={scss.authForm_input_title}>Your Email:</div>
                    <input
                        value={userEmail} 
                        type="email"
                        name="emeil"
                        placeholder="Email"
                        className = {theme === "light" ? scss.authForm_input : scss.authForm_input_dark}
                        onChange={emailOnChange}
                        required
                    />
                </div>
                <div>
                    <div className={scss.authForm_input_title}>Your Password:</div>
                    <input
                        value={userPassword}  
                        type="password"
                        name="password"
                        placeholder="Password"
                        className = {theme === "light" ? scss.authForm_input : scss.authForm_input_dark}
                        onChange={passwordOnChange}
                        required
                    />
                </div>
                {submitAuthButton}
            </form>
        </div>
    );
};

export default AuthForm;
import { nanoid } from '@reduxjs/toolkit';
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router';
import { addNewHistory } from '../../redux/store/slices/history/historySlice';
import { RootState } from '../../redux/store/store';
import { addHistoryLocalStore, debounce } from '../../redux/utils/utils';
import OffersList from './OffersList';
import scss from './SearchBlock.module.scss'

const DEBOUNCE_DELAY = 800;

const SearchBlock = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const [searchFilms, setSearchFilms] = useState<string>('')
    const [showOffers, setShowOffers] = useState<boolean>(false)

    const searchRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentUserId = useSelector((state: RootState) => 
        state.userSlice.id,
        shallowEqual
    )


    const hideOffersOnOuterClick = (event: MouseEvent) => {
        if (!searchRef?.current?.contains(event.target as Node)) {
            setShowOffers(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', hideOffersOnOuterClick)
        return () => {
            document.removeEventListener('click', hideOffersOnOuterClick)
        }
    }, [])

    const debouncedSearchFilms = useCallback(
        debounce(setSearchFilms, DEBOUNCE_DELAY), []
    )

    useEffect(() => {
        debouncedSearchFilms(inputValue)
    }, [inputValue])

    const handleFormSubmit = useCallback(
        (e:FormEvent<HTMLFormElement> ) => {
            e.preventDefault()
            if (searchFilms.length) {
                navigate(`/search?query=${searchFilms.trim().replaceAll(" ", "+")}`)
                dispatch(addNewHistory({id: nanoid(), query: searchFilms}))
                addHistoryLocalStore(currentUserId, searchFilms)
                setShowOffers(false)
                setInputValue('')
                inputRef.current?.blur()
            }
    },[searchFilms])

    return (
        <div className={scss.serchBlock}  ref={searchRef} >
            <div className={scss.wrapper}>
                <form className={scss.searchPannel} onSubmit={handleFormSubmit}>
                    <input 
                    className={scss.searchInput} 
                    type="search" 
                    placeholder="search movie..."
                    value={inputValue}
                    onChange={(e:ChangeEvent<HTMLInputElement>) => 
                        setInputValue(e.target.value)
                    }
                    onFocus={() => setShowOffers(true)}
                    ref={inputRef}
                    />
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            className="ionicon" 
                            viewBox="0 0 512 512">
                                <title>Search</title>
                            <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" 
                            fill="none" stroke="currentColor" 
                            strokeMiterlimit="10" 
                            strokeWidth="32"/>
                            <path fill="none" 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeMiterlimit="10" 
                            strokeWidth="32" 
                            d="M338.29 338.29L448 448"/>
                        </svg> 
                    </button>                    
                </form>
                {searchFilms && showOffers && (
                    <OffersList searchFilms={searchFilms}/>
                )}
            </div>    
        </div>
    );
};

export default SearchBlock;
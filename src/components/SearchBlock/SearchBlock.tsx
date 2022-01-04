import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { debounce } from '../../redux/utils/utils';
import OffersList from './OffersList';
import scss from './SearchBlock.module.scss'

const DEBOUNCE_DELAY = 800;

const SearchBlock = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const [searchFilms, setSearchFilms] = useState<string>('')
    const [showOffers, setShowOffers] = useState<boolean>(false)
    const navigate = useNavigate()

    const searchRef = useRef<HTMLDivElement>(null)
    console.log(showOffers)

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
            navigate(`/search?query=${searchFilms.trim().replaceAll(" ", "+")}`)
            setShowOffers(false)
            setInputValue('')
    },[searchFilms])

    return (
        <div className={scss.serchBlock}  ref={searchRef} >
            <div className={scss.wrapper}>
                <form className={scss.searchPannel}onSubmit={handleFormSubmit}>
                    <input 
                    className={scss.searchInput} 
                    type="search" 
                    placeholder="search movie..."
                    value={inputValue}
                    onChange={(e:ChangeEvent<HTMLInputElement>) => 
                        setInputValue(e.target.value)
                    }
                    onFocus={() => setShowOffers(true)}
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
import SearchBlock from '../../components/SearchBlock';
import styles from './Home.module.scss'
import Slider from '../../components/Slider';
import PopularMovies from '../../components/PopularMovies';

const Home = (): JSX.Element => {
    return (
        <main className={styles.main}>
            <Slider/>
            <SearchBlock/>
            <PopularMovies/>
        </main>
    );
};
export default Home;
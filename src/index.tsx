import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app';
import {BrowserRouter} from 'react-router-dom'
import { setupStore } from './redux/store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeProvider';
const store = setupStore()

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);



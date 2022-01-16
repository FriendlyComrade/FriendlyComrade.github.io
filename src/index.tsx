import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app';
import {BrowserRouter} from 'react-router-dom'
import { store, persistedStore } from './redux/store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeProvider';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);



import ReactDOM from 'react-dom';
import './index.scss';
import {BrowserRouter} from 'react-router-dom'
import { store, persistedStore } from './redux/store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeProvider';
import { PersistGate } from 'redux-persist/integration/react';
import React, { Suspense } from 'react';
import MainLoader from './components/MainLoader/MainLoader';

const App = React.lazy(() => import('./components/app'))

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <ThemeProvider>
          <Suspense fallback={<MainLoader theme="light"/>}>
            <App />
          </Suspense>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);



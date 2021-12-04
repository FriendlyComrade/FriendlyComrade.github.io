import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import { setupStore } from './redux/store/store';
import { Provider } from 'react-redux';
// import { Router, Route } from 'react-router'


const store = setupStore()


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);



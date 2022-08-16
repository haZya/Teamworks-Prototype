// Internet Explorer 11 requires polyfills and partially supported by this project.
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
import App from 'app/App';
import store from 'app/store';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'typeface-poppins';
import './react-chartjs-2-defaults';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import './styles/app-base.css';
import './styles/app-components.css';
import './styles/app-utilities.css';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

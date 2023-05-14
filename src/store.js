import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const preloadedState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  articles: [],
  article: {},
  favArticles: localStorage.getItem('favArticles')
    ? JSON.parse(localStorage.getItem('favArticles'))
    : [],
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: [thunk],
});

store.subscribe(() => {
  const { favArticles } = store.getState();
  localStorage.setItem('favArticles', JSON.stringify(favArticles));
});

export default store;

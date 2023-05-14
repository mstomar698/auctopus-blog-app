import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import articleReducer from './articleReducer';
import articlePageReducer from './articlePageReducer';
import favArticleReducer from './favArticleReducer';

const rootReducer = combineReducers({
  userInfo: userReducer,
  article: articlePageReducer,
  articles: articleReducer,
  favArticles: favArticleReducer,
});

export default rootReducer;

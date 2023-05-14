export const updateArticle = (articles) => ({
  type: 'UPDATE_ARTICLE',
  payload: articles,
});

export const updateArticles = (articles) => ({
  type: 'UPDATE_ARTICLES',
  payload: articles,
});

export const addFavArticle = (article) => ({
  type: 'ADD_FAV_ARTICLE',
  payload: article,
});

export const removeFavArticle = (article) => ({
  type: 'REMOVE_FAV_ARTICLE',
  payload: article,
});

export const removeAllFavArticles = () => ({
  type: 'REMOVE_ALL_FAV_ARTICLES',
});

const initialState = [];

const favArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FAV_ARTICLE':
      return [...state, action.payload];
    case 'REMOVE_FAV_ARTICLE':
      return state.filter((article) => article.id !== action.payload.id);
    case 'REMOVE_ALL_FAV_ARTICLES':
      return [];
    default:
      return state;
  }
};

export default favArticleReducer;

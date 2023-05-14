const articleReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_ARTICLES':
      return action.payload;
    default:
      return state;
  }
};

export default articleReducer;

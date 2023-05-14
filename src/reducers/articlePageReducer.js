const articlePageReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_ARTICLE':
      return action.payload;
    default:
      return state;
  }
};

export default articlePageReducer;

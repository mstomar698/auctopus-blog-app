const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'USER_SIGNIN':
      return action.payload;
    case 'USER_SIGNOUT':
      return null;
    default:
      return state;
  }
};

export default userReducer;

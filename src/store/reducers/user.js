const user = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      console.log('action.user===>>>>', action.user);
      return {
        ...state,
        ...action.user,
      };
    default:
      return state;
  }
};

export default user;

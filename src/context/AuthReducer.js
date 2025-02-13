const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following
            ? [...state.user.following, action.payload]
            : [action.payload], // Initialize to array if undefined
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following
            ? state.user.following.filter((id) => id !== action.payload)
            : [], // Default to empty array if undefined
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;

const Redure = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: null
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false
            };
        case "LOGIN_FAILURE":
            return {
                user: false,
                isFetching: false,
                error: true
            }
        case "UPDATE_START":
            return {
                ...state,
                isFetching: true
            };
        case "UPDATE_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false
            };
        case "UPDATE_FAILURE":
            return {
                user: state.user,
                isFetching: false,
                error: true
            }
        case "LOGOUT":
            return {
                user: false,
                isFetching: false,
                error: false
            }
        default:
            return state;
    }
};

export default Redure;
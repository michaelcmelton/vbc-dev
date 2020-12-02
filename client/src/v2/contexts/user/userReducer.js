let token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

export const initialState = {
    token: '' || token,
    isAuthenticated: false,
    isLoading: false,
    error: '',
    user: null
}

export const AuthReducer = (initialState, action) => {
    switch(action.type) {
        case "REQUEST_LOGIN":
            return {
                ...initialState,
                isLoading: true,
            }
        case "LOGIN_SUCCESS":
            return {
                ...initialState,
                isLoading: false,
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload.user
            }
        case "LOGOUT":
            return {
                ...initialState,
                user: null,
                isAuthenticated: false,
                token: ''
            }
        case "LOGIN_ERROR":
            return {
                ...initialState,
                isLoading: false,
                error: action.error
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}
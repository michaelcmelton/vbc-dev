const authenticationReducer = (state = false, action) => {
    switch(action.type) {
        case 'authenticated':
            return !state;
        case 'unauthenticated':
            return !state;
        default:
            return state;
    }
}

export default authenticationReducer;
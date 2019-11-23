// This is the reducer function
const catalogueReducer = (state, action) => {
    switch (action.type) {
        case "setYear":
            return action.data;
        
        case "setCurrentYear":
            return new Date().getFullYear();

        default:
            return state;
    }
}

export default catalogueReducer;
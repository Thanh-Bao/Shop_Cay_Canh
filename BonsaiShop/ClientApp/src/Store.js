import { createStore } from 'redux';
const initialState = {
    filterPrice: { min: 300, max: 600 },
    filterHeight: { min: 40, max: 80 }
}
function AllReducer(state = initialState, action) {
    switch (action.type) {
        case "UPDATE_FILTER_PRICE":
            return {
                ...state,
                filterPrice: action.data
            }
        case "UPDATE_FILTER_HEIGHT":
            return {
                ...state,
                filterHeight: action.data
            }
        default:
            break;
    }
    return state;
}
const store = createStore(AllReducer);
export default store;

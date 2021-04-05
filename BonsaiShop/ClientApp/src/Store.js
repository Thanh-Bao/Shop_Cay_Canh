import { createStore } from 'redux';
const initialState = {
    filterPrice: { min: 300, max: 600 },
    filterHeight: { min: 40, max: 80 },
    rangeBarChange : true,
    filterOrigin : 0,
    SortMode : 0,
}
function AllReducer(state = initialState, action) {
    switch (action.type) {
        case "UPDATE_FILTER_PRICE":
            return {
                ...state,
                filterPrice: action.data,
                rangeBarChange : false
            }
        case "UPDATE_FILTER_HEIGHT":
            return {
                ...state,
                filterHeight: action.data,
                rangeBarChange : false
            }
        case "UPDATE_FILTER_ORIGIN":
            return {
                ...state,
                filterOrigin: action.data
            }
        case "UPDATE_SORT_MODE":
            return {
                ...state,
                SortMode: action.data
            }
        default:
            break;
    }
    return state;
}
const store = createStore(AllReducer);
export default store;

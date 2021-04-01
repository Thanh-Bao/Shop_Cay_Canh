import { createStore } from 'redux';
const initialState = {
    abc: null
}
function AllReducer(state = initialState, action) {
    switch (action.type) {
        case "HIHI":
            return {
                ...state,
                abc: 99999
            }
        default:
            break;
    }
    return state;
}
const store = createStore(AllReducer);
export default store;

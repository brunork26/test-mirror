import { combineReducers } from 'redux';
import { ADD_ALTERNATIVA } from '../actions/AlternativaAction';
 
let initialState = {
    nome: 'teste',
    alternativas:[]
}
 
const AlternativaReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ALTERNATIVA:
            return Object.assign({}, state, { alternativas: [...state.alternativas, action.payload] });
        default:
            return state;
    }
};
 
// Combine all the reducers
const rootReducer = combineReducers({
    AlternativaReducer
})
 
export default rootReducer;
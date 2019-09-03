import { combineReducers } from 'redux';
import { ADD_QUESTAO } from '../actions/index';
 
let initialState = {
    nome: 'teste',
    questoes:[]
}
 
const salaReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_QUESTAO:
            return Object.assign({}, state, { questoes: [...state.questoes, action.payload] });
        default:
            return state;
    }
};
 
// Combine all the reducers
const rootReducer = combineReducers({
    salaReducer
})
 
export default rootReducer;
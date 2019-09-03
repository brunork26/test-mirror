export const ADD_ALTERNATIVA = 'ADD_ALTERNATIVA';
export function addAlternativa(alternativa) {
    return dispatch => {
        dispatch({
            type: ADD_ALTERNATIVA,
            payload: alternativa
        });
    }

}
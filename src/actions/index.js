export const ADD_QUESTAO = 'ADD_QUESTAO';
export function addQuestao(questao) {
    return dispatch => {
        dispatch({
            type: ADD_QUESTAO,
            payload: questao
        });
    }

}
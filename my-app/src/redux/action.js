
import { DELETE_CARD_DATA, DELETE_DATA_SUCCESS, GET_CARD_DATA, GET_DATA, GET_DATA_FAILURE, GET_DATA_SUCCESS, GET_SINGLE_CARD, GET_SINGLE_CARD_SUCCESS, HANDLE_ADD_CARD_DATA, HANDLE_CARD_DATA, HANDLE_EDIT_CARD_DATA, HANDLE_GROUP_DATA, REQUEST_DATA } from "./actionTypes"
import axios from 'axios'


export const handleGroupData = (payload) => {
    return { type: HANDLE_GROUP_DATA, payload }
}

export const handleCardData = (payload) => {
    return { type: HANDLE_CARD_DATA, payload }
}

export const handleAddCardData = (payload) => {
    return { type: HANDLE_ADD_CARD_DATA, payload }
}

export const handleEditCardData = (payload) => {
    return { type: HANDLE_EDIT_CARD_DATA, payload }
}

export const handleDeleteCardData = (id) => {
    return { type: DELETE_CARD_DATA, payload: id };
};

export const getCardData = () => {
    return { type: GET_CARD_DATA };
};

export const requestData = () => {
    return { type: REQUEST_DATA, isLoading: true, isError: false, }
}

export const getData = (dispatch) => {
    dispatch({ type: REQUEST_DATA })
    axios.get('http://localhost:8080/cards').then((res) => {
        console.log(res);
        dispatch({ type: GET_DATA_SUCCESS, payload: res.data })
    }).catch((error) => {
        dispatch({ type: GET_DATA_FAILURE })
    })
};

export const deleteData = (id) => (dispatch) => {
    dispatch({ type: REQUEST_DATA })
    axios.delete(`http://localhost:8080/cards/${id}`).then((res) => {
        console.log(res.data.data);
        dispatch({ type: DELETE_DATA_SUCCESS, payload: res.data.data })
    })
}

export const getSingleCard = (id) => async (dispatch) => {
    dispatch({ type: REQUEST_DATA })
    axios.get(`http://localhost:8080/card/${id}`).then((res) => {
        console.log("res",res.data);
            dispatch({ type: GET_SINGLE_CARD, payload: res.data });
        }).catch((error) => {
            dispatch({ type: GET_DATA_FAILURE })
        })
}

export const getSingleCardSuccess = () => {
    return { type: GET_SINGLE_CARD_SUCCESS, isLoading: true, isError: false, }
}

export const getDataSuccess = () => {
    return { type: GET_DATA_SUCCESS };
};

export const getDataFailure = () => {
    return { type: GET_DATA_FAILURE };
};




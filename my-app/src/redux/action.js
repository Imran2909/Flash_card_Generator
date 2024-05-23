
import { DELETE_CARD_DATA, GET_CARD_DATA, HANDLE_ADD_CARD_DATA, HANDLE_CARD_DATA, HANDLE_EDIT_CARD_DATA, HANDLE_GROUP_DATA } from "./actionTypes"

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
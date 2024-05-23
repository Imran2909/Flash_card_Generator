import { GET_CARD_DATA, HANDLE_ADD_CARD_DATA, HANDLE_CARD_DATA, HANDLE_EDIT_CARD_DATA, HANDLE_GROUP_DATA, DELETE_CARD_DATA } from "./actionTypes";

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case HANDLE_GROUP_DATA:
            return {
                ...state, groupData: payload
            };
        case HANDLE_CARD_DATA:
            return {
                ...state, cardData: payload
            };
        case HANDLE_ADD_CARD_DATA:
            return {
                ...state, allCardData: payload, cardData: []
            };
        case HANDLE_EDIT_CARD_DATA:
            return {
                ...state, allCardData: [...payload]
            };
        case GET_CARD_DATA:
            return {
                ...state
            };
        case DELETE_CARD_DATA:
            return {
                ...state, allCardData: state.allCardData.filter(card => card.id !== payload)
            };
        default:
            return state;
    }
};

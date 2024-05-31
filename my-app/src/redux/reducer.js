import { GET_CARD_DATA, HANDLE_ADD_CARD_DATA, HANDLE_CARD_DATA, HANDLE_GROUP_DATA, GET_DATA_SUCCESS, GET_DATA_FAILURE, REQUEST_DATA, DELETE_DATA_SUCCESS, GET_SINGLE_CARD, GET_SINGLE_CARD_SUCCESS } from "./actionTypes";

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case HANDLE_GROUP_DATA:
            return { ...state, groupData: payload };
        case HANDLE_CARD_DATA:
            return { ...state, cardData: [...payload] };
        case HANDLE_ADD_CARD_DATA:
            return { ...state, allCardData: payload, cardData: [] };
        case GET_CARD_DATA:
            return { ...state };
        case REQUEST_DATA:
            return { ...state, isLoading: true, isError: false, }
        case GET_DATA_SUCCESS:
            return { ...state, isLoading: false, isError: false, allData: payload }
        case GET_DATA_FAILURE:
            return { ...state, isLoading: false, isError: true }
        case DELETE_DATA_SUCCESS:
            return { ...state, isLoading: false, isError: false, allData: payload }
        case GET_SINGLE_CARD:
            return { ...state, singleCard: payload, isLoading: false, isError: false }
        case GET_SINGLE_CARD_SUCCESS:
            return { ...state, isLoading: false, isError: false }
        default:
            return state;
    }
};








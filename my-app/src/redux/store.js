import { applyMiddleware, legacy_createStore } from 'redux'
import { reducer } from './reducer'
import { thunk } from 'redux-thunk'

const initialState={
    groupData:[],
    cardData:[],
    allCardData:[],
    data:[],
    isLoading:false,
    isError:false,
    allData:[]
}

export const store= legacy_createStore(reducer,initialState,applyMiddleware(thunk))


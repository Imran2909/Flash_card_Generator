import { legacy_createStore } from 'redux'
import { reducer } from './reducer'

const initialState={
    groupData:[],
    cardData:[],
    allCardData:[],
    data:[]
}


export const store= legacy_createStore(reducer,initialState)
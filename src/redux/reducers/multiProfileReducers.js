import { SET_PROFILE } from "../actions";

const initialState = {
    multiProfiles : [],
}

const multiProfilesReducer =(state = initialState, action)=> {
    console.log(action.type)

    switch(action.type){
        case SET_PROFILE:
            console.log(action.payload);
            return{
                ...state,
                multiProfiles:action.payload,
            }
            default:
                return state;
    }
}

export default multiProfilesReducer
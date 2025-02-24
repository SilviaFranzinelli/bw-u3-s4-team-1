import {SET_PROFILE} from "../actions/profile.js"

const initialState = {
    profiles : [],
}

const profileReducer = (state = initialState , action) => {
    console.log(action.type);

    switch(action.type){
        case SET_PROFILE: 
            console.log("profili salvati" , action.payload);
            return{
                    ...state, 
                    profiles:action.payload
                };
            default : 
                return state
            }
    }

    export default profileReducer;
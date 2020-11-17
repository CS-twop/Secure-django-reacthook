import produce from "immer";

import {LOGIN_SUCCESS,LOGOUT} from "../actions/userActions"

const initialState = {
    user: null,
  };

  const userReducer = (state = initialState, action) => {
    switch (action.type) {
    //   case STORE_USER: {
    //     return produce(state, (draft) => {
    //       // Ensure we clear current session
    //       // console.log(`draft.user : ${draft}`);
    //       // console.log(draft.user);
    //       draft.user = null;
    //     });
    //   }
  
      case LOGIN_SUCCESS: {
        // const { decodedToken, user } = action.payload;
        const { user } = action.payload;
        console.log(user)
        // console.log(decodedToken);
        // console.log(`logic success by ${decodedToken.username}`);
        // console.log(user);
        return produce(state, (draft) => {
          draft.user = user;
        });
      }
  
      case LOGOUT: {
        return produce(state, (draft) => {
          draft.user = null;
        });
      }
  
  
      default: {
        return state;
      }
    }
  };

export default userReducer;

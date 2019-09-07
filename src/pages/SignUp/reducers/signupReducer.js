// import { getData } from '../../api';

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  isFetching: false,
  data: null,
};

export const reducer = (state = initialState, action) => {
 	switch (action.type) {
        case USER_FETCHING:
            return {
                ...state,
                isFetching: true,
                data: {}
            }
        case USER_RECEIVED:
            return {
                ...state,
                isFetching: false,
                data: action.user
            }
        /*case USER_ERROR_RECEIVED:
            return {
                ...state,
                isLoaded: false,
                data: null,
                error: action.error,
            }
        case USER_LOGGED_OUT:
            return {
                ...state,
                data: null,
            }
        */
    default:
        return state
 	}
}

// ------------------------------------
// Action Creators
// ------------------------------------
export const fetching = (): Type.UserFetchingAction => ({type: USER_FETCHING});
export const userReceived = (user: Type.IUser): Type.UserReceivedAction => ({type: USER_RECEIVED, user});
//export const onError = (error) => ({type: USER_ERROR_RECEIVED, error});


// ------------------------------------
// Async Action Creators
// ------------------------------------
export const fetchUser = (userId: number) => {
    return async (dispatch : Dispatch<Type.UserActionsType>) => {
        dispatch(fetching());
        try{
            //TODO: constants
            const response : Type.IUser = await getData({ suffix: "users", query: { id: 4 } }).then(data => data);
            dispatch(userReceived(response))
            console.log(response);
        }catch(error){
            //dispatch(onError(error));
            console.log(error);
        }
    };
};

export default reducer;
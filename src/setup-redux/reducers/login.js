const initState = {
    
    jwt:'',
    username: '',
    isLogin:false,
    
    
};

export default function loginReducer(state = initState, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            const inforName = action.payload;
            return Object.assign({}, state, {
                jwt: inforName.jwt,
                username: inforName.name,
                isLogin:true,
            });
        case "LOGOUT":
            const stateLogOut = {
                
                jwt:'',
                username: '',

                isLogin: false,
            }
            return stateLogOut;


        default:
            return state;
    }
};
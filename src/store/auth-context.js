import React from "react";
const AuthContext = React.createContext({
    isLoggedIn:false,
    logout:() =>{}
})
//Note: AuthContext is not a function component
export default AuthContext;
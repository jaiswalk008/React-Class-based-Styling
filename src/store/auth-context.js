import React, { useState , useEffect } from "react";
//Note: AuthContext is not a function component
const AuthContext = React.createContext({
    isLoggedIn:false,
    logout:() =>{},
    login:(email , password , college) =>{}
})
export const AuthContextProvider = (props) =>{

    const [isLoggedIn , setIsLoggedIn] = useState(false);
    useEffect(() => {
        const storedLoginInfo = localStorage.getItem('isLoggedIn');
        if(storedLoginInfo==='1'){
          setIsLoggedIn(true);
        }
      } , [])
    const logoutHandler = () =>{
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    }
    const loginHandler = () =>{
        localStorage.setItem('isLoggedIn' ,'1');
        setIsLoggedIn(true);
    }


    return <AuthContext.Provider value={
       { isLoggedIn:isLoggedIn , logout:logoutHandler , login:loginHandler }
    }>{props.children}</AuthContext.Provider>
}


export default AuthContext;
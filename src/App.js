import React, { useState , useEffect} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import Testing from './components/Testing';
import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  /* If we dont use useEffect then storedInfo will get item and setIsloggedin will be
  executed which will re-render the app component again which will create an infinite loop */
  useEffect(() => {
    const storedLoginInfo = localStorage.getItem('isLoggedIn');
    if(storedLoginInfo==='1'){
      setIsLoggedIn(true);
    }
  } , [])
  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn' ,'1');
    setIsLoggedIn(true)
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      {/* Now its a component  
      Now all the direct and indirect childrens of AuthContext will have access to isLoggedIn*/}
      <AuthContext.Provider value={{
        isLoggedIn:isLoggedIn , 
        logout:logoutHandler
        }}>

        <MainHeader  />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
        <Testing/>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;

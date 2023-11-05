import React , {useContext} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import Testing from './components/Testing';
import AuthContext from './store/auth-context';
function App() {
  const authCtx = useContext(AuthContext);
  return (
    <React.Fragment>
      {/* Now its a component  
      Now all the direct and indirect childrens of AuthContext will have access to isLoggedIn*/}
      
        <MainHeader  />
        <main>
          {!authCtx.isLoggedIn && <Login/>}
          {authCtx.isLoggedIn && <Home/>}
        </main>
        <Testing/>
    
    </React.Fragment>
  );
}

export default App;

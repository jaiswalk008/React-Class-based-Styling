import React, { useState , useReducer  , useContext , useRef} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import FormInput from '../FormInput';

const emailReducer = (state , action) =>{
  if(action.type==='USER_INPUT'){
    return {value:action.val , isValid:action.val.includes('@')}
  }
if(action.type==="INPUT_BLUR"){
  //state gives the current state
  return {value:state.value , isValid:state.value.includes('@')};
}
  return {value:"" , isValid:true};
}

const passwordReducer = (state , action) =>{
  if(action.type==="PASSWORD_INPUT"){
    return {value:action.val , isValid:action.val.length>6};
  }
  if(action.type ==="PASSWORD_BLUR"){
    return {value:state.value , isValid:state.value.length>6};
  }
  return {value:"" , isValid:true};
}
const collegeReducer = (state , action) =>{
  // console.log(state , action)
  if(action.type==="COLLEGE_INPUT"){
    return {value:action.val , isValid:action.val.length>10}
  }
  if(action.type==="COLLEGE_BLUR"){
    return {value:state.value , isValid:state.value.length>10};
  }
  return {value:"" , isValid:true};
}
const Login = (props) => {

  const [formIsValid, setFormIsValid] = useState(false);
  const authCtx = useContext(AuthContext);
  const [emailState , dispatchEmail] = useReducer(emailReducer , {value:"" , isValid:null})
  const [passwordState , dispatchPassword] = useReducer(passwordReducer , {value:"" , isValid:null});
  const [collegeState , dispatchCollege] = useReducer(collegeReducer , {value:"" , isValid:null})
  // useEffect(() =>{
    
  //   const timer = setTimeout(() => { 
  //     console.log('Checking form validity');  
  //     setFormIsValid(
  //     emailState.isValid && enteredPassword.trim().length > 6 && enteredCollege.trim().length>10
  //   ) }, 500)

  //   //cleanup function
  //   return () =>{
  //     console.log('performing cleanup');
  //     clearTimeout(timer);
  //   }
  // }, [emailState , enteredPassword , enteredCollege])
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const collegeInputRef = useRef();
  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT' , val:event.target.value})
    setFormIsValid(
      emailState.isValid && passwordState.isValid && collegeState.isValid
    )
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'PASSWORD_INPUT' , val:event.target.value});
    setFormIsValid(
      emailState.isValid && passwordState.isValid && collegeState.isValid
    )
  };
  const collegeChangeHandler = (event) => {
    dispatchCollege({type:"COLLEGE_INPUT" , val:event.target.value})
    setFormIsValid(
      emailState.isValid && passwordState.isValid && collegeState.isValid
    )
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR' , val:""});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'PASSWORD_BLUR' , val:""});
  };
  const validateCollegeHandler = () => {
    dispatchCollege({type:"COLLEGE_BLUR" ,val:""});
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){

      authCtx.login(emailState.value, passwordState.value , collegeState.value);
    }
    else if(!emailState.isValid){
      
      emailInputRef.current.focus();
    }else if(!collegeState.isValid){
      
      collegeInputRef.current.focus();
    }else{
      
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        
        <FormInput ref={emailInputRef} state={emailState} label={"E-mail"} id={"email"} type={"email"} 
        change={emailChangeHandler}  blur={validateEmailHandler} />

        <FormInput ref={collegeInputRef} state={collegeState} label={"College"} id={"college"} type={"text"} 
        change={collegeChangeHandler}  blur={validateCollegeHandler} />

        <FormInput ref={passwordInputRef} state={passwordState} label={"Password"} id={"password"} type={"password"} 
        change={passwordChangeHandler}  blur={validatePasswordHandler} />
        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

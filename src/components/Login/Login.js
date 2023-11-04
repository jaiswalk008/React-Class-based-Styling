import React, { useState , useEffect , useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

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
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollege , setEnteredCollege] = useState('');
  // const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState , dispatchEmail] = useReducer(emailReducer , {value:"" , isValid:true})
  const [passwordState , dispatchPassword] = useReducer(passwordReducer , {value:"" , isValid:true});
  const [collegeState , dispatchCollege] = useReducer(collegeReducer , {value:"" , isValid:true})
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
    props.onLogin(emailState.value, passwordState.value , collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={collegeState.value}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

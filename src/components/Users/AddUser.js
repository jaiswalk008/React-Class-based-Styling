import React, { useState , useRef } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const [error, setError] = useState();
  const userName= useRef();
  const age = useRef();
  const collegeName = useRef();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = userName.current.value;
    const enteredAge = age.current.value;
    const enteredCollegeName = collegeName.current.value;
    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0 
    || enteredCollegeName.trim().length===0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name/age/college (non-empty values).',
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(enteredName, enteredAge , enteredCollegeName);
    //should avoid
    userName.current.value='';
    age.current.value='';
    collegeName.current.value=''
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={userName}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            ref={age}
          />
          <label htmlFor='college'>College Name</label>
          <input type='text' id='college' ref={collegeName}/>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;

import React , { useRef , useImperativeHandle} from 'react';
import classes from './Login/Login.module.css';
const FormInput = React.forwardRef((props , ref) =>{
    const inputRef = useRef();
    const activate = () =>{
        inputRef.current.focus();
    }
    useImperativeHandle(ref, () =>{
        // returns object containing all the data we can use outside of this component
        return {
            focus:activate,
        }
    })
    return(
        <div
        // emailState.isValid , htmlfor/id , type , value , onChange , onBlur
          className={`${classes.control} ${
            props.state.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor={props.id}>{props.label}</label>
          <input
            ref ={inputRef}
            type={props.type}
            id={props.id}
            value={props.state.value}
            onChange={props.change}
            onBlur={props.blur}
          />
        </div>
    )
})
export default FormInput;
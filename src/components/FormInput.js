import classes from './Login/Login.module.css';
const FormInput = (props) =>{
    return(
        <div
        // emailState.isValid , htmlfor/id , type , value , onChange , onBlur
          className={`${classes.control} ${
            props.state.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor={props.id}>{props.label}</label>
          <input
            type={props.type}
            id={props.id}
            value={props.state.value}
            onChange={props.change}
            onBlur={props.blur}
          />
        </div>
    )
}
export default FormInput;
import React, { useState,useEffect,useReducer,useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../state/Auth-context';

const emailActionHandler=(state,action)=>{
if(action.type==='USER_INPUT'){
  return {
    value:action.val,
    isValid:action.val.includes('@')
  }
}
else{
  return {
    value:state.value,
    isValid:state.value.includes('@')
  }
}
}
const passwordActionHandler=(state,action)=>{
if(action.type==='USER_INPUT'){
  return {
    value:action.val,
    isValid:action.val.trim().length > 6
  }
}
else{
  return {
    value:state.value,
    isValid:state.value.trim().length > 6
  }
}
}

const Login = (props) => {


  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const ctx=useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);

  const [email,dispatchEmail]=useReducer(emailActionHandler,
    {
      value:'',
      isValid:undefined
    });


  const [password,dispatchPassword]=useReducer(passwordActionHandler,
    {
      value:'',
      isValid:undefined
    });
const {isValid:enteredEmailIsvalid}=email;

const {isValid:enteredPasswordIsvalid}=password;
  useEffect(() => {
    const handler=setTimeout(()=>{
      console.log('checking validity');
      setFormIsValid(
        enteredEmailIsvalid && enteredPasswordIsvalid
      );
    },500);
    return ()=>{
      console.log('clean up');
      clearInterval(handler);
    }
  }, [enteredEmailIsvalid,enteredPasswordIsvalid])
  
  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value); 
    dispatchEmail(
      {type:'USER_INPUT',
  val:event.target.value,
}
  )
  // setFormIsValid(event.target.value.includes('@') && password.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({
      type:'USER_INPUT',
      val:event.target.value
    })
    // setFormIsValid(email.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({type:"VALID"})

    
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({
      type:'VALID'
    })

    
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(email.value, password.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            email.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            password.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password.value}
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

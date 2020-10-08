import React from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'
import axios from 'axios'
import { connect } from "react-redux";



// function validateEmail(email) {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

class Auth extends React.Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Введите корректный email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Пароль",
        errorMessage: "Введите корректный пароль",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value, 
      this.state.formControls.password.value,
      true
    )
    
    // try {
    //   const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAcUdLl5WF0yPzwz3hnT7Eg8aB-JJ4I-G8', authData)
    //   console.log(response.data);
    // } catch(e) {
    //   console.log(e);
    // }
  };

  registerHandler = () => {

    this.props.auth(
      this.state.formControls.email.value, 
      this.state.formControls.password.value,
      false
    )
    // try {
    //   const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAcUdLl5WF0yPzwz3hnT7Eg8aB-JJ4I-G8', authData)
    //   console.log(response.data);
    // } catch(e) {
    //   console.log(e);
    // }
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  validateControl = (value, validation) => {
    if (!validation) {
          return true
        }
        
    let isValid = true


    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
        // isValid = validateEmail(value) && isValid
        isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
        isValid = value.trim().length >= validation.minLength && isValid 
    }
    
    return isValid
  }

  onChangeHandler = (event, controlName) => {
    // console.log(`${controlName} - ${event.target.value}`);

    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true
    
    Object.keys(formControls).forEach(name => {
        isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
        isFormValid: isFormValid,
        formControls: formControls,
    })
  }

  renderInputs = () => {
    const inputs = Object.keys(
      this.state.formControls
    ).map((controlName, index) => {
        const control = this.state.formControls[controlName]
        return (
            <Input
                key={controlName + index}
                type={control.type}
                value={control.value}
                valid={control.valid}
                touched={control.touched}
                label={control.label}
                shouldValidate={!!control.validation}
                errorMessage={control.errorMessage}
                onChange={event => this.onChangeHandler(event, controlName)}
            />
        )
    });
    // console.log(inputs);
    return inputs
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}
            <Button type="success" onClick={this.loginHandler} disabled={!this.state.isFormValid}>
              Войти в систему
            </Button>
            <Button type="primary" onClick={this.registerHandler} disabled={!this.state.isFormValid}>
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth);

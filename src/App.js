import React, {Component} from 'react';
import './App.css';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const phoneRegex = RegExp(/^\d{3}\d{3}\d{3}$/);

const formValid = ({formErrors, ...rest}) => {
  let valid = true;

  Object.values(formErrors).forEach(val => val.length > 0 && (valid = false));

  Object.values(rest).forEach(val => {
    val === null && (valid = false)
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firsName: null,
      lastName: null,
      email: null,
      phone: null,
      formErrors: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      }
    }
  }

  // Prevent Default Form Submit
  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        -----SUBMITTING-----
        first Name: ${this.state.firstName}
        last Name: ${this.state.lastName}
        email: ${this.state.email}
        phone: ${this.state.phone}
      `)
    } else {
      console.error('Form Invalid display error message')
    }
  };

  handleChange = e => {
    e.preventDefault();
    const {name, value} = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case 'firstName':
        formErrors.firstName = value.length < 3 && value.length > 0 ? 'Minimum 3 Characters Required' : '';
        break;

      case 'lastName':
        formErrors.lastName = value.length < 3 && value.length > 0 ? 'Minimum 3 Characters Required'
          : '';
        break;

      case 'email':
        formErrors.email = emailRegex.test(value) ? ''
          : 'Need Valid Email';
        break;

      case 'phone' :
        formErrors.phone = phoneRegex.test(value)  && value.substring(0, 2) === '86'
          ? '' : 'Input a valid Lithuanian number starting with 86';
        break;

      default:
        break;
    }

    this.setState({formErrors, [name]: value}, () => console.log(this.state))
  };

  render() {

    const {formErrors} = this.state;
    return (
      <div className="App wrapper">
        <div className="form-wrapper">
          <h2>Create an Account</h2>
          <form onSubmit={this.handleSubmit} noValidate>

            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className={formErrors.firstName.length > 0 ? 'error' : 'valid'}
                placeholder="First Name"
                name="firstName"
                onChange={this.handleChange}
                noValidate/>

              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              ) }
            </div>

            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className={formErrors.lastName.length > 0 ? 'error' : 'valid'}
                placeholder="Last Name"
                name="lastName"
                onChange={this.handleChange}
                noValidate/>

              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              ) }
            </div>

            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className={formErrors.email.length > 0 ? 'error' : 'valid'}
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
                noValidate/>

              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              ) }
            </div>

            <div className="phone">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                className={formErrors.phone.length > 0 ? 'error' : 'valid'}
                placeholder="Phone Number"
                name="phone"
                onChange={this.handleChange}
                noValidate/>

              {formErrors.phone.length > 0 && (
                <span className="errorMessage">{formErrors.phone}</span>
              ) }
            </div>

            <div className="submitForm">
              <button type="submit">Submit Form</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
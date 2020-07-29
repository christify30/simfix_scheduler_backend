const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function ValidateUser(data) {
    
    let errors={};
    data.name = !isEmpty(data.name)? data.name : '';
    data.email=!isEmpty(data.email)? data.email : '';

    if(!validator.isEmail(data.email.toString())){
        errors.email='email is invalid';
    }

    if(validator.isEmpty(data.email.toString())){
        errors.email='email field is required';
    }

    if(validator.isEmpty(data.name.toString())){
        errors.name="Name field is required";
    }
    if(!validator.isLength(data.name.toString(), {min:2,max:30})){
        errors.name ="Name must be between 2 and 30 characters";
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}

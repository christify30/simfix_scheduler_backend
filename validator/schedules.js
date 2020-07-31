const validator = require('validator');
const isEmpty = require('./isEmpty');
const moment = require('moment');

module.exports = function validateScheduleInpute(data){
    let errors={};
    data.title = !isEmpty(data.title)? data.title : '';
    data.type = !isEmpty(data.type)? data.type : '';
    data.start_date = !isEmpty(data.start_date)? data.start_date : '';
    data.end_date = !isEmpty(data.end_date)? data.end_date : '';
    data.frequency = !isEmpty(data.frequency)? data.frequency : '';
    data.recipients = !isEmpty(data.recipients)? data.recipients : '';

    if(validator.isEmpty(data.recipients.toString())){
        errors.recipients='Please enter the emails of the recipients, Seperated via comma(,)';
    }
    if(validator.isEmpty(data.title.toString())){
        errors.title='The title field is required';
    }
    if(data.type == 'one_off' || data.type == 'recurrent' || data.type == 'recurrent_stop'){}
    else  errors.type = 'The type must be either recurrent, one_off or recurrent_stop'
    
    if(validator.isEmpty(data.type.toString())){
        errors.type='The type field is required';
    }
    
    try {
         if(!moment(data.start_date).isValid()) errors.start_date='Invalid time format';
         const date = new Date()
         if(!moment(data.start_date).isAfter(date)){
            errors.end_date3='The start date must be ahead of the current time'; 
         }
    } catch (error) {
        console.log(error)
        errors.start_date='Invalid time format';
    }
    switch (data.type) {
        case 'recurrent_stop':
            try {
                if(!moment(data.end_date).isValid()){ 
                    errors.end_date='Invalid time format'; 
                }
                const date1 = new Date(data.end_date)
                const data2 = new Date(data.start_date)
                if(!moment(date1).isAfter(data2)){
                    errors.end_date2='The end date must be ahead of the start date'; 
                }
            } catch (error) {
                errors.end_date='Invalid time format';
            }
            if(Number(data.frequency) < 1) errors.frequency = 'The frequency must be a number';
            if(validator.isEmpty(data.frequency.toString())){
                errors.frequency='The frequency field is required';
            }
            break;
        case 'recurrent':
            if(Number(data.frequency) < 1) errors.frequency = 'The frequency must be a number';
            if(validator.isEmpty(data.frequency.toString())){
                errors.frequency='The frequency field is required';
            }
        default:
            break;
    }
    return {
        errors,
        isValid:isEmpty(errors)
    }
}
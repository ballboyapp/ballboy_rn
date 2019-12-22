import { curateErrors } from '../../../utils';

/**
 * error = { email: ['This field must be unique.'] }
*/
const curateFieldName = (fieldName) => {
  switch (fieldName) {
    case 'name':
      return 'name';
    default:
      return 'email';
  }
};

/**
 * error = { email: ['This field must be unique.'] }
*/
const curateErrorMsg = (errorMsg) => {
  switch (errorMsg) {
    case 'Email already in use':
      return 'signupEmailForm.fields.email.errors.inUse';
    default:
      // return 'signupEmailForm.fields.email.errors.unknown';
      return errorMsg;
  }
};

export default curateErrors(curateFieldName, curateErrorMsg); // fn

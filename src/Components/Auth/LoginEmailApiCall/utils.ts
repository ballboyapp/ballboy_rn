import { curateErrors } from '../../../utils';

/**
 * error = { email: ['This field must be unique.'] }
*/
// TODO: pass errorMsg as the fieldName
const curateFieldName = (fieldName) => {
  return 'email';
};

/**
 * error = { email: ['This field must be unique.'] }
*/
const curateErrorMsg = (errorMsg) => {
  console.log('errorMsg', errorMsg);
  switch (errorMsg) {
    case 'Invalid email':
      return 'loginEmailForm.fields.email.errors.notRegistered';
    default:
      // return 'loginEmailForm.fields.email.errors.unknown';
      return errorMsg;
  }
};

export default curateErrors(curateFieldName, curateErrorMsg); // fn

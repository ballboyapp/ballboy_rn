import { curateErrors } from '../../../utils';

/**
 * error = { passcode: ['Wrong passcode'] }
*/
// TODO: pass errorMsg as the fieldName
const curateFieldName = (fieldName) => {
  return 'passcode';
};

/**
 * error = { passcode: ['Wrong passcode'] }
*/
const curateErrorMsg = (errorMsg) => {
  console.log('errorMsg', errorMsg);
  switch (errorMsg) {
    case 'Invalid email or passcode':
      return 'passcodeForm.fields.passcode.errors.wrongPasscode'; // TODO
    default:
      // return 'loginEmailForm.fields.email.errors.unknown';
      return errorMsg;
  }
};

export default curateErrors(curateFieldName, curateErrorMsg); // fn

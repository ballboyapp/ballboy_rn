import { curateErrors } from '../../../utils';

/**
 * error = { email: ['This field must be unique.'] }
*/
const curateFieldName = (fieldName) => {
  // Assign all error messages to cancelMsg field
  return 'cancelMsg';
};

/**
 * error = { email: ['This field must be unique.'] }
*/
const curateErrorMsg = (errorMsg) => {
  return errorMsg;
};

export default curateErrors(curateFieldName, curateErrorMsg); // fn

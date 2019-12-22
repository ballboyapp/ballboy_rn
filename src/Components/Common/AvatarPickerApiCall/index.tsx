import Constants from 'expo-constants';
import React from 'react';
import PropTypes from 'prop-types';
import sha1 from 'sha1';
import axios from 'axios';
// import curateErrors from './utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const {
  cloudinaryCloudname, cloudinaryUploadPreset, cloudinaryApiKey, cloudinaryApiSecret,
} = Constants.manifest.extra;

// See: https://www.youtube.com/watch?v=WOTFmPkWbxo
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Gets input fields from the ProfileEditForm and calls API to store
 * data into the DB.
 */
class AvatarPickerApiCall extends React.PureComponent {
  handleUpload = async (inputFields) => {
    const { onError, onSuccess } = this.props;
    const { file } = inputFields;

    const url = `https://api.cloudinary.com/v1_1/${cloudinaryCloudname}/image/upload`;
    const timestamp = Date.now() / 1000;

    const paramsStr = `timestamp=${timestamp}&upload_preset=${cloudinaryUploadPreset}${cloudinaryApiSecret}`;

    const signature = sha1(paramsStr);

    const params = {
      api_key: cloudinaryApiKey,
      timestamp,
      upload_preset: cloudinaryUploadPreset,
      signature,
    };

    // Prepare post request
    const formData = new FormData();

    try {
      formData.append('file', file);

      Object.keys(params).forEach((key) => {
        formData.append(key, params[key]);
      });
    } catch (exc) {
      // TODO: add sentry
      console.log(`Error when attaching params to axios, ${exc}`);
      onError(exc);
      return;
    }


    // Send the actual request
    try {
      const res = await axios.post(url, formData);
      console.log('SUCCESS', res);
      onSuccess(res.data.secure_url);
    } catch (exc) {
      // TODO: add sentry
      console.log(`Error when uploading image to Cloudinary, ${exc}`);
      onError(exc);
    }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      uploadImg: this.handleUpload,
    };

    return children(api);
  }
}

AvatarPickerApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

AvatarPickerApiCall.defaultProps = {
  onError: () => {},
  onSuccess: () => {},
};

export default AvatarPickerApiCall;


// import Constants from 'expo-constants';
// import React from 'react';
// import PropTypes from 'prop-types';
// import sha1 from 'sha1';
// import superagent from 'superagent';
// // import curateErrors from './utils';

// //------------------------------------------------------------------------------
// // CONSTANTS:
// //------------------------------------------------------------------------------
// const {
//   cloudinaryCloudname, cloudinaryUploadPreset, cloudinaryApiKey, cloudinaryApiSecret,
// } = Constants.manifest.extra;

// // See: https://www.youtube.com/watch?v=WOTFmPkWbxo
// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// /**
//  * @summary Gets input fields from the ProfileEditForm and calls API to store
//  * data into the DB.
//  */
// class AvatarPickerApiCall extends React.PureComponent {
//   handleUpload = (inputFields) => {
//     const { onError, onSuccess } = this.props;
//     const { file } = inputFields;

//     const url = `https://api.cloudinary.com/v1_1/${cloudinaryCloudname}/image/upload`;
//     const timestamp = Date.now() / 1000;

//     const paramsStr = `timestamp=${timestamp}&upload_preset=${cloudinaryUploadPreset}${cloudinaryApiSecret}`;

//     const signature = sha1(paramsStr);

//     const params = {
//       api_key: cloudinaryApiKey,
//       timestamp,
//       upload_preset: cloudinaryUploadPreset,
//       signature,
//     };

//     // Prepare the post request
//     let req;

//     try {
//       req = superagent.post(url);
//       console.log('superagent req', req);
//       req.attach('file', file);
//       console.log('superagent req.file', req);
//     } catch (exc) {
//       // TODO: add sentry
//       console.log(`Error when posting/attaching using superagent, ${exc}`);
//       onError(exc);
//       return;
//     }

//     Object.keys(params).forEach((key) => {
//       req.field(key, params[key]);
//     });

//     // console.log('HANDLE UPDATE', inputFields);

//     // Send the actual request
//     req.end((err, res) => {
//       if (err) {
//         // TODO: add sentry
//         console.log(`Error when uploading image to Cloudinary, ${err}`);
//         onError(err);
//         return;
//       }

//       // console.log('UPDATE RESPONSE', res);
//       // console.log('UPDATE RESPONSE BODY', res.body);
//       // console.log('res.body.secureUrl', res.body.secureUrl);
//       onSuccess(res.body.secure_url);
//     });
//   }

//   render() {
//     const { children } = this.props;

//     // Public API
//     const api = {
//       uploadImg: this.handleUpload,
//     };

//     return children(api);
//   }
// }

// AvatarPickerApiCall.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.object,
//   ]).isRequired,
//   onError: PropTypes.func,
//   onSuccess: PropTypes.func,
// };

// AvatarPickerApiCall.defaultProps = {
//   onError: () => {},
//   onSuccess: () => {},
// };

// export default AvatarPickerApiCall;

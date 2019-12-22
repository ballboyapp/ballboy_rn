import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View } from 'react-native';
import { TimePicker } from '@material-ui/pickers';
import I18n from '../../../I18n';
import ModalProps from '../../../RenderProps/modal-props';
import InputField from '../InputField';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// in/output are UTC moments
const TimePickerField = ({ value, onChange, ...rest }) => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => (
      <View>
        <InputField
          comp="TextField"
          value={value ? value.clone().local().format('HH:mm') : I18n.t('timePickerField.defaultValue')}
          focusable={false}
          onPress={openModal}
          {...rest}
        />
        <TimePicker
          ampm={false}
          value={value ? value.clone().local().toDate() : new Date()}
          open={visible}
          onChange={(date) => {
            // Pass event up to parent component
            onChange(moment(date).utc());
            closeModal();
          }}
          onClose={closeModal}
          TextFieldComponent={() => null}
        />
      </View>
    )}
  </ModalProps>
);

TimePickerField.propTypes = {
  value: PropTypes.instanceOf(moment),
  onChange: PropTypes.func,
  // Plus all InputField props (theme, size)
};

TimePickerField.defaultProps = {
  value: moment.utc(),
  onChange: () => {},
};

export default TimePickerField;


// import React from 'react';
// import PropTypes from 'prop-types';
// import moment from 'moment';
// import { Platform, View } from 'react-native';
// // import TimePickerModal from 'react-native-modal-datetime-picker';
// import TimePickerModal from '@material-ui/pickers/TimePicker';
// import I18n from '../../../I18n';
// import ModalProps from '../../../RenderProps/modal-props';
// import InputField from '../InputField';

// // const TimePickerModal = Platform.select({
// //   web: require('@material-ui/pickers').TimePicker,
// //   default: require('react-native-modal-datetime-picker'),
// // });

// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// // in/output are UTC moments
// const TimePickerField = ({ value, onChange, ...rest }) => (
//   <ModalProps>
//     {({ visible, openModal, closeModal }) => (
//       <View>
//         <InputField
//           comp="TextField"
//           value={value ? value.clone().local().format('HH:mm') : I18n.t('timePickerField.defaultValue')}
//           focusable={false}
//           onPress={openModal}
//           {...rest}
//         />
//         {Platform.OS === 'web' ? (
//           <TimePickerModal
//             ampm={false}
//             value={value ? value.clone().local().toDate() : new Date()}
//             open={visible}
//             onChange={(date) => {
//               // Pass event up to parent component
//               onChange(moment(date).utc());
//               closeModal();
//             }}
//             onClose={closeModal}
//             TextFieldComponent={() => null}
//           />
//         ) : (
//           <TimePickerModal
//             mode="time"
//             date={value ? value.clone().local().toDate() : new Date()}
//             isVisible={visible}
//             onConfirm={(date) => {
//               // Pass event up to parent component
//               onChange(moment(date).utc());
//               closeModal();
//             }}
//             onCancel={closeModal}
//           />
//         )}
//       </View>
//     )}
//   </ModalProps>
// );

// TimePickerField.propTypes = {
//   value: PropTypes.instanceOf(moment),
//   onChange: PropTypes.func,
//   // Plus all InputField props (theme, size)
// };

// TimePickerField.defaultProps = {
//   value: moment.utc(),
//   onChange: () => {},
// };

// export default TimePickerField;

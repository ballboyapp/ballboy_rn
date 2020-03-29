import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import chatRoomQuery from '../../../GraphQL/ChatRooms/Queries/chatRoom';
import sendMessageMutation from '../../../GraphQL/ChatRooms/Mutations/sendMessage';
import sanitizeChatRoomServerError from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Gets input fields from the GiftedChat and calls mutation to send message.
 */
class ChatRoomApiCall extends React.PureComponent {
  handleSend = async (messages) => {
    const {
      roomId,
      onError,
      onSuccess,
      sendMessage,
    } = this.props;

    try {
      await sendMessage({
        variables: {
          roomId,
          text: messages[0].text,
        },
        refetchQueries: [{
          query: chatRoomQuery,
          variables: { roomId },
        }],
      });

      onSuccess();
    } catch (exc) {
      // console.log('Send msg exc', exc);
      onError({ server: [sanitizeChatRoomServerError(exc)] });
    }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      sendMessage: this.handleSend,
    };

    return children(api);
  }
}

ChatRoomApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  roomId: PropTypes.string.isRequired,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  sendMessage: PropTypes.func.isRequired,
};

ChatRoomApiCall.defaultProps = {
  onError: () => {},
  onSuccess: () => {},
};

// Apollo integration
const withMutation = graphql(sendMessageMutation, { name: 'sendMessage' });


export default withMutation(ChatRoomApiCall);


// import React from 'react';
// import PropTypes from 'prop-types';
// import sanitizeChatkitServerError from './utils';

// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// /**
//  * @summary Gets input fields from the GiftedChat and calls API to send message via kitchat.
//  */
// class ChatkitApiCall extends React.PureComponent {
//   handleSend = async (messages) => {
//     const {
//       chatkitUser, roomId, onError, onSuccess,
//     } = this.props;

//     if (chatkitUser) {
//       try {
//         await chatkitUser.sendMessage({ text: messages[0].text, roomId });
//       } catch (exc) {
//         // console.log('Send msg exc', exc);
//         onError({ server: [sanitizeChatkitServerError(exc)] });
//         return;
//       }
//     }
//     onSuccess();
//   }

//   render() {
//     const { children } = this.props;

//     // Public API
//     const api = {
//       sendMessage: this.handleSend,
//     };

//     return children(api);
//   }
// }

// ChatkitApiCall.propTypes = {
//   chatkitUser: PropTypes.object, //eslint-disable-line
//   roomId: PropTypes.string.isRequired,
//   children: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.object,
//   ]).isRequired,
//   onError: PropTypes.func,
//   onSuccess: PropTypes.func,
// };

// ChatkitApiCall.defaultProps = {
//   chatkitUser: null,
//   onError: () => {},
//   onSuccess: () => {},
// };

// export default ChatkitApiCall;

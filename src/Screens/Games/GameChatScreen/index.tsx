import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import styled from 'styled-components/native';
import { GiftedChat } from 'react-native-gifted-chat';
import ErrorHandling from 'error-handling-utils';
import get from 'lodash/get';
import I18n from '../../../I18n';
import { withUser, userPropTypes } from '../../../Context/User';
import FormProps from '../../../RenderProps/form-props';
import chatRoomQuery from '../../../GraphQL/ChatRooms/Queries/chatRoom';
import Row from '../../../Components/Common/Row';
import Spacer from '../../../Components/Common/Spacer';
import Text from '../../../Components/Common/Text';
import AbsoluteCenteredActivityIndicator from '../../../Components/Common/AbsoluteCenteredActivityIndicator';
import ChatRoomApiCall from '../../../Components/Chat/ChatRoomApiCall';
import ChatDay from '../../../Components/Chat/ChatDay';
import ChatSystemMessage from '../../../Components/Chat/ChatSystemMessage';
import ChatBubble from '../../../Components/Chat/ChatBubble';
import ChatInputToolbar from '../../../Components/Chat/ChatInputToolbar';
import ChatComposer from '../../../Components/Chat/ChatComposer';
import ChatSend from '../../../Components/Chat/ChatSend';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Relative = styled.View`
  flex: 1; /* full height */
  position: relative;
  background-color: ${({ theme }) => theme.colors.notifBg};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameChatScreen = ({ user, navigation }) => {
  const { roomId } = navigation.state.params;

  const queryRes = useQuery(chatRoomQuery, {
    variables: { roomId },
    pollInterval: 1000 * 10, // milliseconds
  });

  const { loading, error, data } = queryRes;
  // console.log('USER', user);
  // console.log('ROOM ID', roomId);
  // console.log('I18N LOCALE', I18n.locale.substr(0, 2));

  const messages = get(data, 'chatRoom.messages', []).map(({
    _id, sender, text, createdAt,
  }) => ({
    _id,
    user: {
      _id: sender.id,
      name: sender.name ? sender.name.split(' ')[0] : '',
      avatar: sender.avatarURL,
    },
    text,
    createdAt: new Date(createdAt),
  }))
    .reverse();

  const noMessages = [{
    _id: '1',
    text: I18n.t('chatInputField.noMessages'),
    createdAt: new Date(),
    system: true,
    // Any additional custom parameters are passed through
  }];

  return (
    <FormProps>
      {({
        disabled,
        errors,
        handleBefore,
        handleServerError,
        handleSuccess,
      }) => {
        const serverErrors = errors ? ErrorHandling.getFieldErrors(errors, 'server') : '';

        return (
          <ChatRoomApiCall
            roomId={roomId}
            onSuccess={handleSuccess}
            onError={handleServerError}
          >
            {({ sendMessage }) => (
              <Relative>
                {loading && <AbsoluteCenteredActivityIndicator />}
                <GiftedChat
                  user={user}
                  messages={messages.length > 0 ? messages : noMessages}
                  messagesContainerStyle={{ overflowY: 'scroll' }} // required for web to avoid overflow
                  renderAvatarOnTop
                  isAnimated
                  alignTop
                  renderUsernameOnMessage
                  renderBubble={(props) => <ChatBubble {...props} />}
                  renderDay={(props) => <ChatDay {...props} locale={I18n.locale.substr(0, 2)} />}
                  renderInputToolbar={(props) => <ChatInputToolbar {...props} />}
                  minInputToolbarHeight={50}
                  renderSystemMessage={(props) => <ChatSystemMessage {...props} />}
                  maxComposerHeight={70}
                  keyboardShouldPersistTaps="never"
                  renderComposer={(props) => <ChatComposer {...props} />}
                  placeholder={I18n.t('chatInputField.placeholder')}
                  textInputProps={{ editable: !disabled }}
                  renderSend={(props) => <ChatSend {...props} disabled={disabled} />}
                  alwaysShowSend
                  onSend={(messages) => {
                    handleBefore(); // set disable props to true
                    sendMessage(messages);
                  }}
                    // Display server side errors if any
                  renderChatFooter={() => (
                    serverErrors.length > 0 ? (
                      <Row>
                        <Spacer row size="ML" />
                        <Text color="error">{serverErrors}</Text>
                      </Row>
                    ) : null
                  )}
                />
                <Spacer size="ML" />
              </Relative>
            )}
          </ChatRoomApiCall>
        );
      }}
    </FormProps>
  );
};

GameChatScreen.propTypes = {
  user: userPropTypes.user.isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        roomId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default withUser(GameChatScreen);

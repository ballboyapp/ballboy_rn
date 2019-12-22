import Constants from 'expo-constants';
import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import Chatkit from '@pusher/chatkit-client/react-native';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const { NODE_ENV } = process.env;
const {
  devServerUrl,
  prodServerUrl,
  chatkitAuthEndpoint,
  chatkitInstanceLocator,
  chatkitReadOnlyUser,
} = Constants.manifest.extra;

const serverUrl = NODE_ENV === 'production' ? prodServerUrl : devServerUrl;

//------------------------------------------------------------------------------
// PROPS AND METHODS PROVIDER:
//------------------------------------------------------------------------------
class ChatManagerProps extends React.PureComponent {
  state = {
    loading: true,
    chatkitUser: null,
    room: null,
    messages: [],
  }

  async componentDidMount() {
    const { userId, roomId } = this.props;
    // console.log('CHAT MANAGER USER ID', userId);
    // console.log('CHAT MANAGER ROOM ID', roomId);

    if (!userId) {
      this.setState({ loading: false });
      return;
    }

    // Get the authentication token from local storage if it exists
    const token = await AsyncStorage.getItem('x-auth-token');
    // console.log('TOKEN', token);

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: chatkitInstanceLocator,
      userId,
      tokenProvider: new Chatkit.TokenProvider({
        url: `${serverUrl}${chatkitAuthEndpoint}`,
        headers: {
          authorization: userId === chatkitReadOnlyUser ? '' : (token ? `Bearer ${token}` : ''),
        },
      }),
    });

    let chatkitUser = null;

    try {
      chatkitUser = await chatManager.connect();
      this.setState({ chatkitUser });
    } catch (exc) {
      console.error('exc', exc);
      this.setState({ loading: false });
      return;
    }

    // console.log('CHAT MANAGER CHATKITUSER', chatkitUser);

    if (roomId) {
      try {
        const room = chatkitUser.subscribeToRoom({
          roomId,
          messageLimit: 100,
          hooks: {
            onMessage: ({
              id, text, createdAt, sender,
            }) => {
              // Invert sense for gifted chat to work
              this.setState((prevState) => ({
                messages: [
                  {
                    _id: id,
                    text,
                    createdAt: new Date(createdAt),
                    user: {
                      _id: sender.id,
                      name: sender.name ? sender.name.split(' ')[0] : '',
                      avatar: sender.avatarURL,
                    },
                  },
                  ...prevState.messages,
                ],
              }));
            },
          },
        });
        this.setState({ room });
      } catch (exc) {
        console.error('exc', exc);
      }
    }

    this.setState({ loading: false });
  }

  async componentWillUnmount() {
    const { userId, roomId } = this.props;
    const { chatkitUser } = this.state;

    if (chatkitUser) {
      try {
        await chatkitUser.disconnect();
      } catch (exc) {
        console.error('disconnect exc', exc);
      }
    }

    if (chatkitUser && userId && userId !== chatkitReadOnlyUser) {
      try {
        await chatkitUser.roomSubscriptions[roomId].cancel();
      } catch (exc) {
        console.error('unsubscribe exc', exc);
      }
    }
  }

  render() {
    const { children } = this.props;
    const {
      loading,
      chatkitUser,
      room,
      messages,
    } = this.state;

    // Public API
    const api = {
      loading,
      chatkitUser,
      room,
      messages,
    };

    return children(api);
  }
}

ChatManagerProps.propTypes = {
  userId: PropTypes.string,
  roomId: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

ChatManagerProps.defaultProps = {
  userId: '',
  roomId: '',
};

export default ChatManagerProps;

//------------------------------------------------------------------------------
// PROP TYPES:
//------------------------------------------------------------------------------
export const disabledPropTypes = {
  loading: PropTypes.bool.isRequired,
  chatkitUser: PropTypes.object.isRequired,
  room: PropTypes.object,
  messages: PropTypes.arrayOf(PropTypes.object),
};

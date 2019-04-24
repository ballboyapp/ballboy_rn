import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components/native';
import { withUser, userPropTypes } from '../../../Context/User';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import { TopLayout, BottomLayout } from '../../../Components/Layouts/FixedBottomLayout';
import ChatManagerProps from '../../../RenderProps/chat-manager-props';
import Block from '../../../Components/Common/Block';
import Text from '../../../Components/Common/Text';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import ChatMsgList from '../../../Components/Chat/ChatMsgList';
import ChatForm from '../../../Components/Chat/ChatForm';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1; /* full height */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameChatScreen = ({ user, chatkitUser, navigation }) => {
  const gameUUID = navigation.state.params.uuid;
  console.log('USER', user);
  console.log('CHATKIT USER', chatkitUser);

  return (
    <Query
      query={GET_GAME_DETAILS}
      variables={{ uuid: gameUUID }}
      fetchPolicy="cache-and-network"
    >
      {({ loading, error, data }) => {
        if (loading) { return <CenteredActivityIndicator />; }
        if (error) {
          console.log(error);
          return <Text>Something went wrong :(</Text>;
        }

        const { roomId = '19397290' } = data.game; // TODO: 19397290 is for test purpose only
        console.log('ROOM ID', roomId);

        return (
          <FlexOne>
            <TopLayout bgColor="transparent">
              <Block>
                <ChatManagerProps roomId={roomId}>
                  {({ loading: wait, messages }) => {
                    if (wait) {
                      return <CenteredActivityIndicator />;
                    }

                    return (
                      <ChatMsgList
                        userId={user ? user.uuid : ''}
                        messages={messages}
                      />
                    );
                  }}
                </ChatManagerProps>
              </Block>
            </TopLayout>
            <BottomLayout bgColor="transparent" borderColor="transparent">
              {chatkitUser && (
                <ChatForm
                  onSuccessHook={async ({ text }) => {
                    try {
                      await chatkitUser.sendMessage({ text, roomId });
                    } catch (exc) {
                      console.log(exc);
                      // onError({ text: [sanitizeChatkitServerError(exc)] });
                      // return;
                    }
                  }}
                />
              )}
            </BottomLayout>
          </FlexOne>
        );
      }}
    </Query>
  );
};

GameChatScreen.propTypes = {
  user: userPropTypes.user,
  chatkitUser: userPropTypes.chatkitUser,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

GameChatScreen.defaultProps = {
  user: null,
  chatkitUser: null,
};

export default withUser(GameChatScreen);

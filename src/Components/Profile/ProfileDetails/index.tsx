import React from 'react';
import { View } from 'react-native';
// import styled from 'styled-components/native';
import I18n from '../../../I18n';
import { userPropTypes } from '../../../Context/User';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
// import Divider from '../../Common/Divider';
import Text from '../../Common/Text';
import Avatar from '../../Common/Avatar';
// import ProfileTabs from '../ProfileTabs';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// const Bottom = styled.View`
//   flex: 1;
//   background-color: ${({ theme }) => theme.colors.bgGrey};
// `;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfileDetails = ({ user }) => {
  const { profile } = user;
  const { username, city, country } = profile;

  return (
    <View>
      <Block>
        <Row justifyContent="center">
          <Avatar user={user} size="L" />
        </Row>
        <Spacer size="XL" />
        <Text size="L" center>
          {username}
        </Text>
        <Spacer size="S" />
        <Text size="M" color="gray" center>
          {`${city}, ${I18n.t(country)}`}
        </Text>
      </Block>
      {/* <Spacer size="M" />
      <Divider />
      <Bottom>
        <ProfileTabs user={user} style={{ flex: 1 }} />
      </Bottom> */}
    </View>
  );
};

ProfileDetails.propTypes = {
  user: userPropTypes.user.isRequired,
};

export default ProfileDetails;

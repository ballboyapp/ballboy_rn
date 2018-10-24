import React from 'react';
import PropTypes from 'prop-types';
// import { propType } from 'graphql-anywhere';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Colors from '../../../Themes/Colors';
// import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
import GET_USER_DETAILS from '../../../GraphQL/Users/Queries/GET_USER_DETAILS';
import Text from '../../../Components/Common/Text';
import ProfileDetails from '../../../Components/Profile/ProfileDetails';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce/use DefaultLayout instead
const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: we shouldn't be querying userData here. That should be top level
// userData provider
const ProfileDetailsScreen = ({ user }) => (
  <Query
    query={GET_USER_DETAILS}
    variables={{ uuid: user.uuid }}
  >
    {({ loading, error, data }) => {
      if (loading) return <CenteredActivityIndicator />;
      if (error) return <Text>Error :( {JSON.stringify(error)}</Text>;
      if (!data || !data.user) { return null; }

      return (
        <Container testID="ProfileDetailsScreen">
          <ProfileDetails user={data.user} />
        </Container>
      );
    }}
  </Query>
);

ProfileDetailsScreen.propTypes = {
  // TODO: implement userProvider and use userDetailsFragment
  user: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
  }).isRequired,
};

// Redux integration
const mapStateToProps = ({ user }) => ({ user });
const withRedux = connect(mapStateToProps, null);

export default withRedux(ProfileDetailsScreen);

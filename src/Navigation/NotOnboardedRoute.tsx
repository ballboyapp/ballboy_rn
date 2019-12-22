import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withUser, userPropTypes } from '../Context/User';
import CenteredActivityIndicator from '../Components/Common/CenteredActivityIndicator';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wrapped route
 * has completed the onboarding. Otherwise renders the overlay component.
 */
class NotOnboardedRoute extends React.PureComponent {
  componentWillMount() {
    this.handleOnboarded(this.props);
  }

  componentWillUpdate(nextProps) {
    this.handleOnboarded(nextProps);
  }

  handleOnboarded = ({ loadingUser, user }) => {
    const { onOnboarded } = this.props;

    if (!loadingUser && user && user.location) {
      onOnboarded();
    }
  }

  render() {
    const {
      loadingUser,
      user,
      component: Component,
      onOnboarded,
      ...rest
    } = this.props;

    // Wait until user is ready
    if (loadingUser) {
      return <CenteredActivityIndicator />;
    }

    // In case user IS onboarded, render loading component until other logic kicks in
    if (user && user.location) {
      return <CenteredActivityIndicator />;
    }

    // ...Otherwise, render requested component
    return <Component {...rest} />;
  }
}

NotOnboardedRoute.propTypes = {
  loadingUser: userPropTypes.loadingUser.isRequired,
  user: userPropTypes.user,
  component: PropTypes.func.isRequired,
  onOnboarded: PropTypes.func,
};

NotOnboardedRoute.defaultProps = {
  user: null,
  onOnboarded: () => {},
};

const enhance = compose(
  withUser,
);

export default enhance(NotOnboardedRoute);

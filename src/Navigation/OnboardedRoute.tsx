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
class OnboardedRoute extends React.PureComponent {
  componentWillMount() {
    this.handleNotOnboarded(this.props);
  }

  componentWillUpdate(nextProps) {
    this.handleNotOnboarded(nextProps);
  }

  handleNotOnboarded = ({ loadingUser, user }) => {
    const { onNotOnboarded } = this.props;

    if (!loadingUser && user && !user.location) {
      onNotOnboarded();
    }
  }

  render() {
    const {
      loadingUser,
      user,
      component: Component,
      onNotOnboarded,
      ...rest
    } = this.props;

    // Wait until user is ready
    if (loadingUser) {
      return <CenteredActivityIndicator />;
    }

    // In case user is NOT logged in, render loading component until other logic kicks in
    if (!user || !user.location) {
      return <CenteredActivityIndicator />;
    }

    // ...Otherwise, render requested component
    return <Component {...rest} />;
  }
}

OnboardedRoute.propTypes = {
  loadingUser: userPropTypes.loadingUser.isRequired,
  user: userPropTypes.user,
  component: PropTypes.func.isRequired,
  onNotOnboarded: PropTypes.func,
};

OnboardedRoute.defaultProps = {
  user: null,
  onNotOnboarded: () => {},
};

const enhance = compose(
  withUser,
);

export default enhance(OnboardedRoute);


// import React from 'react';
// import PropTypes from 'prop-types';
// import { compose } from 'recompose';
// import { withUser, userPropTypes } from '../Context/User';
// import CenteredActivityIndicator from '../Components/Common/CenteredActivityIndicator';

// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// /**
//  * @summary Makes sure that the user that is trying to access the wrapped route
//  * has completed the onboarding. Otherwise renders the overlay component.
//  */
// const OnboardedRoute = ({
//   loadingUser,
//   user,
//   component: Component,
//   overlay: Overlay,
//   ...rest
// }) => {
//   // Wait until user is ready
//   if (loadingUser) {
//     return <CenteredActivityIndicator />;
//   }

//   // In case user is NOT logged in, render loading component until other logic kicks in
//   if (!user) {
//     return <CenteredActivityIndicator />;
//   }

//   // In case user didn't complete the onboarding, render overlay component
//   if (!user.location) {
//     return <Overlay />;
//   }

//   // ...Otherwise, render requested component
//   return <Component {...rest} />;
// };

// OnboardedRoute.propTypes = {
//   loadingUser: userPropTypes.loadingUser.isRequired,
//   user: userPropTypes.user,
//   component: PropTypes.func.isRequired,
//   overlay: PropTypes.func.isRequired,
// };

// OnboardedRoute.defaultProps = {
//   user: null,
// };

// const enhance = compose(
//   withUser,
// );

// export default enhance(OnboardedRoute);

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
 * is NOT authenticated. In case she is, call onLoggedIn callback.
 */
class LoggedOutRoute extends React.PureComponent {
  componentWillMount() {
    this.handleLoggedIn(this.props);
  }

  componentWillUpdate(nextProps) {
    this.handleLoggedIn(nextProps);
  }

  handleLoggedIn = ({ loadingUser, user }) => {
    const { onLoggedIn } = this.props;

    if (!loadingUser && user && user._id) {
      onLoggedIn({ location: user.location }); // might be undefined
    }
  }

  render() {
    const {
      loadingUser,
      user,
      component: Component,
      onLoggedIn,
      ...rest
    } = this.props;

    // Wait until user is ready
    if (loadingUser) {
      return <CenteredActivityIndicator />;
    }

    // In case user IS logged in, render loading component until other logic kicks in
    if (user && user._id) {
      return <CenteredActivityIndicator />;
    }

    // ...Otherwise, render requested component
    return <Component {...rest} />;
  }
}

LoggedOutRoute.propTypes = {
  loadingUser: userPropTypes.loadingUser.isRequired,
  user: userPropTypes.user,
  component: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func,
};

LoggedOutRoute.defaultProps = {
  user: null,
  onLoggedIn: () => {},
};

const enhance = compose(
  withUser,
);

export default enhance(LoggedOutRoute);


// import React from 'react';
// import PropTypes from 'prop-types';
// import { compose } from 'react-apollo';
// import { withUser, userPropTypes } from '../Context/User';
// import { withLocation, locationPropTypes } from '../Context/Location';
// import CenteredActivityIndicator from '../Components/Common/CenteredActivityIndicator';

// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// /**
//  * @summary Makes sure that the user that is trying to access the wrapped route
//  * is NOT authenticated. In case she is, call onLoggedIn callback.
//  */
// class LoggedOutRoute extends React.PureComponent {
//   isLoggedIn = (props) => {
//     const {
//       loadingUser,
//       user,
//       loadingLocation,
//     } = props;

//     return !loadingUser && !loadingLocation && user && user.uuid;
//   }

//   componentWillMount() {
//     const { location, onLoggedIn, ...rest } = this.props;
//     if (this.isLoggedIn(rest)) {
//       onLoggedIn({ location });
//     }
//   }

//   componentWillUpdate(nextProps) {
//     const { location, onLoggedIn, ...rest } = nextProps;
//     if (this.isLoggedIn(rest)) {
//       onLoggedIn({ location });
//     }
//   }

//   render() {
//     const {
//       loadingUser,
//       user,
//       loadingLocation,
//       location,
//       component: Component,
//       onLoggedIn,
//       ...rest
//     } = this.props;

//     // Wait until user is ready
//     if (loadingUser || loadingLocation) {
//       return <CenteredActivityIndicator />;
//     }

//     // In case user IS logged in, render overlay component
//     if (user && user.uuid) {
//       return <CenteredActivityIndicator />;
//     }

//     // ...Otherwise, render requested component
//     return <Component {...rest} />;
//   }
// }

// LoggedOutRoute.propTypes = {
//   loadingUser: userPropTypes.loadingUser.isRequired,
//   user: userPropTypes.user,
//   loadingLocation: locationPropTypes.loadingLocation.isRequired,
//   location: locationPropTypes.location,
//   component: PropTypes.func.isRequired,
//   onLoggedIn: PropTypes.func,
// };

// LoggedOutRoute.defaultProps = {
//   user: null,
//   location: null,
//   onLoggedIn: () => {},
// };

// const enhance = compose(
//   withUser,
//   withLocation,
// );

// export default enhance(LoggedOutRoute);

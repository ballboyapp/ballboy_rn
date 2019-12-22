import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withUser, userPropTypes } from '../Context/User';
import { withCities, citiesPropTypes } from '../Context/Cities';
import CenteredActivityIndicator from '../Components/Common/CenteredActivityIndicator';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wrapped route
 * IS authenticated. In case she isn't, call onLoggedOut callback.
 */
class LoggedInRoute extends React.PureComponent {
  componentWillMount() {
    this.handleLoggedOut(this.props);
  }

  componentWillUpdate(nextProps) {
    this.handleLoggedOut(nextProps);
  }

  handleLoggedOut = ({ loadingUser, user }) => {
    const { onLoggedOut } = this.props;

    if (!loadingUser && !user) {
      onLoggedOut();
    }
  }

  render() {
    const {
      loadingUser,
      user,
      loadingCities,
      component: Component,
      overlay: Overlay,
      onLoggedOut,
      ...rest
    } = this.props;

    // Wait until user and cities are ready
    if (loadingUser || loadingCities) {
      return <CenteredActivityIndicator />;
    }

    // In case user is NOT logged in, render loading component until other logic kicks in
    if (!user) {
      return Overlay ? <Overlay /> : <CenteredActivityIndicator />;
    }

    // ...Otherwise, render requested component
    return <Component {...rest} />;
  }
}

LoggedInRoute.propTypes = {
  loadingUser: userPropTypes.loadingUser.isRequired,
  user: userPropTypes.user,
  loadingCities: citiesPropTypes.loadingCities.isRequired,
  component: PropTypes.func.isRequired,
  overlay: PropTypes.func,
  onLoggedOut: PropTypes.func,
};

LoggedInRoute.defaultProps = {
  user: null,
  overlay: null, // TODO: use an empty function instead? () => {};
  onLoggedOut: () => {},
};

const enhance = compose(
  withUser,
  withCities,
);

export default enhance(LoggedInRoute);


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
//  * IS authenticated. In case she isn't, call onLoggedOut callback.
//  */
// class LoggedInRoute extends React.PureComponent {
//   handleLoggedOut = ({ loadingUser, user, onLoggedOut }) => {
//     if (!loadingUser && !user) {
//       onLoggedOut();
//     }
//   }

//   componentWillMount() {
//     this.handleLoggedOut(this.props);
//   }

//   componentWillUpdate(nextProps) {
//     this.handleLoggedOut(nextProps);
//   }

//   render() {
//     const {
//       loadingUser,
//       user,
//       component: Component,
//       onLoggedOut,
//       ...rest
//     } = this.props;

//     // Wait until user is ready
//     if (loadingUser) {
//       return <CenteredActivityIndicator />;
//     }

//     // In case user is NOT logged in, render loading component until other logic kicks in
//     if (!user) {
//       return <CenteredActivityIndicator />;
//     }

//     // ...Otherwise, render requested component
//     return <Component {...rest} />;
//   }
// }

// LoggedInRoute.propTypes = {
//   loadingUser: userPropTypes.loadingUser.isRequired,
//   user: userPropTypes.user,
//   component: PropTypes.func.isRequired,
//   onLoggedOut: PropTypes.func,
// };

// LoggedInRoute.defaultProps = {
//   user: null,
//   onLoggedOut: () => {},
// };

// const enhance = compose(
//   withUser,
// );

// export default enhance(LoggedInRoute);


// import React from 'react';
// import PropTypes from 'prop-types';
// import { compose } from 'react-apollo';
// import { withUser, userPropTypes } from '../Context/User';
// // import { withLocation, locationPropTypes } from '../Context/Location';
// import CenteredActivityIndicator from '../Components/Common/CenteredActivityIndicator';

// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// /**
//  * @summary Makes sure that the user that is trying to access the wrapped route
//  * is authenticated. If not, the LoggedInRoute component renders the given
//  * overlay component on top of the current route.
//  */
// const LoggedInRoute = ({
//   loadingUser,
//   user,
//   // loadingLocation,
//   component: Component,
//   overlay: Overlay,
//   ...rest
// }) => {
//   const childProps = { ...rest };

//   // Wait until user is ready
//   if (loadingUser /* || loadingLocation */) {
//     return <CenteredActivityIndicator />;
//   }

//   // In case user is NOT logged in, render overlay component
//   if (!user) {
//     return <Overlay {...childProps} />;
//   }

//   // ...Otherwise, render requested component
//   return <Component {...childProps} />;
// };

// LoggedInRoute.propTypes = {
//   loadingUser: userPropTypes.loadingUser.isRequired,
//   user: userPropTypes.user,
//   // loadingLocation: locationPropTypes.loadingLocation.isRequired,
//   component: PropTypes.func.isRequired,
//   overlay: PropTypes.func,
// };

// LoggedInRoute.defaultProps = {
//   user: null,
//   overlay: () => {},
// };

// const enhance = compose(
//   withUser,
//   // withLocation,
// );

// export default enhance(LoggedInRoute);

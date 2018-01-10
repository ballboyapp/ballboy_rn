import { Text, View } from 'react-native'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react'

import Logo from '../../Components/Logo'
import styles from './Styles/Splash'

import propTypes from 'prop-types'
import { connect } from 'react-redux'

import locationAction from '../../Redux/LocationRedux'
import facebookAction from '../../Redux/FacebookRedux'

export class _SplashScreen extends React.Component {
  // eslint-disable-next-line no-undef
  loginWithFacebook = () => {
    // LoginManager.logInWithReadPermissions(['public_profile']).then(console.log)
    // this.props.checkLocationPermission()
    this.props.facebookLogin()
    // TODO: add FB integration
    // this.props.navigation.navigate('FindSpotScreen')
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo />
          <Text style={styles.title}>{I18n.t('Sporty Spots')}</Text>
          <Icon.Button name='facebook' backgroundColor='#3b5998' onPress={this.loginWithFacebook}>
            {I18n.t('Login with Facebook')}
          </Icon.Button>
        </View>
      </View>
    )
  }
}

_SplashScreen.propTypes = {
  navigation: propTypes.object.isRequired,
  checkLocationPermission: propTypes.func,
  facebookLogin: propTypes.func
}

const dispatchToProps = (dispatch) => ({
  checkLocationPermission: () => dispatch(locationAction.checkLocationPermission()),
  facebookLogin: () => dispatch(facebookAction.facebookLogin())
})

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, dispatchToProps)(_SplashScreen)

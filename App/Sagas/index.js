import { takeLatest, all, fork } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { FacebookTypes } from '../Redux/FacebookRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { checkLocationPermission, locationSaga } from './LocationSagas'
import { facebookSaga } from './FacebookSagas'
import { APISaga } from './APISagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect LocationTypes To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    takeLatest(FacebookTypes.FACEBOOK_GET_ACCESS_TOKEN_SUCCESS, checkLocationPermission),
    fork(locationSaga),
    fork(facebookSaga),
    fork(APISaga(api))
  ])
}

import Permissions from 'react-native-permissions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { reduxStore } from '../Redux';
import locationActions, { LocationTypes } from '../Redux/LocationRedux';

export function* locationSaga(api) {
  yield takeLatest(LocationTypes.UPDATE_LOCATION, function* () {
    const permission = yield call(Permissions.check, 'location');
    if (permission === 'authorized') {
      navigator.geolocation.getCurrentPosition((result) => {
        // https://github.com/redux-saga/redux-saga/issues/79
        reduxStore.dispatch(locationActions.updateLocationFinished({
          lat: result.coords.latitude,
          lng: result.coords.longitude,
        }));
      }, console.warn);
    }
  });
  yield put(locationActions.updateLocation());
}

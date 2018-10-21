import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import dashboardReducer from './dashboard';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  dash: dashboardReducer
});


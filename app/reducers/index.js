import { combineReducers } from "redux"

import locationState from './locationDropDownReducer.js'
import serviceDateState from './datePickerReducer.js'
import serviceTimeState from './serviceTimeReducer.js'
import scheduledByState from './serviceTimeReducer.js'

export default combineReducers({
	locationState,
	serviceDateState,
	serviceTimeState,
	scheduledByState
})
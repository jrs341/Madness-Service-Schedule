import { combineReducers } from "redux"

import locationState from './locationDropDownReducer.js'
import serviceDateState from './datePickerReducer.js'

export default combineReducers({
	locationState,
	serviceDateState
})
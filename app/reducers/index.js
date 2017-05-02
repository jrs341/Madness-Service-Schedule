import { combineReducers } from "redux"

import locationState from './locationDropDownReducer.js'
import serviceDateState from './datePickerReducer.js'
import serviceTimeState from './serviceTimeReducer.js'
import scheduledByState from './employeeDropDownReducer.js'
import vehicleYearState from './vehicleYearReducer.js'
import formDialogState from './formDialogActionsReducer.js'

export default combineReducers({
	locationState,
	serviceDateState,
	serviceTimeState,
	scheduledByState,
	vehicleYearState,
	formDialogState
})
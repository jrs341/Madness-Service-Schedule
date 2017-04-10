import React from 'react';
import LocationDropDown from './LocationDropDown'
import DatePicker from './DatePicker'
import TimeDropDown from './TimeDropDown'

export default class LocationDateTime extends React.Component {

	constructor(props) {
	super(props);
	this.state = {value: 1};
  	}

	render() {
		return(
			<div>

				<LocationDropDown />

				<DatePicker />

				<TimeDropDown />

			</div>
		); 	
	}
}
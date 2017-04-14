import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import { Row } from 'react-grid-system'
import RaisedButton from 'material-ui/RaisedButton'

var date = new Date();
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var today = days[date.getDay()];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var month = months[date.getMonth()];
var day = date.getDate();

@connect((store) => {
	return {
		location: store.locationState.location,
		serviceDate: store.serviceDateState.serviceDate,
		serviceTime: store.serviceTimeState.serviceTime,
		scheduledBy: store.scheduledByState.scheduledBy
	};
})


export default class ServiceSchedule extends React.Component {

constructor(props) {
	super(props);
	this.state = {
		given_name: '',
		family_name: '',
		phone_number: '',
		email: '',
		vehicle_make: '',
		vehicle_model: '',
		vehicle_year: '',
		requested_service: '' 
	};

}

componentWillMount() {
	// get request here for current date
}

  render() {
    return (
    	<div>
    		<h1> Madness AutoWorks Service Schedule for {this.props.location} {today} {month} {day} </h1>
    	</div>
    );
  }
}
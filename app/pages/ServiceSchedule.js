import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import { Row } from 'react-grid-system'
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton'

var date = new Date();
var dateString = date.toString().split(' ', 4).join(' ');
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
		requested_service: '',
		scheduled_by: '' 
	};

	this.scheduleForToday = this.scheduleForToday.bind(this);

}

componentWillMount() {
	// get request here for current date
	console.log(dateString);
	this.scheduleForToday();
}

scheduleForToday = () => {
	axios({
      type: 'GET',
      url: '/scheduleForToday/' + dateString
    }).then((response)=> {
    	console.log(response.data);
    	if(response.data == '') {
    		console.log('nothing scheduled for today');
    		
    	}
    	else {
    		console.log('today s schedule');
    		this.setState({
    			given_name: response.data.given_name,
    			family_name: response.data.family_name,
    			email: response.data.email,
    			phone_number: response.data.phone_number,
    			vehicle_year: response.data.vehicle_year,
    			vehicle_make: response.data.vehicle_make,
    			vehicle_model: response.data.vehicle_model,
    			scheduled_by: response.data.scheduled_by
    		})
    	}
      
    });
}

  render() {
    return (
    	<div>
    		<h1> Madness AutoWorks Service Schedule for {this.props.location} {today} {month} {day} </h1>
    		<h1> {this.state.given_name} </h1>
    		<h1> {this.state.family_name} </h1>
    	</div>
    );
  }
}
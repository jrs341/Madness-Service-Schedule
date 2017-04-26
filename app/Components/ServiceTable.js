import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import { Card, CardTitle, CardHeader, CardText, CardActions } from 'material-ui/Card'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {List, ListItem} from 'material-ui/List'
import axios from 'axios'
import LocationDropDown from '../Components/LocationDropDown'
import DatePicker from '../Components/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import ActionBuild from 'material-ui/svg-icons/action/build'
import ContactEmail from 'material-ui/svg-icons/communication/email'
import ContactPhone from 'material-ui/svg-icons/communication/phone'
import Vehicle from 'material-ui/svg-icons/maps/directions-car'
import Employee from 'material-ui/svg-icons/action/account-box'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'

var date = new Date();
var dateString = date.toString().split(' ', 4).join(' ');
var serviceStatus = 'red';
// const times =['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30'];

@connect((store) => {
	return {
		location: store.locationState.location,
		serviceDate: store.serviceDateState.serviceDate,
		serviceTime: store.serviceTimeState.serviceTime,
		scheduledBy: store.scheduledByState.scheduledBy
	};
})


export default class ServiceTable extends React.Component {

constructor(props) {
	super(props);

	// this.times = [{time: '9:00'}, {time: '9:30'}, {time: '10:00'}, {time: '10:30'}, {time: '11:00'}, {time: '11:30'}, {time: '12:00'}, {time: '12:30'}, {time: '1:00'}, {time: '1:30'}, {time: '2:00'}, {time: '2:30'}, {time: '3:00'}, {time: '3:30'}, {time: '4:00'}, {time: '4:30'}],

	this.state = {
		scheduleInfo: [],
		times: [{time: '9:00'}, {time: '9:30'}, {time: '10:00'}, {time: '10:30'}, {time: '11:00'}, {time: '11:30'}, {time: '12:00'}, {time: '12:30'}, {time: '1:00'}, {time: '1:30'}, {time: '2:00'}, {time: '2:30'}, {time: '3:00'}, {time: '3:30'}, {time: '4:00'}, {time: '4:30'}],
		cardDisplay: 'none',
		scheduleStatus: '',
		serviceStatus: 'red'
		// given_name: '',
		// family_name: '',
		// phone_number: '',
		// email: '',
		// vehicle_make: '',
		// vehicle_model: '',
		// vehicle_year: '',
		// requested_service: '',
		// scheduled_by: '' 
	};

	this.scheduleForToday = this.scheduleForToday.bind(this);
	this.getSchedule = this.getSchedule.bind(this);
	this.tableRow = this.tableRow.bind(this);
	this.updateScheduleInfo = this.updateScheduleInfo.bind(this);
	this.serviceStatus = this.serviceStatus.bind(this);
}

// componentWillMount() {
// 	this.scheduleForToday();
// }

componentDidMount() {
	this.scheduleForToday();
}

// without the if else statement an infinate loop is created
componentWillUpdate(nextProps, nextState){
	console.log('will update');
	// console.log(nextState);
	if (this.props.serviceDate != nextProps.serviceDate || this.props.location != nextProps.location){
		this.setState({cardDisplay: 'none'});
		this.getSchedule(nextProps.serviceDate, nextProps.location);
	}
	else {
		
	}
}

componentDidUpdate(prevProps, prevState) {
	console.log('did update');
	// console.log(prevState);
	
}

tableRow(times, i) {
	// console.log(this.state.times[0].time);
	if (this.state.times[i].booked){
		console.log('booked');
		return (
			<TableRow>
	       	 <TableRowColumn >{this.state.times[i].time}</TableRowColumn>
	         <TableRowColumn>{this.state.times[i].given_name + ' ' + this.state.times[i].family_name}</TableRowColumn>
	         <TableRowColumn>{this.state.times[i].vehicle_model}</TableRowColumn>
	         <TableRowColumn>{this.state.times[i].requested_service}</TableRowColumn>
	    </TableRow>
		);
		} else {
		return (
			<TableRow>
				<TableRowColumn>{this.state.times[i].time}</TableRowColumn>
				<TableRowColumn>{' '}</TableRowColumn>
		        <TableRowColumn>{' '}</TableRowColumn>
		        <TableRowColumn>{' '}</TableRowColumn>
			</TableRow>
		);
	}  
}
 	

serviceStatus(event, isInputChecked) {
	console.log('serviceStatus');
	// console.log(event.target.name);
	alert('are you sure');
	// console.log(isInputChecked);
	axios.post('/serviceStatus',
		{ 
			email: event.target.name,
			completed: 1
		}).then(function(response){
			console.log('updated service status');
		});
}



updateScheduleInfo() {
	console.log('updateScheduleInfo');
    // this.setState({scheduleInfo: getRequestResponse});
    for (var i=0; i<this.state.times.length; i++){
    	for(var j=0; j<this.state.scheduleInfo.length; j++){
    		if (this.state.times[i].time == this.state.scheduleInfo[j].time){
    			this.state.times.splice(i, 1, this.state.scheduleInfo[j]);
    			// console.log(this.state.times);
    		}
    	}
    }
}

// default schedule when component mounts default to today and austin
scheduleForToday = () => {
	axios({
      type: 'GET',
      url: '/scheduleForToday/' + dateString + '/' + this.props.location
    }).then((response)=> {
    	if(response.data == '') {
    		this.setState({scheduleInfo: []});
    		this.setState({times: [{time: '9:00'}, {time: '9:30'}, {time: '10:00'}, {time: '10:30'}, {time: '11:00'}, {time: '11:30'}, {time: '12:00'}, {time: '12:30'}, {time: '1:00'}, {time: '1:30'}, {time: '2:00'}, {time: '2:30'}, {time: '3:00'}, {time: '3:30'}, {time: '4:00'}, {time: '4:30'}] });
    		console.log('nothing scheduled for today');
    		this.setState({scheduleStatus: 'There are no reservations for today at this location'});	
    	}
    	else {
    		this.setState({scheduleInfo: response.data});
    		this.setState({times: [{time: '9:00'}, {time: '9:30'}, {time: '10:00'}, {time: '10:30'}, {time: '11:00'}, {time: '11:30'}, {time: '12:00'}, {time: '12:30'}, {time: '1:00'}, {time: '1:30'}, {time: '2:00'}, {time: '2:30'}, {time: '3:00'}, {time: '3:30'}, {time: '4:00'}, {time: '4:30'}] });
    		this.updateScheduleInfo();
    		this.setState({cardDisplay: 'block'});
    		this.setState({scheduleStatus: ''});
    		console.log('today s schedule from scheduleForToday');
    		// this.updateScheduleInfo(response.data);
    	}
    });
}

getSchedule = (date, location) => {

	axios({
      type: 'GET',
      url: '/getSchedule/' + date + '/' + location
    }).then((response)=> {
    	// console.log(response.data);
    	if(response.data == '') {
    		this.setState({scheduleInfo: []});
    		this.setState({times: [{time: '9:00'}, {time: '9:30'}, {time: '10:00'}, {time: '10:30'}, {time: '11:00'}, {time: '11:30'}, {time: '12:00'}, {time: '12:30'}, {time: '1:00'}, {time: '1:30'}, {time: '2:00'}, {time: '2:30'}, {time: '3:00'}, {time: '3:30'}, {time: '4:00'}, {time: '4:30'}] });
    		console.log('nothing scheduled for today');
    		this.setState({scheduleStatus: 'There are no reservations for today at this location'});	
    	}
    	else {
    		this.setState({scheduleInfo: response.data});
    		this.setState({times: [{time: '9:00'}, {time: '9:30'}, {time: '10:00'}, {time: '10:30'}, {time: '11:00'}, {time: '11:30'}, {time: '12:00'}, {time: '12:30'}, {time: '1:00'}, {time: '1:30'}, {time: '2:00'}, {time: '2:30'}, {time: '3:00'}, {time: '3:30'}, {time: '4:00'}, {time: '4:30'}] });
    		this.updateScheduleInfo();
    		this.setState({cardDisplay: 'block'});
    		this.setState({scheduleStatus: ''});
    		console.log('today s schedule getSchedule');
    		// this.updateScheduleInfo(response.data);	
    	}
    });
}

  render() {
    return (
    	<Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                 <TableRow>
                   <TableHeaderColumn>Time</TableHeaderColumn>
                   <TableHeaderColumn>Name</TableHeaderColumn>
                   {/*<TableHeaderColumn>Last Name</TableHeaderColumn>
                   <TableHeaderColumn>Email</TableHeaderColumn>
                   <TableHeaderColumn>Phone</TableHeaderColumn>
                   <TableHeaderColumn>Year</TableHeaderColumn>
                   <TableHeaderColumn>Make</TableHeaderColumn>*/}
                   <TableHeaderColumn>Model</TableHeaderColumn>
                   <TableHeaderColumn>Service</TableHeaderColumn>
                 </TableRow>
               </TableHeader>
               <TableBody displayRowCheckbox={false} stripedRows={true}>
               {this.state.times.map((times, i) => this.tableRow(times, i))}
               </TableBody>
        </Table>	
    );
  }
}

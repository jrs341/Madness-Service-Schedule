import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import { Card, CardTitle, CardHeader, CardText, CardActions } from 'material-ui/Card'
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

var date = new Date();
var dateString = date.toString().split(' ', 4).join(' ');

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
		scheduleInfo: []
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
	this.card = this.card.bind(this);
	this.updateScheduleInfo = this.updateScheduleInfo.bind(this);
}

componentWillMount() {
	console.log('will mount' + this.props.serviceDate);
	this.scheduleForToday();
}
// without the if else statement an infinate loop is created
componentWillUpdate(nextProps, nextState){
	console.log('will update');
	if (this.props.serviceDate != nextProps.serviceDate){
		this.getSchedule(nextProps.serviceDate, nextProps.location);
	}
	else {
		console.log(this.props.serviceDate);
	}
}

card(fieldInfo, index) {
	return (
		 <Card>
		    <CardHeader
		      title= {fieldInfo.time} 
		      avatar={<ActionBuild />}
		      subtitle={fieldInfo.given_name + ' ' + fieldInfo.family_name + ' ' + fieldInfo.requested_service}
		      actAsExpander={true}
		      showExpandableButton={true}
		    />
		    <CardActions>
		      <RaisedButton label="Service Complete" />
		      <RaisedButton label="Reschedule" />
		      <RaisedButton label="Cancel" />
		    </CardActions>
		    <CardText expandable={true}>
		    	<List>
			      <ListItem primaryText={fieldInfo.email} leftIcon={<ContactEmail />} />
			      <ListItem primaryText={fieldInfo.phone_number} leftIcon={<ContactPhone />} />
			      <ListItem primaryText={fieldInfo.vehicle_year + ' ' + fieldInfo.vehicle_make + ' ' + fieldInfo.vehicle_model} leftIcon={<Vehicle />} />
			      <ListItem primaryText={fieldInfo.scheduled_by} leftIcon={<Employee />} />
			    </List>
			    <Divider />
		      {/*<Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Email</TableHeaderColumn>
                  <TableHeaderColumn>Phone</TableHeaderColumn>
                  <TableHeaderColumn>Year</TableHeaderColumn>
                  <TableHeaderColumn>Make</TableHeaderColumn>
                  <TableHeaderColumn>Model</TableHeaderColumn>
                  <TableHeaderColumn>Scheduled By</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} stripedRows={true}>
              {/*{{this.state.scheduleInfo[index].map((fieldInfo, index) => this.tableRow(fieldInfo, index))}
              	<TableRow>
			        <TableRowColumn>{fieldInfo.email}</TableRowColumn>
			        <TableRowColumn>{fieldInfo.phone_number}</TableRowColumn>
			        <TableRowColumn>{fieldInfo.vehicle_year}</TableRowColumn>
			        <TableRowColumn>{fieldInfo.vehicle_make}</TableRowColumn>
			        <TableRowColumn>{fieldInfo.vehicle_model}</TableRowColumn>
			        <TableRowColumn>{fieldInfo.scheduled_by}</TableRowColumn>
			    </TableRow>
              </TableBody>
            </Table>*/}
		    </CardText>
		  </Card>
	);
}

updateScheduleInfo(getRequestResponse) {
    this.setState({scheduleInfo: getRequestResponse});
}

// default schedule when component mounts default to today and austin
scheduleForToday = () => {
	axios({
      type: 'GET',
      url: '/scheduleForToday/' + dateString
    }).then((response)=> {
    	// console.log(response.data);
    	if(response.data == '') {
    		console.log('nothing scheduled for today');	
    	}
    	else {
    		console.log('today s schedule');
    		this.updateScheduleInfo(response.data);
    	}
    });
}

getSchedule = (date, location) => {

	axios({
      type: 'GET',
      url: '/getSchedule/' + date + '/' + location
    })
	// axios.get('/getSchedule/',{
	// 	params: {
	// 		date: date,
	// 		location: this.props.location
	// 	}
	// })
	.then((response)=> {
    	// console.log(response.data);
    	if(response.data == '') {
    		console.log('nothing scheduled for today');	
    	}
    	else {
    		console.log('today s schedule');
    		this.updateScheduleInfo(response.data);
    	}
    });
}

  render() {
    return (
    	<div>
    		<h1> Madness AutoWorks Service Schedule for 
    			<DatePicker />  
    			<LocationDropDown /> 
    		</h1>
    		{this.state.scheduleInfo.map((fieldInfo, index) => this.card(fieldInfo, index))}
    	</div>
    );
  }
}
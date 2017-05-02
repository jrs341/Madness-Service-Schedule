import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import { Card, CardTitle, CardHeader, CardText, CardActions } from 'material-ui/Card'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {List, ListItem} from 'material-ui/List'
import { changeServiceTimeState } from '../actions/serviceTimeActions'
import { changeFormDialogState } from '../actions/formDialogActions'
import axios from 'axios'
import LocationDropDown from '../Components/LocationDropDown'
import DatePicker from '../Components/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ActionBuild from 'material-ui/svg-icons/action/build'
import ContactEmail from 'material-ui/svg-icons/communication/email'
import ContactPhone from 'material-ui/svg-icons/communication/phone'
import Vehicle from 'material-ui/svg-icons/maps/directions-car'
import Employee from 'material-ui/svg-icons/action/account-box'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import ServiceStatusDialog from '../Components/ServiceStatusDialog'
import CustomerInfoDialog from '../Components/CustomerInfoDialog'
import Dialog from 'material-ui/Dialog'

var date = new Date();
var dateString = date.toString().split(' ', 4).join(' ');
var serviceStatus = 'red';

const tableRow = {
	height: 40,
	color: 'green',
	paddingTop: 0,
	paddingBottom: 0
};

@connect((store) => {
	return {
		location: store.locationState.location,
		serviceDate: store.serviceDateState.serviceDate,
		serviceTime: store.serviceTimeState.serviceTime,
		scheduledBy: store.scheduledByState.scheduledBy,
		form_dialog_state: store.formDialogState.form_dialog_state

	};
})


export default class ServiceTable extends React.Component {

constructor(props) {
	super(props);

	this.state = {
		scheduleInfo: [],
		times: [{time: '9:00'}, {time: '9:30'}, {time: '10:00'}, {time: '10:30'}, {time: '11:00'}, {time: '11:30'}, {time: '12:00'}, {time: '12:30'}, {time: '1:00'}, {time: '1:30'}, {time: '2:00'}, {time: '2:30'}, {time: '3:00'}, {time: '3:30'}, {time: '4:00'}, {time: '4:30'}],
		cardDisplay: 'none',
		scheduleStatus: '',
		serviceStatus: 'red',
		customerInfoDialog: false
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
	this.selectTime = this.selectTime.bind(this);
	this.handleClose = this.handleClose.bind(this);
}

componentWillMount() {

}

componentDidMount() {
	this.scheduleForToday();
}

// without the if else statement an infinate loop is created
componentWillUpdate(nextProps, nextState){
	if (this.props.serviceDate != nextProps.serviceDate || this.props.location != nextProps.location){
		this.setState({cardDisplay: 'none'});
		this.getSchedule(nextProps.serviceDate, nextProps.location);
	}
	else {
		
	}
}

componentDidUpdate(prevProps, prevState) {
	
}

selectTime(row, column, event){
	// console.log('1 column '+column);
	// console.log('2 ' + this.state.times[row].booked);
	if(!this.state.times[row].booked){
	// console.log('2 ' + this.state.times[row].booked);
	this.props.dispatch(changeServiceTimeState(this.state.times[row].time));
	this.props.dispatch(changeFormDialogState(row));
	} else if (column == 2 || column == 3 || column == 4 && this.state.time[row].booked != 'undefined'){
		this.setState({
			customerInfoDialog: true,
			given_name: this.state.times[row].given_name,
			family_name: this.state.times[row].family_name,
			phone_number: this.state.times[row].phone_number,
			email: this.state.times[row].email,
			vehicle_make: this.state.times[row].vehicle_make,
			vehicle_model: this.state.times[row].vehicle_model,
			vehicle_year: this.state.times[row].vehicle_year,
			service_request: this.state.times[row].service_request,
			scheduled_by: this.state.times[row].scheduled_by
		});
		// console.log('customer info state ' + this.state.times[row].booked);
	}
	else {
		return
	}
}

handleClose() {
	this.setState({customerInfoDialog: false});
}

tableRow(times, i) {

	if (this.state.times[i].booked){
		return (
			<TableRow 
			style={{height: 33}} 
			selectable={true} 
			striped={this.state.times[i].booked}>
		 {/*<TableRowColumn>{<FlatButton onTouchTap={this.selectTime} name={this.state.times[i].time}/>}</TableRowColumn>*/}
		       	 <TableRowColumn 
		       	 style={{height: 33, 
		       	 		paddingTop: 0, 
		       	 		paddingRight:'auto',
		       	 		paddingBottom: 0,
		       	 		paddingLeft: 'auto'
		       	 		
		       	 	}}
		       	 name={this.state.times[i].time}>
		       	 {this.state.times[i].time}
		       	 </TableRowColumn>
		         <TableRowColumn style={{height: 33, 
		       	 		paddingTop: 0, 
		       	 		paddingRight:'auto',
		       	 		paddingBottom: 0,
		       	 		paddingLeft: 'auto'
		       	 		
		       	 	}}>{this.state.times[i].given_name + ' ' + this.state.times[i].family_name} 
		         	{<Dialog 
		         	id={this.props.rowNumber}
		         	open={this.state.customerInfoDialog} 
		         	onRequestClose={this.handleClose}
		         	modal={false}>
		         	<List>
		         		<ListItem primaryText={this.state.given_name + ' ' + this.state.family_name}/>
			            <ListItem primaryText={this.state.email} 
			            		  leftIcon={<ContactEmail color={'blue'} />} />
			            <ListItem primaryText={this.state.phone_number} 
			            		  leftIcon={<ContactPhone color={'green'} />} />
			            <ListItem primaryText={this.state.vehicle_year + ' ' + this.state.vehicle_make + ' ' + this.state.vehicle_model} 
			            		  leftIcon={<Vehicle color={'red'}/>}/>
			            <ListItem primaryText={'Scheduled by ' + this.state.scheduled_by} 
			            		  leftIcon={<Employee color={'yellow'}/>} />
			            <ListItem primaryText={'Service Request: ' + this.state.service_request} 
			            		  leftIcon={<ActionBuild color={'red'}/>}/>
        			</List>
		         	</Dialog>}
		         </TableRowColumn>
		         <TableRowColumn style={{height: 33, 
		       	 		paddingTop: 0, 
		       	 		paddingRight:'auto',
		       	 		paddingBottom: 0,
		       	 		paddingLeft: 'auto'
		       	 		
		       	 	}}>{this.state.times[i].vehicle_model}{
		         	<CustomerInfoDialog 
		         	name={this.state.times[i].vehicle_model}
		         	/>}
		         </TableRowColumn>
		         <TableRowColumn style={{height: 33, 
		       	 		paddingTop: 0, 
		       	 		paddingRight:'auto',
		       	 		paddingBottom: 0,
		       	 		paddingLeft: 'auto'
		       	 		
		       	 	}}>{this.state.times[i].service_request}</TableRowColumn>
	    	</TableRow>
		);
		} else {
		return (
			<TableRow style={{height: 33}}>
				<TableRowColumn style={{height: 33, 
		       	 		paddingTop: 0, 
		       	 		paddingRight:'auto',
		       	 		paddingBottom: 0,
		       	 		paddingLeft: 'auto'
		       	 		
		       	 	}} name={this.state.times[i].time}>{this.state.times[i].time}</TableRowColumn>
				<TableRowColumn style={{height: 33, 
		       	 		paddingTop: 0, 
		       	 		paddingRight:'auto',
		       	 		paddingBottom: 0,
		       	 		paddingLeft: 'auto'
		       	 		
		       	 	}} >{' '}</TableRowColumn>
		        <TableRowColumn style={{height: 33, 
		       	 		paddingTop: 0, 
		       	 		paddingRight:'auto',
		       	 		paddingBottom: 0,
		       	 		paddingLeft: 'auto'
		       	 		
		       	 	}} >{' '}</TableRowColumn>
		        <TableRowColumn style={{height: 33, 
		       	 		paddingTop: 0, 
		       	 		paddingRight:'auto',
		       	 		paddingBottom: 0,
		       	 		paddingLeft: 'auto'
		       	 		
		       	 	}} >{' '}</TableRowColumn>
			</TableRow>
		);
	}  
}
 	

serviceStatus(event, isInputChecked) {
	// console.log('serviceStatus');
	alert('are you sure');
	axios.post('/serviceStatus',
		{ 
			email: event.target.name,
			completed: 1
		}).then(function(response){
			console.log('updated service status');
		});
}



updateScheduleInfo() {
    for (var i=0; i<this.state.times.length; i++){
    	for(var j=0; j<this.state.scheduleInfo.length; j++){
    		if (this.state.times[i].time == this.state.scheduleInfo[j].time){
    			this.state.times.splice(i, 1, this.state.scheduleInfo[j]);
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
    		// console.log('nothing scheduled for today');
    		this.setState({scheduleStatus: 'There are no reservations for today at this location'});	
    	}
    	else {
    		this.setState({scheduleInfo: response.data});
    		this.setState({times: [{time: '9:00'}, {time: '9:30'}, {time: '10:00'}, {time: '10:30'}, {time: '11:00'}, {time: '11:30'}, {time: '12:00'}, {time: '12:30'}, {time: '1:00'}, {time: '1:30'}, {time: '2:00'}, {time: '2:30'}, {time: '3:00'}, {time: '3:30'}, {time: '4:00'}, {time: '4:30'}] });
    		this.updateScheduleInfo();
    		this.setState({cardDisplay: 'block'});
    		this.setState({scheduleStatus: ''});
    		// console.log('today s schedule from scheduleForToday');
    		
    	}
    });
}

getSchedule = (date, location) => {

	axios({
      type: 'GET',
      url: '/getSchedule/' + date + '/' + location
    }).then((response)=> {
    	if(response.data == '') {
    		this.setState({scheduleInfo: []});
    		this.setState({times: [{time: '9:00'}, {time: '9:30'}, {time: '10:00'}, {time: '10:30'}, {time: '11:00'}, {time: '11:30'}, {time: '12:00'}, {time: '12:30'}, {time: '1:00'}, {time: '1:30'}, {time: '2:00'}, {time: '2:30'}, {time: '3:00'}, {time: '3:30'}, {time: '4:00'}, {time: '4:30'}] });
    		// console.log('nothing scheduled for today');
    		this.setState({scheduleStatus: 'There are no reservations for today at this location'});	
    	}
    	else {
    		this.setState({scheduleInfo: response.data});
    		this.setState({times: [{time: '9:00'}, {time: '9:30'}, {time: '10:00'}, {time: '10:30'}, {time: '11:00'}, {time: '11:30'}, {time: '12:00'}, {time: '12:30'}, {time: '1:00'}, {time: '1:30'}, {time: '2:00'}, {time: '2:30'}, {time: '3:00'}, {time: '3:30'}, {time: '4:00'}, {time: '4:30'}] });
    		this.updateScheduleInfo();
    		this.setState({cardDisplay: 'block'});
    		this.setState({scheduleStatus: ''});
    		// console.log('today s schedule getSchedule');
    	}
    });
}

  render() {
    return (
    	<Table onCellClick={this.selectTime}>
              <TableHeader style={{height: 30}} 
              	displaySelectAll={false} 
              	adjustForCheckbox={false}>
                 <TableRow style={{height: 30}} >
                   <TableHeaderColumn style={{height: 30, 
		       	 		paddingTop: 0, 
		       	 		paddingRight:'auto',
		       	 		paddingBottom: 0,
		       	 		paddingLeft: 'auto'}}>Time</TableHeaderColumn>
                   <TableHeaderColumn style={{height: 30, 
		       	 		paddingTop: 0, 
		       	 		paddingRight:'auto',
		       	 		paddingBottom: 0,
		       	 		paddingLeft: 'auto'}}>Name</TableHeaderColumn>
                   <TableHeaderColumn style={{height: 30, 
		       	 		paddingTop: 0, 
		       	 		paddingRight:'auto',
		       	 		paddingBottom: 0,
		       	 		paddingLeft: 'auto'}}>Vehicle</TableHeaderColumn>
                   <TableHeaderColumn style={{height: 30, 
		       	 		paddingTop: 0, 
		       	 		paddingRight:'auto',
		       	 		paddingBottom: 0,
		       	 		paddingLeft: 'auto'}}>Service Request</TableHeaderColumn>
                 </TableRow>
               </TableHeader>
               <TableBody displayRowCheckbox={false} stripedRows={true}>
               {this.state.times.map((times, i) => this.tableRow(times, i))}
               </TableBody>
        </Table>	
    );
  }
}

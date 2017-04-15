import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import { Row, Col } from 'react-grid-system'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import axios from 'axios'
import LocationDropDown from '../Components/LocationDropDown'
import DatePicker from '../Components/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'

var date = new Date();
var dateString = date.toString().split(' ', 4).join(' ');
// var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
// var today = days[date.getDay()];
// var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// var month = months[date.getMonth()];
// var day = date.getDate();
// var year = date.getYear();

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
		scheduleInfo: [],
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
	this.tableRow = this.tableRow.bind(this);
	this.updateScheduleInfo = this.updateScheduleInfo.bind(this);
}

componentWillMount() {
	// get request here for current date
	console.log(dateString);
	this.scheduleForToday();
}

tableRow(fieldInfo) {
    return (
      <TableRow>
      	<TableRowColumn>{fieldInfo.time}</TableRowColumn>
        <TableRowColumn>{fieldInfo.given_name}</TableRowColumn>
        <TableRowColumn>{fieldInfo.family_name}</TableRowColumn>
        <TableRowColumn>{fieldInfo.email}</TableRowColumn>
        <TableRowColumn>{fieldInfo.phone_number}</TableRowColumn>
        <TableRowColumn>{fieldInfo.vehicle_year}</TableRowColumn>
        <TableRowColumn>{fieldInfo.vehicle_make}</TableRowColumn>
        <TableRowColumn>{fieldInfo.vehicle_model}</TableRowColumn>
        <TableRowColumn>{fieldInfo.requested_service}</TableRowColumn>
      </TableRow>
    );
}

updateScheduleInfo(getRequestResponse) {
    this.setState({scheduleInfo: getRequestResponse});
}

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
    		console.log(response.data.length);
    		this.updateScheduleInfo(response.data);
    		console.log(this.state.scheduleInfo);
    		// this.updateScheduleInfo(response.data);
    		// for (var i=0; i<response.data.length; i++) {
    		// 	console.log(i);
    		// 	this.updateScheduleInfo(response.data[i]);
    		// 	// this.state = response.data[i];
    		// 	console.log(response.data[i]);
    		// }
    		// this.state = response.data;
    		// for (var prop in response.data) {
    		// 	// console.log(prop + ' = ' + response.data[prop]);
    		// 	for (var stateProp in this.state) {
    		// 		if (prop == stateProp) {
    		// 			console.log(prop + ' ' + stateProp);
    		// 			this.setState({stateProp: response.data[prop]});
    		// 		}
    		// 	}
    		// };
    		// this.setState({
    		// 	given_name: response.data.given_name,
    		// 	family_name: response.data.family_name,
    		// 	email: response.data.email,
    		// 	phone_number: response.data.phone_number,
    		// 	vehicle_year: response.data.vehicle_year,
    		// 	vehicle_make: response.data.vehicle_make,
    		// 	vehicle_model: response.data.vehicle_model,
    		// 	scheduled_by: response.data.scheduled_by
    		// })
    	}
      
    });
}

  render() {
    return (
    	<div>
    		<h1> Madness AutoWorks Service Schedule for <LocationDropDown /> <DatePicker />  </h1>
    		 {/*<h1> {this.state.given_name} </h1>
    		 <h1> {this.state.family_name} </h1>*/}
    	<Row>
        <Col md={12}>
          <Card>
            <CardTitle
              title="Madness AutoWorks Service Schedule"
              subtitle={this.state.instructions}
            />
            <CardText>
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Time</TableHeaderColumn>
                  <TableHeaderColumn>First Name</TableHeaderColumn>
                  <TableHeaderColumn>Last Name</TableHeaderColumn>
                  <TableHeaderColumn>Email</TableHeaderColumn>
                  <TableHeaderColumn>Phone</TableHeaderColumn>
                  <TableHeaderColumn>Year</TableHeaderColumn>
                  <TableHeaderColumn>Make</TableHeaderColumn>
                  <TableHeaderColumn>Model</TableHeaderColumn>
                  <TableHeaderColumn>Service</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} stripedRows={true}>
              {this.state.scheduleInfo.map((fieldInfo, index) => this.tableRow(fieldInfo, index))}
              </TableBody>
            </Table>
            </CardText>
            <CardActions>
            {/*<Link to='admin'>
             <RaisedButton
              style={submitButton}
              label="Return to Admin"
              primary={true}
              />
            </Link>*/}
            </CardActions>
          </Card>
        </Col>
      </Row>
    </div>
    );
  }
}
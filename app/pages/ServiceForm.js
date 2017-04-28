import React from 'react'
import { connect } from "react-redux"
import { changeLocationState } from '../actions/locationDropDownActions'
import { Link } from 'react-router'
import { Container, Row, Col } from 'react-grid-system'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import axios from 'axios'
import { changeServiceDateState } from '../actions/datePickerActions'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from '../Components/DatePicker'
import TimeDropDown from '../Components/TimeDropDown'
import LocationDropDown from '../Components/LocationDropDown'
import EmployeeDropDown from '../Components/EmployeeDropDown'
import Calendar from 'material-ui/DatePicker/Calendar'
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
// import ServiceCard from '../Components/ServiceCard'
import ServiceTable from '../Components/ServiceTable'

var date = new Date();

@connect((store) => {
	return {
		location: store.locationState.location,
		serviceDate: store.serviceDateState.serviceDate,
		serviceTime: store.serviceTimeState.serviceTime,
		scheduledBy: store.scheduledByState.scheduledBy
	};
})

export default class ServiceForm extends React.Component {

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
			service_request: '',
			controlledDate: date 
		};

		this.updateFormInfo = this.updateFormInfo.bind(this);
		this.addCustomerToDB = this.addCustomerToDB.bind(this);
		this.checkCustomerDB = this.checkCustomerDB.bind(this);
		this.addToServiceSchedule = this.addToServiceSchedule.bind(this);
		this.submitFormInfo = this.submitFormInfo.bind(this);
		this.disableWeekends = this.disableWeekends.bind(this);
		this.serviceDateState = this.serviceDateState.bind(this);
	}

	updateFormInfo = (event, newInput) => {
		this.setState({[event.target.id]: newInput});
	}

	addCustomerToDB = () => {
		axios.post('/addCustomerToDB',
		{
		  given_name: this.state.given_name,
          family_name: this.state.family_name,
          phone_number: this.state.phone_number,
          email: this.state.email,
          vehicle_make: this.state.vehicle_make,
          vehicle_model: this.state.vehicle_model,
          vehicle_year: this.state.vehicle_year,
          service_request: this.state.service_request
		}).then(function(response){
          console.log('added customer to DB');
        });
	}

	checkCustomerDB = () => {
		axios({
          type: 'GET',
          url: '/checkCustomerDB/' + this.state.email
        }).then((response)=> {
        	console.log(response.data);
        	if(response.data == '') {
        		console.log('email not found adding to customer DB');
        		this.addCustomerToDB();
        		this.addToServiceSchedule();
        		location.reload();
        	}
        	else {
        		console.log('found customer in DB');
        		this.addToServiceSchedule();
        		location.reload();
        	}
          
        });
    }

    addToServiceSchedule = () => {
		axios.post('/submitInfoToServiceSchedule',
        {
          location: this.props.location,
          date: this.props.serviceDate,
          time: this.props.serviceTime,
          scheduled_by: this.props.scheduledBy,
          given_name: this.state.given_name,
          family_name: this.state.family_name,
          phone_number: this.state.phone_number,
          email: this.state.email,
          vehicle_make: this.state.vehicle_make,
          vehicle_model: this.state.vehicle_model,
          vehicle_year: this.state.vehicle_year,
          service_request: this.state.service_request
        }).then(function(response){
          console.log('added to service schedule');
        });
    }
	
    submitFormInfo = () => {
    	this.checkCustomerDB();
    	this.addToServiceSchedule();
    }

    disableWeekends = (date) => {
    	return date.getDay() === 0 || date.getDay() === 6;
  	}

  	serviceDateState = (event, date) => {
  		console.log(date);
  		this.setState({controlledDate: date});
    	var date = date.toString().split(' ', 4).join(' ');
    	this.props.dispatch(changeServiceDateState(date));
    	// console.log(date);
  	}

  render() {
    return (
    	<div>
	    	<Row>
	    		
	    	</Row>
	    	<Row>
	    	<Col md={4}>
    			<Calendar
	    			value={this.state.controlledDate}
	    			disableYearSelection={true}
		    		shouldDisableDate={this.disableWeekends}
		    		hideCalendarDate= 'true'
		    		dialogContainerStyle={{width: 350}}
		            firstDayOfWeek={1}	
		            onTouchTapDay={this.serviceDateState}
	        	/>
	    	{/*</Col>
	    	<Col md={4} >*/}
	    		
		    	<TimeDropDown
		    	/>
		    	<LocationDropDown

		    	/>
	    		
	            <TextField
					style={{display: 'inline-block', width: '50%'}}
	                id='given_name'
	                value={this.state.given_name}
	                type='text'
	                hintText='First Name'
	                floatingLabelText='First Name'
	                onChange={this.updateFormInfo}
	            />
	            <TextField
	            	style={{display:'inline-block', width: '50%'}}
	                id='family_name'
	                value={this.state.family_name}
	                type='text'
	                hintText='Last Name'
	                floatingLabelText='Last Name'
	               	onChange={this.updateFormInfo}
	            />
	            <TextField
	            	style={{display: 'inline-block', width: '50%'}}
	                id='email'
	                value={this.state.email}
	                type='text'
	                hintText='Email'
	                floatingLabelText='Email'
	               	onChange={this.updateFormInfo}
	            />
	            <TextField
	            	style={{display: 'inline-block', width: '50%'}}
	                id='phone_number'
	                value={this.state.phone_number}
	                type='text'
	                hintText='Phone Number'
	                floatingLabelText='Phone Number'
	               	onChange={this.updateFormInfo}
	            />
	            <TextField
	            	style={{display: 'inline-block', width: '33%'}}
	                id='vehicle_year'
	                vehicle={this.state.vehicle_year}
	                type='text'
	                hintText='Year'
	                floatingLabelText='Year'
	               	onChange={this.updateFormInfo}
	            />
	            <TextField
	            	style={{display: 'inline-block', width: '33%'}}
	                id='vehicle_make'
	                value={this.state.vehicle_make}
	                type='text'
	                hintText='Make'
	                floatingLabelText='Make'
	               	onChange={this.updateFormInfo}
	            />
	            <TextField
	            	style={{display: 'inline-block', width: '33%'}}
	                id='vehicle_model'
	                value={this.state.vehicle_model}
	                type='text'
	                hintText='Model'
	                floatingLabelText='Model'
	               	onChange={this.updateFormInfo}
	            />
	            
	            <TextField
	            	style={{display: 'block'}}
	                id='service_request'
	                value={this.state.service_request}
	                type='text'
	                hintText='Requested Service'
	                floatingLabelText='Requested Service'
	                multiLine={true}
	                rows={3}
	                rowsMax={5}
	               	onChange={this.updateFormInfo}
	            />
	            <RaisedButton
	                label="Submit"
	                primary={true}
	                onClick={this.checkCustomerDB}
	            /> 
	            {/*<Link to='serviceSchedule'>
	              <RaisedButton
	                label="Service Schedule"
	                primary={true}
	              /> 
	            </Link>*/}
			</Col>
	    	<Col md={8}>
	    		<h2> Madness Autoworks Service Schedule for {this.props.location}</h2>
	            <ServiceTable />
    		</Col>
    		</Row>
    			{/*<ServiceTable />
				<Card>
					<CardTitle
						title='Schedule Service'>
						<LocationDropDown />
					</CardTitle>
					<CardText>*/}
	
						{/*<LocationDropDown />*/}

			            {/*<DatePicker />*/}

			            {/*<TimeDropDown />*/}

			            {/*<EmployeeDropDown />*/}
			            
			            
			            
{/* Leave email as the first question and then map the rest of the fields and change function to onBlur to search and auto fill customer info*/}
			            
						{/*<TextField
			            	style={{display: 'block'}}
			                id='email'
			                value={this.state.email}
			                type='text'
			                hintText='Email'
			                floatingLabelText='Email'
			               	onChange={this.updateFormInfo}
			            />

						<TextField
							style={{display: 'block'}}
			                id='given_name'
			                value={this.state.given_name}
			                type='text'
			                hintText='First Name'
			                floatingLabelText='First Name'
			                onChange={this.updateFormInfo}
			            />
			            <TextField
			            	style={{display: 'block'}}
			                id='family_name'
			                value={this.state.family_name}
			                type='text'
			                hintText='Last Name'
			                floatingLabelText='Last Name'
			               	onChange={this.updateFormInfo}
			            />
			            <TextField
			            	style={{display: 'block'}}
			                id='phone_number'
			                value={this.state.phone_number}
			                type='text'
			                hintText='Phone Number'
			                floatingLabelText='Phone Number'
			               	onChange={this.updateFormInfo}
			            />
			            <TextField
			            	style={{display: 'block'}}
			                id='vehicle_make'
			                value={this.state.vehicle_make}
			                type='text'
			                hintText='Vehicle Make'
			                floatingLabelText='Vehicle Make'
			               	onChange={this.updateFormInfo}
			            />
			            <TextField
			            	style={{display: 'block'}}
			                id='vehicle_model'
			                value={this.state.vehicle_model}
			                type='text'
			                hintText='Vehicle Model'
			                floatingLabelText='Vehicle Model'
			               	onChange={this.updateFormInfo}
			            />
			            <TextField
			            	style={{display: 'block'}}
			                id='vehicle_year'
			                vehicle={this.state.vehicle_year}
			                type='text'
			                hintText='Vehicle Year'
			                floatingLabelText='Vehicle Year'
			               	onChange={this.updateFormInfo}
			            />
			            <TextField
			            	style={{display: 'block'}}
			                id='service_request'
			                value={this.state.service_request}
			                type='text'
			                hintText='Requested Service'
			                floatingLabelText='Requested Service'
			               	onChange={this.updateFormInfo}
			            />
				            
					</CardText>*/}
					{/*<CardActions>
						<RaisedButton
			                label="Submit"
			                primary={true}
			                onClick={this.checkCustomerDB}
			            /> 
						<Link to='serviceSchedule'>
			              <RaisedButton
			                label="Service Schedule"
			                primary={true}
			              /> 
			            </Link> 
					</CardActions>
				</Card>
			</Card>*/}
		
		</div>
    );
  }
}
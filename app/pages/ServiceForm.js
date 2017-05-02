import React from 'react'
import { connect } from "react-redux"
import { changeLocationState } from '../actions/locationDropDownActions'
import { Link } from 'react-router'
import { Container, Row, Col } from 'react-grid-system'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import axios from 'axios'
import { changeServiceDateState } from '../actions/datePickerActions'
import { changeFormDialogState } from '../actions/formDialogActions'
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
import YearDropDown from '../Components/YearDropDown'
import Dialog from 'material-ui/Dialog'
// import logo from '../../public/css/images/madnessLogo.png'

var date = new Date();

@connect((store) => {
	return {
		location: store.locationState.location,
		serviceDate: store.serviceDateState.serviceDate,
		serviceTime: store.serviceTimeState.serviceTime,
		scheduledBy: store.scheduledByState.scheduledBy,
		vehicle_year: store.vehicleYearState.vehicle_year,
		form_dialog_state: store.formDialogState.form_dialog_state
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
			vehicle_year: 'none chosen',
			service_request: '',
			controlledDate: date,
			open: false
		};

		this.updateFormInfo = this.updateFormInfo.bind(this);
		this.addCustomerToDB = this.addCustomerToDB.bind(this);
		this.checkCustomerDB = this.checkCustomerDB.bind(this);
		this.addToServiceSchedule = this.addToServiceSchedule.bind(this);
		this.submitFormInfo = this.submitFormInfo.bind(this);
		this.disableWeekends = this.disableWeekends.bind(this);
		this.serviceDateState = this.serviceDateState.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	componentDidMount() {
		// console.log('1 did mount ' + this.state.vehicle_year);
		// console.log('2 did mount ' + this.props.vehicle_year);
		// console.log('props ' + this.props.serviceTime);
	}
	updateFormInfo = (event, newInput) => {
		this.setState({[event.target.id]: newInput});
	}

	componentDidUpdate(prevProps, prevState) {
		
	}

	addCustomerToDB = () => {
		// console.log(this.props.vehicle_year);
		axios.post('/addCustomerToDB',
		{
		  given_name: this.state.given_name,
          family_name: this.state.family_name,
          phone_number: this.state.phone_number,
          email: this.state.email,
          vehicle_make: this.state.vehicle_make,
          vehicle_model: this.state.vehicle_model,
          vehicle_year: this.props.vehicle_year,
          service_request: this.state.service_request
		}).then(function(response){
          console.log('added customer to DB');
        });
	}

	checkCustomerDB = () => {
		this.setState({open: false});
		axios({
          type: 'GET',
          url: '/checkCustomerDB/' + this.state.email
        }).then((response)=> {
        	// console.log(response.data);
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
          vehicle_year: this.props.vehicle_year,
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
  		// console.log(date);
  		this.setState({controlledDate: date});
    	var date = date.toString().split(' ', 4).join(' ');
    	this.props.dispatch(changeServiceDateState(date));
    	// console.log(date);
  	}

  	// updateVehicleYear = (event, something) => {
  	// 	// this.setState({vehicle_year: })
  	// 	console.log(event);
  	// 	console.log(something);
  	// }

  	handleOpen = () => {
  		// this.setState({open: true});
  		this.props.dispatch(changeFormDialogState(true));
  	}

  	handleClose = () => {
  		// this.setState({open: false});
  		this.props.dispatch(changeFormDialogState(false));
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
		    		hideCalendarDate= {true}
		    		dialogContainerStyle={{width: 350}}
		            firstDayOfWeek={1}	
		            onTouchTapDay={this.serviceDateState}
	        	/>
	    	<Dialog
	    		open={this.props.form_dialog_state}
	    		onRequestClose={this.handleClose}>
		    	<EmployeeDropDown
		    	/>
		    	<TimeDropDown
		    	/>
		    	<LocationDropDown
		    	/>

	    		
	            <TextField
					style={{display: 'inline-block',
							 width: '45%', 
							 float: 'left',
							 height: 60
							}}
					floatingLabelFixed={true}
	                id='given_name'
	                value={this.state.given_name}
	                type='text'
	                // hintText='First Name'
	                // hintStyle={{fontSize: 12}}
	                floatingLabelText='First Name'
	                // floatingLabelStyle={{fontSize: 12}}
	                onChange={this.updateFormInfo}
	            />
	            <TextField
	            	style={{display:'inline-block', 
			            	width: '45%', 
			            	float: 'right',
			            	height: 60
			            	}}
	            	floatingLabelFixed={true}
	                id='family_name'
	                value={this.state.family_name}
	                type='text'
	                // hintText='Last Name'
	                floatingLabelText='Last Name'
	               	onChange={this.updateFormInfo}
	            />
	            <TextField
	            	style={{display: 'inline-block', 
		            	width: '45%', 
		            	float: 'left',
		            	height: 60
		            	}}
	            	floatingLabelFixed={true}
	                id='email'
	                value={this.state.email}
	                type='text'
	                // hintText='Email'
	                floatingLabelText='Email'
	               	onChange={this.updateFormInfo}
	            />
	            <TextField
	            	style={{display: 'inline-block', 
		            	width: '45%', 
		            	float: 'right',
		            	height: 60
		            	}}
	            	floatingLabelFixed={true}
	                id='phone_number'
	                value={this.state.phone_number}
	                type='text'
	                // hintText='Phone Number'
	                floatingLabelText='Phone Number'
	               	onChange={this.updateFormInfo}
	            />
	            {/*<TextField
	            	style={{display: 'inline-block', width: '30%', float: 'left'}}
	                id='vehicle_year'
	                vehicle={this.state.vehicle_year}
	                type='text'
	                hintText='Year'
	                floatingLabelText='Year'
	               	onChange={this.updateFormInfo}
	            />*/}

	            <YearDropDown
	            	
	            />
	            <TextField
	            	style={{display: 'inline-block', 
		            	width: '30%', 
		            	marginLeft: '5%', 
		            	marginRight: '3%',
		            	height: 60
		            	}}
	                id='vehicle_make'
	                value={this.state.vehicle_make}
	                type='text'
	                // hintText='Make'
	                floatingLabelFixed={true}
	                floatingLabelText='Make'
	               	onChange={this.updateFormInfo}
	            />
	            <TextField
	            	style={{display: 'inline-block', 
		            	width: '30%', 
		            	float: 'right',
		            	height: 60
		            	}}
	                id='vehicle_model'
	                value={this.state.vehicle_model}
	                type='text'
	                // hintText='Model'
	                floatingLabelText='Model'
	                floatingLabelFixed={true}
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
	            {/*<RaisedButton
	            	style={{float: 'right'}}
	                label="Cancel"
	                primary={true}
	                onClick={this.props.dispatch(changeFormDialogState(true))}
	            />*/} 
	        </Dialog>

	        <RaisedButton
	        		style={{
	        			width: 310
	        		}}
	        		// backgroundColor={'red'}
	                label="Schedule Service"
	                primary={true}
	                onClick={this.handleOpen}
	            /> 

			</Col>
	    	<Col md={8}>
	    		{/*<img src={logo}/>*/}
	    		<h2> Service Schedule for {<LocationDropDown
		    	/>}</h2>
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
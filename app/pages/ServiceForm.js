import React from 'react'
import { connect } from "react-redux"
import { changeLocationState } from '../actions/locationDropDownActions'
import { Link } from 'react-router'
import { Row, Col } from 'react-grid-system'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import axios from 'axios'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from '../Components/DatePicker'
import TimeDropDown from '../Components/TimeDropDown'
import LocationDropDown from '../Components/LocationDropDown'
import EmployeeDropDown from '../Components/EmployeeDropDown'

@connect((store) => {
	return {
		location: store.locationState.location,
		serviceDate: store.serviceDateState.serviceDate
		// serviceTime: store.serviceTimeState.serviceTime
	};
})

export default class ServiceForm extends React.Component {

  render() {
    return (
    	<Row>
				<Col md={8} offset={{ md: 2 }}>
					<Card style={{transform: 'translateY(26%)'}}>
						<CardTitle
							title='Schedule Service Form'>
						</CardTitle>
						<CardText>

							<LocationDropDown />

				            <DatePicker />

				            <TimeDropDown />

				            <EmployeeDropDown />

							<TextField
								style={{display: 'block'}}
				                id='First Name'
				                type='text'
				                hintText='First Name'
				                floatingLabelText='First Name'
				               
				            />
				            <TextField
				            	style={{display: 'block'}}
				                id='Last Name'
				                type='text'
				                hintText='Last Name'
				                floatingLabelText='Last Name'
				               
				            />
				            <TextField
				            	style={{display: 'block'}}
				                id='phoneNumber'
				                type='text'
				                hintText='Phone Number'
				                floatingLabelText='Phone Number'
				               
				            />
				            <TextField
				            	style={{display: 'block'}}
				                id='email'
				                type='text'
				                hintText='Email'
				                floatingLabelText='Email'
				               
				            />
				            <TextField
				            	style={{display: 'block'}}
				                id='serviceRequest'
				                type='text'
				                hintText='Requested Service'
				                floatingLabelText='Requested Service'
				               
				            />
				            
						</CardText>
						<CardActions>
							<Link to='serviceSchedule'>
				              <RaisedButton
				                label="Service Schedule"
				                primary={true}
				              /> 
				            </Link>
				            <RaisedButton
				                label="Submit"
				                primary={true}
				              /> 
						</CardActions>
					</Card>
				</Col>
			</Row>
    );
  }
}
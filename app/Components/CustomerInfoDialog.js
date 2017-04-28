import React from 'react';
import { connect } from "react-redux"
import axios from 'axios';
import {List, ListItem} from 'material-ui/List'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import ContactEmail from 'material-ui/svg-icons/communication/email'
import ContactPhone from 'material-ui/svg-icons/communication/phone'
// import ServiceCard from '../Components/ServiceCard';

@connect((store) => {
  return {
    location: store.locationState.location,
    serviceDate: store.serviceDateState.serviceDate,
    serviceTime: store.serviceTimeState.serviceTime,
    scheduledBy: store.scheduledByState.scheduledBy
  };
})

export default class CustomerInfoDialog extends React.Component {

constructor(props) {
	super(props);
  this.state = {
    open: false,
    checked: false
  };

  this.serviceStatus = this.serviceStatus.bind(this);
  this.handleClose = this.handleClose.bind(this);

 }

  handleOpen = () => {
    this.setState({open: true});
    // this.setState({checked: true});
  };

  handleClose = () => {
    this.setState({open: false});
    // this.setState({checked: false});
    // this.serviceStatus();
  };

  serviceStatus = () => {
  	this.handleClose();
	// console.log('serviceStatus');
	// console.log(this.props);
	if (this.props.status) {
		axios.post('/serviceStatus',
		{
			email:this.props.name,
			completed: 0
		}).then(function(resopnse){
			// console.log('updated service status to zero')
			// this.handleClose();
			location.reload();
		})
	} else {
		axios.post('/serviceStatus',
		{ 
			email: this.props.name,
			completed: 1
		}).then(function(response){
			// console.log('updated service status to one');
			// this.handleClose();
			location.reload();
		});
	}
 };

  render() {
    const actions = [
      <RaisedButton
        label="OK"
        primary={true}
        style={{color: 'red'}}
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        style={{display: 'none'}}
        label={this.props.status ? 'Not Completed' : 'Completed'}
        primary={true}
        onTouchTap={this.serviceStatus}
      />,
    ];

    return (
      <div>
        {/*<FlatButton
          // label={this.props.status ? 'Mark as not complete' : 'Mark as completed by'} 
          label={this.props.name}
          onTouchTap={this.handleOpen} 
          // checked={this.props.status}
          // iconStyle={this.props.status ? {fill: 'red'} : {fill: 'green'}}
        />*/}
        
        <Dialog
          actions={actions}
          modal={false}
          // open={this.props.open}
          onRequestClose={this.handleClose}
        >
        <List>
            <ListItem primaryText={this.props.email} leftIcon={<ContactEmail color={'blue'} />} />
            <ListItem primaryText={this.props.phone} leftIcon={<ContactPhone color={'green'} />} />
        </List>
        </Dialog>
      </div>
    );
  }
}
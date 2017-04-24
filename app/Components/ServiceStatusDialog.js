import React from 'react';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

export default class ServiceStatusDialog extends React.Component {

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
    this.setState({checked: true});
  };

  handleClose = () => {
    this.setState({open: false});
    this.setState({checked: false});
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
        label="Cancel"
        primary={true}
        style={{color: 'red'}}
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        label={this.props.status ? 'Not Completed' : 'Completed'}
        primary={true}
        onTouchTap={this.serviceStatus}
      />,
    ];

    return (
      <div>
        <Checkbox 
          label={this.props.status ? 'Mark as not complete' : 'Mark as completed by'} 
          onTouchTap={this.handleOpen} 
          checked={this.props.status}
          iconStyle={this.props.status ? {fill: 'red'} : {fill: 'green'}}
        />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
         {this.props.status ? 'Mark as not complete' : 'Mark as completed'}
        </Dialog>
      </div>
    );
  }
}
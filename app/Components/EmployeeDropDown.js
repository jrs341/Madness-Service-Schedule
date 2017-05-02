import React from 'react';
import { connect } from "react-redux";
import { changeScheduledByState } from '../actions/employeeDropDownActions'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

@connect((store) => {
  return {
    scheduledBy: store.scheduledByState.scheduledBy
  }
})

export default class EmployeeDropDown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};

    this.scheduledByState = this.scheduledByState.bind(this);
  }

  scheduledByState = (event, index, value) => {
    this.props.dispatch(changeScheduledByState(value));
    this.setState({value});
    console.log(value);
  }

  // handleChange = (event, index, value) => {
  //   this.setState({value});
  //   console.log(value);
  // }

  render() {
    return (
      <DropDownMenu 
        iconStyle={{backgroundColor: 'red', fill: 'green', height: 10, padding: 'none'}}
        labelStyle={{color: 'black', backgroundColor: 'yellow', height: '100%', lineHeight: 2}}
        underlineStyle={{display: 'none'}} 
        menuItemStyle={{color: 'green'}} 
        style={{display: 'inline-block', width: '30%', height: 30}}
        value={this.state.value} 
        onChange={this.scheduledByState}>
        <MenuItem value={1} label="Employee 1" primaryText="Employee 1" />
        <MenuItem value={2} label="Employee 2" primaryText="Employee 2" />
        <MenuItem value={3} label="Employee 3" primaryText="Employee 3" />
        <MenuItem value={4} label="Employee 4" primaryText="Employee 4" />
        <MenuItem value={5} label="Employee 5" primaryText="Employee 5" />
      </DropDownMenu>
    );
  }
}
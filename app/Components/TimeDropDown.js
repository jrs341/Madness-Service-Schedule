import React from 'react';
import { connect } from 'react-redux'
import { changeServiceTimeState } from '../actions/serviceTimeActions'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

@connect((store) => {
  return {
    serviceTime: store.serviceTimeState.serviceTime
  }
})
export default class TimeDropDown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};

    this.serviceTimeState = this.serviceTimeState.bind(this);
  }

  serviceTimeState = (event, index, value) => {
    this.props.dispatch(changeServiceTimeState(value));
    this.setState({value});
    console.log(value);
  }

  // handleChange = (event, index, value) => {
  //   this.setState({value});
  //   console.log(value);
  // }

  render() {
    return (
      <DropDownMenu value={this.state.value} onChange={this.serviceTimeState}>
        <MenuItem value={1} label="9:00 am - 9:30 am" primaryText="9:00 am - 9:30 am" />
        <MenuItem value={2} label="9:30 am - 10:00 am" primaryText="9:30 am - 10:00 am" />
        <MenuItem value={3} label="10:00 am - 10:30 am" primaryText="10:00 am - 10:30 am" />
        <MenuItem value={4} label="10:30 am - 11:00 am" primaryText="10:30 am - 11:00 am" />
        <MenuItem value={5} label="11:00 am - 11:30 am" primaryText="11:00 am - 11:30 am" />
        <MenuItem value={6} label="11:30 am - 12:00 pm" primaryText="11:30 am - 12:00 pm" />
        <MenuItem value={7} label="12:00 pm - 12:30 pm" primaryText="12:00 pm - 12:30 pm" />
        <MenuItem value={8} label="12:30 pm - 1:00 pm" primaryText="12:30 pm - 1:00 pm" />
        <MenuItem value={9} label="1:00 pm - 1:30 pm" primaryText="1:00 pm - 1:30 pm" />
        <MenuItem value={10} label="1:30 pm - 2:00 pm" primaryText="1:30 pm - 2:00 pm" />
        <MenuItem value={11} label="2:00 pm - 2:30 pm" primaryText="2:00 pm - 2:30 pm" />
        <MenuItem value={12} label="2:30 pm - 3:00 pm" primaryText="2:30 pm - 3:00 pm" />
        <MenuItem value={13} label="3:00 pm - 3:30 pm" primaryText="3:00 pm - 3:30 pm" />
        <MenuItem value={14} label="3:30 pm - 4:00 pm" primaryText="3:30 pm - 4:00 pm" />
        <MenuItem value={15} label="4:00 pm - 4:30 pm" primaryText="4:00 pm - 4:30 pm" />
        <MenuItem value={16} label="4:30 pm - 5:00 pm" primaryText="4:30 pm - 5:00 pm" />
      </DropDownMenu>
    );
  }
}
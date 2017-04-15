import React from 'react'
import { connect } from "react-redux"
import { changeServiceDateState } from '../actions/datePickerActions'
import DatePicker from 'material-ui/DatePicker'

@connect((store) => {
  return {
    serviceDate: store.serviceDateState.serviceDate
  }
})

/**
 * `DatePicker` can disable specific dates based on the return value of a callback.
 */
export default class ChooseDate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      controlledDate: null,
    };

    this.serviceDateState = this.serviceDateState.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.disableWeekends = this.disableWeekends.bind(this);
  }

  serviceDateState = (event, date) => {
    this.setState({controlledDate: date});
    var date = date.toString().split(' ', 4).join(' ');
    this.props.dispatch(changeServiceDateState(date));
    console.log(date);
  }

  formatDate = (date) => {
    var date = date.toString().split(' ', 4).join(' ');
    return date;
  }

  disableWeekends = (date) => {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  render() {
    return (
      <DatePicker
        hintText="Choose a date to check availability"
        value={this.state.controlledDate}
        onChange={this.serviceDateState}
        formatDate={this.formatDate}
        shouldDisableDate={this.disableWeekends}
      />
    );
  }
}

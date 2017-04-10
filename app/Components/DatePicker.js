import React from 'react';
import DatePicker from 'material-ui/DatePicker';

function disableWeekends(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

// function handleChange(event, date) {
// 	console.log(date);
// }

/**
 * `DatePicker` can disable specific dates based on the return value of a callback.
 */
export default class ChooseDate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      controlledDate: null,
    };
  }

  handleChange = (event, date) => {
    this.setState({
      controlledDate: date,
    });
    console.log(date);
  };

  render() {
    return (
      <DatePicker
        hintText="Choose a date to check availability"
        value={this.state.controlledDate}
        onChange={this.handleChange}
        shouldDisableDate={disableWeekends}
      />
    );
  }
}

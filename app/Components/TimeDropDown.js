import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class TimeDropDown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => {
    this.setState({value});
    console.log(value);
  }

  render() {
    return (
      <DropDownMenu value={this.state.value} onChange={this.handleChange}>
        <MenuItem value={1} label="9:00 am - 9:30 am" primaryText="9:00 am - 9:30 am" />
        <MenuItem value={2} label="9:30 am - 10:00 am" primaryText="9:30 am - 10:00 am" />
        <MenuItem value={3} label="10:00 am - 10:30 am" primaryText="10:00 am - 10:30 am" />
        <MenuItem value={4} label="10:30 am - 11:00 am" primaryText="10:30 am - 11:00 am" />
        <MenuItem value={5} label="11:30 am - 12:00 pm" primaryText="11:30 am - 12:00 pm" />
        <MenuItem value={6} label="12:00 pm - 12:30 pm" primaryText="12:00 pm - 12:30 pm" />
        <MenuItem value={7} label="1:00 pm - 1:30 pm" primaryText="1:00 pm - 1:30 pm" />
        <MenuItem value={8} label="1:30 pm - 2:00 pm" primaryText="1:30 pm - 2:00 pm" />
        <MenuItem value={9} label="2:00 pm - 2:30 pm" primaryText="2:00 pm - 2:30 pm" />
        <MenuItem value={10} label="3:00 pm - 3:30 pm" primaryText="3:00 pm - 3:30 pm" />
      </DropDownMenu>
    );
  }
}
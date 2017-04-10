import React from 'react';
import { connect } from "react-redux";
import { changeLocationState } from '../actions/locationDropDownActions'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

@connect((store) => {
  return {
    location: store.locationState.location
  }
})

export default class LocationDropDown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};

    this.locationState = this.locationState.bind(this);
  }

  locationState = (event, index, value) => {
  // locationState(event, index, value) {
    this.props.dispatch(changeLocationState(value));
    this.setState({value});
    // console.log(value + 'locationState');
  }

  render() {
    return (
      <DropDownMenu value={this.state.value} openImmediately = {1} onChange={this.locationState}>
        <MenuItem value={1} label="Austin, TX" primaryText="Austin, TX" />
        <MenuItem value={2} label="Signal Hill ,CA" primaryText="Signal Hill, CA" />
      </DropDownMenu>
    );
  }
}
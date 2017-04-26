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
    this.state = {value: 'Austin'};

    this.locationState = this.locationState.bind(this);
  }

  locationState = (event, index, value) => {
    this.props.dispatch(changeLocationState(value));
    this.setState({value});
  }

  render() {
    return (
      <DropDownMenu style={{display: 'inline-block', width: '50%'}} value={this.state.value} openImmediately = {false} onChange={this.locationState}>
        <MenuItem value='Austin' label="Austin, TX" primaryText="Austin, TX" />
        <MenuItem value='Signal Hill' label="Signal Hill ,CA" primaryText="Signal Hill, CA" />
      </DropDownMenu>
    );
  }
}

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
    // this.setState({value});
  }

  render() {
    return (
      <DropDownMenu
      iconStyle={{backgroundColor: 'red', fill: 'green', height: 10, padding: 'none'}}
      labelStyle={{color: 'black', backgroundColor: 'yellow', height: '100%', lineHeight: 2}}
      underlineStyle={{display: 'none'}} 
      menuItemStyle={{color: 'green'}} 
      style={{display: 'inline-block', width: '30%', height: 30}}  
      // style={{display: 'inline-block', width: '50%'}} 
      value={this.props.location} 
      openImmediately = {false} 
      onChange={this.locationState}>
        <MenuItem 
        value='Austin' 
        label="Austin, TX" 
        primaryText="Austin, TX" />
        <MenuItem 
        value='Signal Hill' 
        label="Signal Hill ,CA" 
        primaryText="Signal Hill, CA" />
      </DropDownMenu>
    );
  }
}

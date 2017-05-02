import React from 'react'
import { connect } from "react-redux"
import { changeVehicleYearState } from '../actions/vehicleYearActions'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

const nextYear = new Date().getFullYear()+1

const years = [];
for (let i = 2000; i < nextYear; i++ ) {
  years.push(<MenuItem value={i} key={i} primaryText={`${i}`} />);
}

@connect((store) => {
  return {
    location: store.locationState.location,
    serviceDate: store.serviceDateState.serviceDate,
    serviceTime: store.serviceTimeState.serviceTime,
    scheduledBy: store.scheduledByState.scheduledBy,
    vehicle_year: store.vehicleYearState.vehicleYear
  };
})

export default class YearDropDown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 2000};

    // this.vehicleYearState = this.vehicleYearState.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(changeVehicleYearState(this.state.value));
  }

  handleChange = (event, index, value) => {
    console.log('handle change ' + value);
    this.props.dispatch(changeVehicleYearState(value));
    this.setState({value});
    
  }


  render() {
    return (
      <DropDownMenu 
        iconStyle={{backgroundColor: 'red', fill: 'green', height: 10, padding: 'none'}}
        labelStyle={{color: 'black', backgroundColor: 'yellow', height: '100%', lineHeight: 2}}
        underlineStyle={{display: 'none'}} 
        menuItemStyle={{color: 'green'}}
        style={{display: 'inline-block', width: '30%', height: 30}}  
        maxHeight={300} 
        value={this.state.value} 
        onChange={this.handleChange}>
        {years}
      </DropDownMenu>
    );
  }
}
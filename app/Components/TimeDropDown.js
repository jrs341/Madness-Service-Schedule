import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { changeServiceTimeState } from '../actions/serviceTimeActions'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

@connect((store) => {
  return {
    location: store.locationState.location,
    serviceDate: store.serviceDateState.serviceDate,
    serviceTime: store.serviceTimeState.serviceTime
  }
})

export default class TimeDropDown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '9:00',
      reservedTimes: [],
      timeArray: [{time:'9:00'},{time:'9:30'}, {time:'10:00'}, {time:'10:30'}, {time:'11:00'}, {time:'11:30'}, {time:'12:00'}, {time:'12:30'}, {time:'1:00'}, {time:'1:30'}, {time:'2:00'}, {time:'2:30'}, {time:'3:00'}, {time:'3:30'}, {time:'4:00'}, {time:'4:30'}]
    };

    this.getAvailableTimes = this.getAvailableTimes.bind(this);
    this.serviceTimeState = this.serviceTimeState.bind(this);
  }

  componentWillMount() {
    this.getAvailableTimes(this.props.serviceDate, this.props.location);
  }

  componentWillUpdate(nextProps, nextState){
    console.log('will update');
    if (this.props.serviceDate != nextProps.serviceDate || this.props.location != nextProps.location){
      this.getAvailableTimes(nextProps.serviceDate, nextProps.location);
    }
    else {
      
    }
  }

  serviceTimeState = (event, index, value) => {
    this.props.dispatch(changeServiceTimeState(value));
    this.setState({value: value});
    console.log('serviceTiemState' + value);
  }

  getAvailableTimes = (date, location) => {

    axios({
        type: 'GET',
        url: '/availableTimes/' + date + '/' + location
      }).then((response)=> {
        console.log(response.data);
        if(response.data == '') {
          console.log('nothing scheduled for today');
          this.setState({reservedTimes: []});
        }
        else {
          console.log('today s schedule');
          this.setState({reservedTimes: response.data});
          console.log(this.state.reservedTimes);
        }
    });
  }

  menuItem(fieldInfo, index) {
    if (this.state.reservedTimes.length == 0) {
      return (
        <MenuItem key={index} value={this.state.timeArray[index].time} label={this.state.timeArray[index].time} primaryText={this.state.timeArray[index].time} />
      );
    }
    else {
      for (var j=0; j<this.state.reservedTimes.length; j++) {
        if (this.state.timeArray[index].time == this.state.reservedTimes[j].time){
          return (
            <MenuItem disabled={true} key={index} value={this.state.timeArray[index].time} label={this.state.timeArray[index].time} primaryText={this.state.timeArray[index].time} />
          );
        }
        else {
          return (
            <MenuItem key={index} value={this.state.timeArray[index].time} label={this.state.timeArray[index].time} primaryText={this.state.timeArray[index].time} />
          ); 
        }
      } 
    }
  }

  render() {
    return (
      <DropDownMenu value={this.state.value} onChange={this.serviceTimeState}>
        
        {this.state.timeArray.map((fieldInfo, index) => this.menuItem(fieldInfo, index))}
        
      </DropDownMenu>
    );
  }
}
import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { changeServiceTimeState } from '../actions/serviceTimeActions'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

// var menuItems = [];
// var reservedTimes = [];
// var timeArray = [{time:'9:00', booked: false},{time:'9:30', booked: false}, {time:'10:00'}, {time:'10:30'}, {time:'11:00'}, {time:'11:30'}, {time:'12:00'}, {time:'12:30'}, {time:'1:00'}, {time:'1:30'}, {time:'2:00'}, {time:'2:30'}, {time:'3:00'}, {time:'3:30'}, {time:'4:00'}, {time:'4:30'}]
// const timeArray = ['9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','1:00','1:30','2:00','2:30','3:00','3:30','4:00','4:30']

@connect((store) => {
  return {
    location: store.locationState.location,
    serviceDate: store.serviceDateState.serviceDate,
    serviceTime: store.serviceTimeState.serviceTime,
    form_dialog_state: store.formDialogState.form_dialog_state
  }
})

export default class TimeDropDown extends React.Component {

  constructor(props) {
    super(props);
    this.timeArray = 
    this.state = {
      value: '9:00',
      reservedTimes: [],
      times: [{time:'9:00'},{time:'9:30'}, {time:'10:00'}, {time:'10:30'}, {time:'11:00'}, {time:'11:30'}, {time:'12:00'}, {time:'12:30'}, {time:'1:00'}, {time:'1:30'}, {time:'2:00'}, {time:'2:30'}, {time:'3:00'}, {time:'3:30'}, {time:'4:00'}, {time:'4:30'}]
    };

    this.getAvailableTimes = this.getAvailableTimes.bind(this);
    this.serviceTimeState = this.serviceTimeState.bind(this);
    this.menuItem = this.menuItem.bind(this);
    this.updateBookedStatus = this.updateBookedStatus.bind(this);
  }

  componentWillMount() {
    console.log('TimeDropDown will mount');
    // console.log('will mount');
    // *******need this if both components are on the same page**********
    // this.props.dispatch(changeServiceTimeState(this.state.value));
    this.getAvailableTimes(this.props.serviceDate, this.props.location);
    // this.updateBookedStatus();
  }

  componentDidMount() {
    console.log('TimeDropDown did mount');
    // this.getAvailableTimes(this.props.serviceDate, this.props.location);
    this.updateBookedStatus();
  }

  componentWillUpdate(nextProps, nextState){
    // this.updateBookedStatus();
    console.log('TimeDropDown will update');
    if (this.props.serviceDate != nextProps.serviceDate || this.props.location != nextProps.location){
      this.getAvailableTimes(nextProps.serviceDate, nextProps.location);
      
    }
    else {
      
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   this.setState({value: this.props.serviceTime});
  // }

  // updateBookedStatus() {
  //   console.log('update booked status');
  //   for (var i=0; i<timeArray.length; i++){
  //     console.log(reservedTimes);
  //     for (var j=0; j<reservedTimes.length; j++){
  //       if (timeArray[i].time == reservedTimes[j].time){
  //         console.log('equal');
  //         timeArray[i].booked = true;
  //         console.log(timeArray);
  //       }
  //     }
  //     console.log(i);
  //   }
  //   // this.props.dispatch(changeServiceTimeState(value));
  //   // this.setState({value: value});
  // }

  updateBookedStatus() {
    console.log('TimeDropDwon updateBookedStatus');
    // this.setState({scheduleInfo: getRequestResponse});
    for (var i=0; i<this.state.times.length; i++){
      for(var j=0; j<this.state.reservedTimes.length; j++){
        if (this.state.times[i].time == this.state.reservedTimes[j].time){
          this.state.times.splice(i, 1, this.state.reservedTimes[j]);
          console.log(this.state.times);
        }
      }
    }
  }

  serviceTimeState(event, index, value) {
    // console.log(event);
    // console.log(index);
    // console.log(value);
    this.props.dispatch(changeServiceTimeState(value));
    this.setState({value: value});
    // this.menuItem;
    this.updateBookedStatus();
  }

  getAvailableTimes(date, location) {

    axios({
        type: 'GET',
        url: '/getSchedule/' + date + '/' + location
      }).then((response)=> {
        // console.log(response.data);
        if(response.data == '') {
          // console.log('nothing scheduled for today');
          this.setState({reservedTimes: []});
          this.setState({times: [{time: '9:00'}, {time: '9:30'}, {time: '10:00'}, {time: '10:30'}, {time: '11:00'}, {time: '11:30'}, {time: '12:00'}, {time: '12:30'}, {time: '1:00'}, {time: '1:30'}, {time: '2:00'}, {time: '2:30'}, {time: '3:00'}, {time: '3:30'}, {time: '4:00'}, {time: '4:30'}] });
          // this.menuItem;
          
        }
        else {
          this.setState({reservedTimes: response.data});
          this.setState({times: [{time: '9:00'}, {time: '9:30'}, {time: '10:00'}, {time: '10:30'}, {time: '11:00'}, {time: '11:30'}, {time: '12:00'}, {time: '12:30'}, {time: '1:00'}, {time: '1:30'}, {time: '2:00'}, {time: '2:30'}, {time: '3:00'}, {time: '3:30'}, {time: '4:00'}, {time: '4:30'}] });
          // console.log('today s schedule');
          this.updateBookedStatus();
          // console.log('reserved times' + this.state.reservedTimes);
         
        }
    });
  }
// style={} innerDivStyle={} 
// style={{color: 'yellow'}} innerDivStyle={{color: 'green'}}
  menuItem(times, i) {
    console.log('TimeDropDown menu item' + this.state.times[i].booked);
      return (
        <MenuItem 
        disabled={this.state.times[i].booked} 
        key={i} 
        value={this.state.times[i].time} 
        label={this.state.times[i].time} 
        primaryText={this.state.times[i].time} />
      );
    }

  // menuItem() {
  //   console.log('menuItem');
  //   if (reservedTimes.length == 0) {
  //     console.log('menuItem If');
  //     for (var index=0; timeArray.length; index++){
  //         menuItems.push(<MenuItem key={index} value={timeArray[index]} label={timeArray[index]} primaryText={timeArray[index]} />);
  //     }
  //   }
  //   else {
  //     loop1:
  //     for (var index=0; index<timeArray.length; index++) {
  //       loop2:
  //       for (var j=0; j<reservedTimes.length; j++) {
  //         if (timeArray[index] == reservedTimes[j].time){
  //           menuItems.push(<MenuItem disabled={true} key={index} value={timeArray[index]} label={timeArray[index]} primaryText={timeArray[index]} />);
  //           continue loop1;
  //         }
  //         else { 
  //         }
  //       }
  //       menuItems.push(<MenuItem key={index} value={timeArray[index]} label={timeArray[index]} primaryText={timeArray[index]} />);
  //     }
  //   }
  //   console.log(menuItems);
  //   return (
  //     <div>
  //     {menuItems}
  //     </div>
  //     );
  // }

  // menuItem(fieldInfo, index) {
  //   if (this.state.reservedTimes.length == 0) {
  //     return (
  //       <MenuItem key={index} value={this.state.timeArray[index].time} label={this.state.timeArray[index].time} primaryText={this.state.timeArray[index].time} />
  //     );
  //   }
  //   else {
  //     for (var j=0; j<this.state.reservedTimes.length; j++) {
  //       console.log(this.state.reservedTimes[j].time);
  //       console.log(j);
  //       if (this.state.timeArray[index].time == this.state.reservedTimes[j].time){
  //         return (
  //           <MenuItem disabled={true} key={index} value={this.state.timeArray[index].time} label={this.state.timeArray[index].time} primaryText={this.state.timeArray[index].time} />
  //         );
  //       }
  //       else {
  //         return (
  //           <MenuItem key={index} value={this.state.timeArray[index].time} label={this.state.timeArray[index].time} primaryText={this.state.timeArray[index].time} />
  //         ); 
  //       }
  //     } 
  //   }
  // }

  render() {
    return (
      <DropDownMenu 
      iconStyle={{backgroundColor: 'red', fill: 'green', height: 10, padding: 'none'}}
      labelStyle={{color: 'black', backgroundColor: 'yellow', height: '100%', lineHeight: 2}}
      underlineStyle={{display: 'none'}} 
      menuItemStyle={{color: 'green'}} 
      style={{display: 'inline-block', width: '30%', height: 30, marginLeft: '5%', 
                  marginRight: '5%',}} 
      value={this.props.serviceTime} 
      onChange={this.serviceTimeState}>
        {/*{menuItems}*/}
        {this.state.times.map((times, i) => this.menuItem(times, i))}
      </DropDownMenu>
    );
  }
}
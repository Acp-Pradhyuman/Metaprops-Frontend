
import React, { Component } from "react";

class AuctionTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }
  componentWillMount() {
    this.getTimeUntil(this.props.deadline);
  }
  componentDidMount() {
    setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
  }
  leading0(num) {
    return num < 10 ? "0" + num : num;
  }
  getTimeUntil(deadline) {
    const time = Date.parse(new Date(deadline)) - Date.parse(new Date());
    if (time < 0) {
      this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 /  60 /  60)) % 24);
      const days = Math.floor(time / (1000 / 60 / 60 * 24));
      this.setState({ days, hours, minutes, seconds });
    }
  }
  render() {
    return (
      <div>
        {this.state.days+this.state.hours+this.state.minutes+this.state.seconds===0?<div>Booking Closed</div>:<div className="Clock-days">{this.leading0(this.state.days)+":"+this.leading0(this.state.hours)+":"+ this.leading0(this.state.minutes)+":"+this.leading0(this.state.seconds)}<span style={{marginLeft:"2px"}}>Remaining</span></div>}
       
      </div>
    );
  }
}
export default AuctionTimer;
import React from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      minuteLeft: 25,
      secondLeft: 0,
      start: false,
      timer: "Session",
      handler: "" };

    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.setSecond = this.setSecond.bind(this);
    this.setMinute = this.setMinute.bind(this);
    this.setStart = this.setStart.bind(this);
    this.setHandler = this.setHandler.bind(this);
    this.setTimer = this.setTimer.bind(this);
  }
  componentDidMount() {
    document.querySelector("#start_stop").addEventListener("click", () => {
      this.setStart();
      if (this.state.start && this.state.minuteLeft >= 0) {
        this.setHandler();
      } else clearInterval(this.state.handler);
    });
    document.querySelector("#reset").addEventListener("click", () => {
      clearInterval(this.state.handler);
      this.setState(() => ({
        breakLength: 5,
        sessionLength: 25,
        minuteLeft: 25,
        secondLeft: 0,
        start: false,
        handler: "",
        timer: "Session" }));

      document.querySelector("audio").pause();
      document.querySelector("audio").currentTime = 0;
    });
  }
  setHandler() {
    this.setState(state => ({
      handler: setInterval(() => {
        this.setSecond(-1);
      }, 1000) }));

  }
  incrementBreak() {
    if (!this.state.start && this.state.breakLength < 60) {
      this.setState(state => ({
        breakLength: state.breakLength + 1 }));

    }
  }
  decrementBreak() {
    if (!this.state.start && this.state.breakLength > 1) {
      this.setState(state => ({
        breakLength: state.breakLength - 1 }));

    }
  }
  incrementSession() {
    if (!this.state.start) {
      if (
      this.state.minuteLeft === this.state.sessionLength &&
      this.state.secondLeft === 0 &&
      this.state.sessionLength < 60)
      {
        this.setState(state => ({
          sessionLength: state.sessionLength + 1 }));

        this.setMinute(1);
      } else if (this.state.timer === "Session") {
        this.setMinute(this.state.sessionLength - this.state.minuteLeft);
        if (this.state.secondLeft !== 0) this.setSecond(0);
      }
    }
  }
  decrementSession() {
    if (!this.state.start && this.state.sessionLength > 1) {
      this.setState(
      state => ({
        sessionLength: state.sessionLength - 1 }),

      () => {
        if (this.state.timer === "Session") {
          this.setMinute(this.state.sessionLength - this.state.minuteLeft);
          if (this.state.secondLeft != 0) this.setSecond(0);
        }
      });

    }
  }
  setMinute(num) {
    this.setState(state => ({
      minuteLeft: state.minuteLeft + num }));

  }
  setSecond(num) {
    if (this.state.secondLeft > 0 && num != 0) {
      this.setState(state => ({
        secondLeft: state.secondLeft + num }));

    } else if (this.state.secondLeft === 0) {
      if (this.state.minuteLeft > 0) {
        this.setState(() => ({
          secondLeft: 59 }));

        this.setMinute(-1);
      } else {
        clearInterval(this.state.handler);
        let audio = document.querySelector("audio");
        audio.play();
        setTimeout(() => {
          audio.pause();
        }, 5000);
        this.setState(
        state => ({
          minuteLeft:
          state.timer === "Session" ?
          state.breakLength :
          state.sessionLength }),

        this.setTimer);

        this.setHandler();
      }
    } else {
      this.setState(() => ({
        secondLeft: 0 }));

    }
  }
  setStart() {
    this.setState(state => ({
      start: !state.start }));

  }
  setTimer() {
    this.setState(state => ({
      timer: state.timer === "Session" ? "Break" : "Session" }));

  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "App" }, /*#__PURE__*/
      React.createElement("div", { className: "box" }, /*#__PURE__*/
      React.createElement(SetUp, {
        lengthValue: this.state.breakLength,
        incre: this.incrementBreak,
        decre: this.decrementBreak,
        id: "break",
        label: "break-label",
        name: "Break Length",
        decrement: "break-decrement",
        arrowDown: "bi bi-arrow-down-short",
        arrowUp: "bi bi-arrow-up-short",
        increment: "break-increment",
        length: "break-length" }), /*#__PURE__*/


      React.createElement(SetUp, {
        lengthValue: this.state.sessionLength,
        incre: this.incrementSession,
        decre: this.decrementSession,
        id: "session",
        label: "session-label",
        name: "Session Length",
        decrement: "session-decrement",
        arrowDown: "bi bi-arrow-down-short",
        arrowUp: "bi bi-arrow-up-short",
        increment: "session-increment",
        length: "session-length" }), /*#__PURE__*/

      React.createElement(Time, {
        minuteLeft: this.state.minuteLeft,
        secondLeft: this.state.secondLeft,
        start: this.state.start,
        setStart: this.setStart,
        display: this.state.timer })), /*#__PURE__*/


      React.createElement("audio", {
        src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav",
        id: "beep" })));



  }}

const SetUp = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "setup", id: props.id }, /*#__PURE__*/
    React.createElement("div", { className: "label", id: props.label },
    props.name), /*#__PURE__*/

    React.createElement("div", { className: "box" }, /*#__PURE__*/
    React.createElement("div", {
      className: "arrow arrow-down",
      id: props.decrement,
      onClick: props.decre }, /*#__PURE__*/

    React.createElement("i", { class: props.arrowDown })), /*#__PURE__*/

    React.createElement("div", {
      className: "arrow arrow-up",
      id: props.increment,
      onClick: props.incre }, /*#__PURE__*/

    React.createElement("i", { class: props.arrowUp })), /*#__PURE__*/

    React.createElement("div", { className: "value", id: props.length },
    props.lengthValue))));




};

const Time = props => {
  function padding(t) {
    if (t < 10) return "0" + t;
    return t;
  }
  let minute = padding(props.minuteLeft);
  let second = padding(props.secondLeft);

  return /*#__PURE__*/(
    React.createElement("div", { id: "time" }, /*#__PURE__*/
    React.createElement("div", { id: "timer-label" }, props.display), /*#__PURE__*/
    React.createElement("div", { id: "time-left" },
    minute, ":", second), /*#__PURE__*/

    React.createElement("div", { className: "reset-start-stop-flex" }, /*#__PURE__*/
    React.createElement("div", { id: "start_stop" },
    props.start ? /*#__PURE__*/
    React.createElement("i", { className: "bi bi-pause" }) : /*#__PURE__*/

    React.createElement("i", { className: "bi bi-caret-right-fill" })), /*#__PURE__*/


    React.createElement("div", { id: "reset" }, /*#__PURE__*/
    React.createElement("i", { className: "bi bi-arrow-clockwise" })))));




};
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector("#root"));
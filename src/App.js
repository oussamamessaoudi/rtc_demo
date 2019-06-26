import React, {Component} from 'react';
import {StreamState} from './StreamState'


class App extends Component {

  constructor(props) {
    super(props);
    this.localStream = null;
    this.state = {
      localStreamStatus: StreamState.INITIAL
    }
  }

  static hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
      || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    return navigator.getUserMedia;
  }

  setLocalStream(localStreamStatus, localStream) {
    this.localStream = localStream;
    this.setState({localStreamStatus: StreamState.CONNECTED});
  }

  componentDidMount() {
    if (App.hasUserMedia()) {
      navigator.getUserMedia({video: true, audio: true},
        (stream) => this.setLocalStream(StreamState.CONNECTED, stream),
        (error) => this.setLocalStream(StreamState.PERMISSION_DENIED));
    } else {
      this.setLocalStream(StreamState.NOT_SUPPORTED);
    }
  }


  render() {
    const {localStreamState} = this.state;
    switch (localStreamState) {
      case StreamState.INITIAL :
        return <div>INITIAL</div>;
      case StreamState.FAILED :
        return <div>FAILED</div>;
      case StreamState.CONNECTED :
        return this.getConnectedFrame();
      case StreamState.NOT_SUPPORTED :
        return <div>FAILED</div>;
      case StreamState.PERMISSION_DENIED :
        return <div>PERMISSION_DENIED</div>;
      default :
        return <div>DEFAULT</div>
    }
  }

  getConnectedFrame() {
    return (
      <div className="App">
        <video autoPlay ref={video => video.srcObject = this.localStream}/>
      </div>
    );
  }
}

export default App;

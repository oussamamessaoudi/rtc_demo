import React, {Component} from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    App.hasUserMedia.bind(this);

    this.state={
      localStream : null
    }
  }


  static hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
      || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    return navigator.getUserMedia;
  }

  componentDidMount() {
    if (App.hasUserMedia()) {
      navigator.getUserMedia({ video: true, audio: true },
         (stream) => this.setState({localStream : stream}),
          error => console.log(error) );
    }
    else {
      alert("Error. WebRTC is not supported!");
    }
  }


  render() {
    return (
      <div className="App">
        <video autoPlay ref={
          video => {
            if(video){
              video.srcObject = this.state.localStream
            }
          }
        }/>
      </div>
    );
  }
}

export default App;

import React from 'react';
import Quagga from 'quagga';

export default class Scanner extends React.Component {
  constructor(props) {
    super(props);

    this._onDetected = this._onDetected.bind(this);
  }

  componentDidMount() {
    Quagga.init({
      inputStream: {
        type : "LiveStream",
        constraints: {
          width: 640,
          height: 480,
          facingMode: "environment" // or user
        }
      },
      locator: {
        patchSize: "medium",
        halfSample: true
      },
      numOfWorkers: 4,
      drawScanline: true,
      drawBoundingBox: true,
      showPattern: true,
      decoder: {
        readers : [ "code_128_reader" ]
      },
      locate: true
    }, function(err) {
      if (err) {
        return console.log(err);
      }
      Quagga.start();
    });
    Quagga.onDetected(this._onDetected);
  }

  componentWillUnmount() {
    Quagga.offDetected(this._onDetected);
    Quagga.stop();
  }

  _onDetected(result) {
    this.props.onDetected(result);
  }

  render() {
    return (
      <div id="interactive" className="viewport"/>
    );
  }
}
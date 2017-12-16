'use babel';

import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import { connect } from 'react-redux';
import { readFileLine } from '../actions';

class LocalFileReader extends Component {
  readLocalFiles(files){
    const file = files[0];

    const fileReader = new FileReader();

    fileReader.readAsText(file);
    const readFileLine = this.props.readFileLine;

    fileReader.onload = (event) => {
      const res = event.target.result;
      const lines = res.split(/[\n]+/g);
      this.props.callBack(lines);
      readFileLine(lines);
    };
  }

  render() {
    return (
      <ReactFileReader
        fileTypes={['.txt']}
        handleFiles={this.readLocalFiles.bind(this)}>
        <button className='btn'>Read Report</button>
      </ReactFileReader>
    );
  }
}

export default connect(null, { readFileLine })(LocalFileReader);

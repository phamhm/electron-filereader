'use babel';

import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import { connect } from 'react-redux';
import { readFileLine, setDb } from './actions';
import LineDisplayer from './containers/LineDisplayer';
import CommentBox from './containers/CommentBox';
import { userDir } from '../index';

class Dbv extends Component {
  constructor(props){
    super(props);

    this.state = {
      maxLinePerPage: 10,
      currentPage: 0
    };
  }

  readLocalFiles(files){
    const file = files[0];

    const fileReader = new FileReader();

    fileReader.readAsText(file);
    const readFileLine = this.props.readFileLine;

    fileReader.onload = (event) => {
      const res = event.target.result;
      const lines = res.split(/[\n]+/g);
      readFileLine(lines);
    };
  }

  handlePageClick({selected}){
  }

  printLines(){
    const lines = this.props.fileLines;
    if (lines && lines.length>0){
        return lines.map(
          (line, indx) => <LineDisplayer key={indx} line={line}/>
        );
    }
  }

  displayCommentBox(){
    if (this.props.showCommentBox){
      return (
        <div style={{position: 'fixed', right:0,  top:-10, background:'black',
                     color:'white',
                     opacity:'0.9', height:'100%',
             width:'500px', marginTop:'10px'}}>
          <CommentBox/>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <ReactFileReader
          fileTypes={['.txt']}
          handleFiles={this.readLocalFiles.bind(this)}>
          <button className='btn'>Read Report</button>
        </ReactFileReader>

        {this.printLines()}

        {this.displayCommentBox()}
      </div>
    );
  }
}

function mapStateToProps({fileLines, db, showCommentBox}){
  return {fileLines, db, showCommentBox};
}

export default connect(mapStateToProps, { readFileLine, setDb })(Dbv);

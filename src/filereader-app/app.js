'use babel';

import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import { connect } from 'react-redux';
import { readFileLine, setDb, searchText } from './actions';
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

  printLines(lines){
    if (lines && lines.length>0){
        return lines.map(
          (line, indx) => <LineDisplayer key={indx} line={line}/>
        );
    }
  }

  displayCommentBox(){
    if (this.props.showCommentBox){
      return <CommentBox/>;
    }
    return null;
  }

  searchText(event){
    let searchValue = event.target.value;
    if (searchValue && searchValue ==='')
      searchValue = null;
    this.props.searchText(searchValue, this.props.fileLines);
  }

  render() {
    return (
      <div>
        <ReactFileReader
          fileTypes={['.txt']}
          handleFiles={this.readLocalFiles.bind(this)}>
          <button className='btn'>Read Report</button>
        </ReactFileReader>

        <input onChange={this.searchText.bind(this)}/>

        {this.printLines(this.props.searchTextResult || this.props.fileLines)}

        {this.displayCommentBox()}
      </div>
    );
  }
}

function mapStateToProps({fileLines, db, showCommentBox, searchTextResult}){
  return {fileLines, db, showCommentBox, searchTextResult};
}

export default connect(mapStateToProps, { readFileLine, setDb, searchText })(Dbv);

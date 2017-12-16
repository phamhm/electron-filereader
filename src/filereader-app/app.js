'use babel';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchText } from './actions';
import { Paginator } from './components/PageDisplayer';
import LocalFileReader from './components/FileReader';
import CommentBox from './containers/CommentBox';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      maxLinePerPage: 10,
      totalPages:0,
      currentPages: 0
    };
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

  resetPage(data){
    const dataLength = data.length,
          { maxLinePerPage } = this.state;
    this.setState({...this.state,
                   currentPage:0,
                   totalPages: Math.ceil(dataLength / maxLinePerPage)
                  });
  }

  nextPage(data, reverse = false){
    const dataLength = data.length,
          {currentPage, maxLinePerPage, totalPages} = this.state;
    if ( !data || !data.length )
      return;

    if (maxLinePerPage > 0){
      let nextPage;
      if (reverse)
        nextPage = (currentPage - 1) < 0 ? totalPages - 1 : currentPage -1;
      else
        nextPage = (currentPage + 1) === totalPages ? 0 : currentPage + 1;
      this.setState({...this.state, currentPage: nextPage});
    }
  }

  render() {
    const data = this.props.searchTextResult || this.props.fileLines;
    const currentPage = (data && data.length) ? this.state.currentPage + 1: 0;
    const totalPages = this.state.totalPages;

    return (
      <div>
        <LocalFileReader callBack = {(data) => this.resetPage(data)}/>

        <input onChange={this.searchText.bind(this)}/>
        <center>
          <button onClick = { ()=>this.nextPage(data, true) }> {"<"} </button>
          <input readOnly maxLength="5" style={{textAlign:"center"}} value={`${currentPage}/${totalPages}`}/>
          <button onClick = { ()=>this.nextPage(data) } > {">"} </button>
        </center>

        <Paginator data={data}
                   page={this.state.currentPage}
                   linesPerPage={this.state.maxLinePerPage}
                   />
        {this.displayCommentBox()}
      </div>
    );
  }
}

function mapStateToProps({fileLines, showCommentBox, searchTextResult}){
  return {fileLines, showCommentBox, searchTextResult};
}

export default connect(mapStateToProps, { searchText })(App);

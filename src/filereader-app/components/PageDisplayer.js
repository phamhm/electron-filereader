import React from 'react';
import LineDisplayer from './LineDisplayer';

function lineMap(data){
  return data.map(
    (line, indx) => <LineDisplayer key={indx} line={line}/>
  );
}

export default (props) => {
  const { data } = props;
  if (data && data.length > 0){
    return lineMap(data);
  }

  return null;
};

export function Paginator({ data, page, linesPerPage }){
  const pos = page * linesPerPage,
        firstPos = pos in data ? pos : 0,
        lastPos = firstPos + linesPerPage;
  return lineMap(data.slice(firstPos, lastPos));
}

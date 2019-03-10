import * as React from "react";

const SnakeVis=({dateLog}:any)=>{

    return <div> {Object.keys(dateLog).map((date)=><p key={date}>{date}</p>)}</div>;
}

export default SnakeVis;


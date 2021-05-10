import React from "react";
import "./Result.css";

const result = ({ data_source, title, publisher, subject, isEvent, image }) => {
  return (
    <div className="result">
      <div className="nameWrap">
        <h1 className="title">Title : {title}</h1>
      </div>
      <p className="data_source">Data source : {data_source}</p>
      <p className="publisher">Published by : {publisher}</p>
      <p className="subject">
        {" "}
        Subject : {subject ? subject : "No subject Found"}
      </p>
      <div className="info">{isEvent}</div>
    </div>
  );
};

export default result;

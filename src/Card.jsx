import React from "react";
import "./module.css";

export default function Card({ data }) {
  // console.log(data);

  return (
    <>
      <div className="cardContainer">
        {data &&
          data.map((item, index) => {
            return (
              <>
                <div className="card">
                  <img
                    src={item.urlToImage}
                    width="200px"
                    height="200px"
                  />
                  <div className="content">
                    <a
                      className="title"
                      onClick={() => window.open(item.url)}
                    >
                      {item.title}
                    </a>
                    <p>{item.description}</p>
                    <button onClick={() => window.open(item.url)}>
                      Read More
                    </button>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}

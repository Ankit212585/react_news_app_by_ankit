import React, { useEffect, useState } from "react";
import Card from "./Card";

import "./module.css";

export default function Newsapp() {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);

  const ourApi = "ab8ea7f28ee34c3c967f9521911d8372";
  const getdata = async () => {
    const resp = await fetch(
      `https://newsapi.org/v2/everything?q=${search}&apiKey=${ourApi}`
    );
    const jsonData = await resp.json();
    // console.log(jsonData.articles);
    setNewsData(jsonData.articles);
  };
  //   use Effect call

  useEffect(() => {
    getdata();
  }, []);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const userInput = (e) => {
    const allvalue = e.target.value;
    return setSearch(allvalue);
  };

  return (
    <>
      <div>
        <nav>
          <div>
            <h1>Trending News</h1>
          </div>
          <ul>
            <h3>All Trending News</h3>
          </ul>
          <div className="searchBar">
            <input
              type="text"
              placeholder="Search News"
              onChange={handleInput}
              value={search}
            />
            <button onClick={() => getdata(search)}>Search</button>
          </div>
        </nav>
        <div>
          <p className="head">Stay update with trending news</p>
        </div>
        <div className="categoryBtn">
          <button onClick={userInput} value="Sports">
            Sports
          </button>
          <button onClick={userInput} value="Politics">
            Politics
          </button>
          <button onClick={userInput} value="Entertainment">
            Entertainment
          </button>
          <button onClick={userInput} value="Health">
            Health
          </button>
          <button onClick={userInput} value="Fitness">
            Fitness
          </button>
        </div>
        <div>
          <Card data={newsData} />
        </div>
      </div>
    </>
  );
}

import React from "react";
import "./module.css";

const initialFriends = [
  {
    id: 1,
    name: "clark",
    image:
      "https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg",
    balance: -7,
  },
  {
    id: 2,
    name: "jonas",
    image:
      "https://res.cloudinary.com/dzdgpwtox/image/upload/w_450,c_scale,f_auto/v1615660829/final_designs/seller_design_152537/f_20210313184028.png",
    balance: 20,
  },
  {
    id: 3,
    name: "peter",
    image:
      "https://ih1.redbubble.net/image.3607614648.8163/raf,750x1000,075,t,FCD9D9:9126c0bfe7.jpg",
    balance: 0,
  },
];

export default function Home() {
  return (
    <>
      <div className="app">
        <div className="sidebar">
          <Friendlist />
        </div>
      </div>
    </>
  );
}

function Friendlist() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((item) => (
        <Friend friends={item} key={item.id} />
      ))}
    </ul>
  );
}

function Friend({ friends }) {
  return (
    <>
      <li>
        <img
          src={friends.image}
          alt={friends.id}
          width="150px"
          height="150px"
        />
        {friends.name}
        {friends.balance < 0 && (
          <p style={{ color: "red" }}>
            you own {friends.name} {friends.balance}
          </p>
        )}
        {friends.balance > 0 && (
          <p style={{ color: "green" }}>
            you own {friends.name} {friends.balance}
          </p>
        )}
        {friends.balance === 0 && (
          <p style={{ color: "black" }}>
            you and your {friends.name} are even
          </p>
        )}
        <button className="button">Select</button>
      </li>
    </>
  );
}

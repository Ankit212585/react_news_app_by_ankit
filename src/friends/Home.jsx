import React, { Children, useState } from "react";
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

// define a reusable button
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function Home() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleSelection(friends) {
    // setSelectedFriend(friends);
    setSelectedFriend((curr) =>
      curr?.id === friends.id ? null : friends
    );
    // setShowAddFriend(false);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function showhandlebutton() {
    setShowAddFriend((show) => !show);
  }

  function handleSplit(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    selectedFriend(null);
  }
  return (
    <>
      <div className="app">
        <div className="sidebar">
          <Friendlist
            friends={friends}
            selectedFriend={selectedFriend}
            onSelection={handleSelection}
          />
          {/* ------------------------------------------------------------------------------------ */}
          {showAddFriend && (
            <FormAddFriend onAddFriend={handleAddFriend} />
          )}
          <Button onClick={showhandlebutton}>
            {showAddFriend ? "close" : "Add Friend"}
          </Button>
        </div>

        {/* ------------------------------------------------------------------------------------ */}
        {selectedFriend && (
          <FormSplitBill
            selectedFriend={selectedFriend}
            onSplitBill={handleSplit}
          />
        )}
      </div>
    </>
  );
}

function Friendlist({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((item) => (
        <Friend
          friends={item}
          key={item.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}
{
  /* ------------------------------------------------------------------------------------ */
}
function Friend({ friends, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friends.id;
  return (
    <>
      <li className={isSelected ? "selected" : ""}>
        <img src={friends.image} alt={friends.id} />
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

        <Button onClick={() => onSelection(friends)}>
          {isSelected ? "close" : "select"}
        </Button>
      </li>
    </>
  );
}

{
  /* ------------------------------------------------------------------------------------ */
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newFriend = {
      id: Crypto.randomUUID,
      name,
      image: `${image}`,
      balance: 0,
    };
    return onAddFriend(newFriend), setName(""), setImage("");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>😀friend Name</label>
      <input
        type="text"
        placeholder="Enter your Friend Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>😎image Url</label>
      <input
        type="text"
        placeholder="Enter your Friend Name"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add Friend</Button>
    </form>
  );
}

{
  /* -------------------------------------------------------------------------------------------- */
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");

  const [paidByUser, setPaidByUser] = useState("");

  const paidbyFriend = bill ? bill - paidByUser : "";

  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleBillSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidbyFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleBillSubmit}>
      <h2>Split Bill {`${selectedFriend.name}`}</h2>

      <label>😎Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>😀Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) => setPaidByUser(Number(e.target.value))}
      />

      <label>✌️{selectedFriend.name}' Expense</label>
      <input
        type="text"
        disabled
        value={paidbyFriend}
        onChange={(e) =>
          setPaidByUser(Number(e.target.value)) > bill
            ? paidByUser
            : Number(e.target.value)
        }
      />

      <label>😑who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(Number(e.target.value))}
      >
        <option value="user">You</option>
        <option value="Friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}

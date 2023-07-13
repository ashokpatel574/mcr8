import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useData } from "../context/DataContext";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const { dispatch } = useData();

  const inputSearchChangeHandler = (e) => {
    setSearchInput(e.target.value);
    dispatch({ type: "SearchEvent", payload: e.target.value });
  };

  return (
    <header className="header">
      <nav>
        <div>
          <NavLink to="/">MeetUp</NavLink>
        </div>
        <div>
          <input
            id="searchBox"
            placeholder="Search events here"
            type="text"
            className="input"
            name="searchBoxInput"
            value={searchInput}
            onChange={inputSearchChangeHandler}
          />
          <label htmlFor="searchBox"></label>
        </div>
      </nav>
    </header>
  );
};

export default Header;

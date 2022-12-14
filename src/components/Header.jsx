import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "../providers/StateProvider";
import { auth } from "../firebase";
import { useSearchContext } from "../providers/searchProvider";

function Header() {
  const [{ cart, user }] = useStateValue();
  const { query, setQuery } = useSearchContext();

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };

  const name = () => {
    const onlyName = (user?.email).split("@")[0];
    const name = onlyName.charAt(0).toUpperCase() + onlyName.slice(1);
    return name;
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          onClick={() => setQuery("")}
          className="header__logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon-logo"
        />
      </Link>

      <div className="header__search">
        <input
          type="text"
          placeholder="search..."
          className="header__searchInput"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to={!user ? "/login" : "/"}>
          <div onClick={handleAuth} className="header__option">
            <span className="header__optionLineOne">
              Hello {user ? name() : "Guest"}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to={user ? "/orders" : "/"}>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        <Link to="/">
          <div className="header__option your__prime">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Prime</span>
          </div>
        </Link>
      </div>
      <Link to="/checkout">
        <div className="header__optionLineTwo header__optionCart">
          <ShoppingCartIcon fontSize="large" />
          <p className="header__optionLineTwo header__cartCount">
            {cart?.length}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Header;

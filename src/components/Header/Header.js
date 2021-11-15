import React from "react";
import "../Header/Header.css";
import MenuIcon from "@material-ui/icons/Menu";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AppsIcon from "@material-ui/icons/Apps";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { logout, selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
  };
  return (
    <div className="header">
      <div className="header__left">
        {/* IconButton for Ripple effect */}
        <IconButton>
          <MenuIcon />
        </IconButton>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2WdtWKYIx09KC9jN3L87mgntqtQwN1lMf0Q&usqp=CAU"
          // src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png"
          alt="logo"
        />
      </div>
      <div className="header__middle">
        <SearchIcon />
        <input placeholder="Search mail" type="text" />
        <ArrowDropDownIcon className="header__inputCaret" />
      </div>
      <div className="header__right">
        <IconButton>
          <AppsIcon />
        </IconButton>

        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton>
          <Avatar onClick={signOut} src={user?.photoURL}>
            {" "}
            {user?.email[0]}{" "}
          </Avatar>
        </IconButton>
      </div>
    </div>
  );
}

export default Header;

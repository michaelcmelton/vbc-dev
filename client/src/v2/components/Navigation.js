import React from "react";
import { Link } from "react-router-dom";
import { useUserState } from "../contexts/user";

const Navigation = (props) => {
  const { isAuthenticated } = useUserState();

  const links = props.pages.map((i) => {
    switch (i) {
      case "Profile":
      case "Logout":
        return isAuthenticated ? (
          <Link key={i} to={`/${i.toLowerCase()}`}>
            {i}
          </Link>
        ) : null;
      case "Login":
        return isAuthenticated ? null : (
          <Link key={i} to={`/${i.toLowerCase()}`}>
            {i}
          </Link>
        );
      default:
        return (
          <Link key={i} to={i === "Home" ? "/" : `/${i.toLowerCase()}`}>
            {i}
          </Link>
        );
    }
  });

  return <nav>{links}</nav>;
};

export default Navigation;

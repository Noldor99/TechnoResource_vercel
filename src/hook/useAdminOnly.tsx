import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectEmail } from "../store/slice/authSlice";

interface Props {
  children: React.ReactNode;
}


export const ShowAdminRoute = ({ children }: Props) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "qwerr1d9942017@gmail.com") {
    return children;
  }
  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Permission Denied.</h2>
        <p>This page can only be view by an Admin user.</p>
        <br />
        <Link to="/">
          <button className="--btn">&larr; Back To Home</button>
        </Link>
      </div>
    </section>
  );
};

export const ShowAdminLink = ({ children }: Props) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "qwerr1d9942017@gmail.com") {
    return children;
  }
  return null;
};

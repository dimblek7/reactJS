import React, { useEffect, useState } from "react";
import { logout } from "handlers/setters";
import { instance } from "actions/axiosInstance";

export default function Dashboard(props) {
  const [users, setusers] = useState([]);
  useEffect(() => {
    instance.get("user").then((r) => setusers(r.data.result));
  }, []);
  return (
    <div className="p-3">
      Hi, you are logged in
      <a className="ml-5 pull-right" onClick={() => logout()}>
        {" "}
        logout{" "}
      </a>
      <ul className="mt-5">
        Available roles
        {users.map((x) => {
          return <li>{x.username}</li>;
        })}
      </ul>
    </div>
  );
}

import React from "react";
import Connect from "./Connect";
import { getCookie } from "@/api/customFetch";

const Chat = async () => {
  const cookie = await getCookie();
  return (
    <div>
      <Connect userId={cookie.userID} />
    </div>
  );
};

export default Chat;

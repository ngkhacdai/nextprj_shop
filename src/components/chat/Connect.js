"use client";
import React, { useEffect, useState } from "react";
import ChatForm from "./ChatForm";
import ChatBox from "./ChatBox";
import io from "socket.io-client";
import { URL } from "@/api/url";
import { socket } from "@/utils/socket";

const Connect = ({ userId }) => {
  const [messageData, setMessageData] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [listUser, setListUser] = useState([]);
  console.log(listUser);
  useEffect(() => {
    socket.emit("getListUserbyShop", { userId });

    socket.on("listUserByShopResponse", (data) => {
      setListUser(data);
    });
    socket.on("getallmessage", (data) => {
      setMessageData(data || []);
    });

    socket.on("newmessage", (message) => {
      setMessageData((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("connect", () => {});
      socket.off("getallmessage");
      socket.off("newmessage");
      socket.disconnect();
    };
  }, [userId]);

  const sendMessage = async (message) => {
    const form = {
      userId: roomId.userId._id,
      shopId: roomId.shopId,
      senderID: userId,
      message: message,
    };
    socket.emit("chat", form);
  };

  const joinRoom = (item) => {
    setRoomId(item);
    socket.emit("joinroom", { userId: item.userId._id, shopId: item.shopId });
  };

  return (
    <div className="flex">
      <div className="w-1/4 border-inherit h-[36rem] max-h-[36rem] border-2 overflow-y-auto">
        {listUser.map((item, index) => (
          <div key={`shop-${index}`} onClick={() => joinRoom(item)}>
            <div
              className={`${
                roomId?.userId?._id === item.userId._id ? "bg-slate-300" : ""
              } hover:bg-slate-200 p-2 line-clamp-1 border-inherit border-b-2 flex justify-start items-center cursor-pointer max-w-xs`}
            >
              <img
                className="rounded-full mr-1 w-10 h-10"
                alt=""
                src={`${URL}/${item?.userId?.information?.avatar}`}
              />
              <p>{item?.userId?.information?.fullName}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-3/4 relative">
        <div className="overflow-y-auto max-h-[32rem]">
          <ChatBox messageData={messageData} />
        </div>
        <div className="pt-2 pl-2 border-gray-300 absolute bottom-0 w-full">
          <ChatForm sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Connect;

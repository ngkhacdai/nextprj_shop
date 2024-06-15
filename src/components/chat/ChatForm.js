import { Button, Form, Input } from "antd";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";

const ChatForm = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const onFinish = () => {
    const mess = message.trim();
    if (mess) {
      sendMessage(message);
      setMessage("");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed} className="flex">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow border border-gray-300 rounded-l-lg mr-1"
        placeholder="Nhập tin nhắn"
      />
      <Button
        type="primary"
        htmlType="submit"
        className="bg-blue-500 text-white rounded-r-lg p-2 flex items-center"
      >
        <IoMdSend className="mr-1" />
      </Button>
    </Form>
  );
};

export default ChatForm;

import { Button, Form, Input, Radio, Upload, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { API } from "@/helper/url";

const UpdateProfile = () => {
  const [file, setFile] = useState([]);
  const [fullname, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("Nam");
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const openNotificationWithIcon = (content) => {
    api["error"]({
      message: "Notification Error",
      description: content,
    });
  };
  const onFinish = async () => {
    if (file && fullname && phoneNumber && gender) {
      const formData = new FormData();
      formData.append("avatar", file.originFileObj);
      formData.append("fullName", fullname);
      formData.append("gender", gender);
      formData.append("phoneNumber", phoneNumber);
      await axios
        .post(
          `${API}/v1/api/user/setUpAcc/${localStorage.getItem("userID")}`,
          formData
        )
        .then((res) => {
          console.log("cập nhật thành công");
          router.push("/login");
        })
        .catch(() => {
          openNotificationWithIcon("Lỗi khi cập nhật");
        });
      clearForm();
    }
  };
  const onFinishFailed = () => {
    return openNotificationWithIcon("Không được bỏ trống trường nào");
  };
  const clearForm = () => {
    setFullName("");
    setPhoneNumber("");
    setGender("Nam");
  };

  return (
    <div className=" m-auto mt-36 ">
      {contextHolder}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        className="w-full text-center"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Avatar"
          name="avatar"
          rules={[
            {
              required: true,
              message: "Hãy chọn ảnh",
            },
          ]}
        >
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            name="avatar"
            listType="picture-card"
            onChange={(e) => {
              setFile(e.fileList[0]);
            }}
          >
            <button
              style={{
                border: 0,
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Họ và tên"
          rules={[
            {
              required: true,
              message: "Hãy điền họ và tên",
            },
          ]}
        >
          <Input
            value={fullname}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              min: 9,
              message: "Số điện thoại có ít nhất 9 số",
            },
          ]}
        >
          <Input
            type="Number"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Giới tính" name="gender">
          <Radio.Group
            defaultValue={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <Radio value="Nam"> Nam </Radio>
            <Radio value="Nữ"> Nữ </Radio>
          </Radio.Group>
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Cập nhật
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProfile;

"use client";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Upload } from "antd";
import { useState } from "react";

const FormInfor = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const [fileList, setFileList] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
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
  );
  return (
    <div>
      <Form
        style={{
          width: "100%",
        }}
        layout="vertical"
      >
        <Form.Item
          hasFeedback
          label="Avata shop"
          name="avatar"
          validateDebounce={1000}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Upload
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{
                display: "none",
              }}
              src={previewImage}
            />
          )}
        </Form.Item>
        <Form.Item
          hasFeedback
          label="Tên shop"
          name="nameShop"
          validateDebounce={1000}
          rules={[
            {
              min: 3,
              message: "Phải có ít nhất 3 ký tự",
            },
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Hãy điền tên cửa hàng" />
        </Form.Item>
        <Form.Item
          hasFeedback
          label="Số điện thoại"
          name="phoneNumberShop"
          validateDebounce={1000}
          rules={[
            {
              min: 9,
              message: "Phải có ít nhất 9 ký tự",
            },
            {
              required: true,
            },
          ]}
        >
          <Input type="number" placeholder="Hãy điền số diện thoại" />
        </Form.Item>
        <Form.Item
          hasFeedback
          label="Địa chỉ"
          name="address"
          validateDebounce={1000}
          rules={[
            {
              min: 3,
              message: "Phải có ít nhất 3 ký tự",
            },
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Hãy điền địa chỉ cửa hàng" />
        </Form.Item>
        <Form.Item
          hasFeedback
          label="Email"
          name="emailShop"
          validateDebounce={1000}
          rules={[
            {
              min: 3,
              message: "Phải có ít nhất 3 ký tự",
            },
            {
              required: true,
            },
            {
              pattern: /^[^\s@]+@gmail\.com$/,
              message: 'Email phải kết thúc bằng "@gmail.com"',
            },
          ]}
        >
          <Input placeholder="Hãy điền email cho shop" />
        </Form.Item>
        <Form.Item
          hasFeedback
          label="Mô tả"
          name="des"
          validateDebounce={1000}
          rules={[
            {
              min: 3,
              message: "Phải có ít nhất 3 ký tự",
            },
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Hãy điền mô tả cho cửa hàng" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Lưu
        </Button>
      </Form>
    </div>
  );
};

export default FormInfor;

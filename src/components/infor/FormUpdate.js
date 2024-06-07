"use client";
import React from "react";
import { updateShop } from "@/api/Shop";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Upload,
  notification,
} from "antd";
import { useState } from "react";
import { URL } from "@/api/url";
import { useRouter } from "next/navigation";
const FormUpdate = ({ shopInfor }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const router = useRouter();
  const [fileList, setFileList] = useState(
    !shopInfor
      ? []
      : [
          {
            uid: `1`,
            name: "image",
            status: "done",
            url: `${URL}/${shopInfor.avatarShop}`,
          },
        ]
  );
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api["success"]({
      message: "Notification Title",
      description: "Cập nhật thành công",
    });
  };
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Avatar</div>
    </div>
  );
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("nameShop", values.nameShop);
    formData.append("address", values.address);
    formData.append("phoneNumberShop", values.phoneNumberShop);
    formData.append("des", values.des);
    formData.append("avatar", fileList[0].originFileObj);
    await updateShop(formData).then(() => {
      window.location.reload();
    });
    // router.push("/");
    // openNotificationWithIcon();
  };
  return (
    <div>
      {contextHolder}
      <Form
        style={{ width: "100%" }}
        initialValues={{
          nameShop: shopInfor?.nameShop,
          address: shopInfor?.address,
          phoneNumberShop: shopInfor && "0" + shopInfor.phoneNumberShop,
          des: shopInfor?.des,
        }}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={5} xl={5} className="flex items-center">
            <Form.Item
              className="flex w-full justify-center"
              hasFeedback
              name="avatar"
              validateDebounce={1000}
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
                  alt=""
                  wrapperStyle={{ display: "none" }}
                  src={previewImage}
                />
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={19} xl={19}>
            <Form.Item
              hasFeedback
              label="Tên shop"
              name="nameShop"
              validateDebounce={1000}
              rules={[
                { min: 3, message: "Phải có ít nhất 3 ký tự" },
                { required: true, message: "Vui lòng điền tên cửa hàng" },
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
                { min: 9, message: "Phải có ít nhất 9 ký tự" },
                { required: true, message: "Vui lòng điền số điện thoại" },
              ]}
            >
              <Input type="number" placeholder="Hãy điền số điện thoại" />
            </Form.Item>
            <Form.Item
              hasFeedback
              label="Địa chỉ"
              name="address"
              validateDebounce={1000}
              rules={[
                { min: 3, message: "Phải có ít nhất 3 ký tự" },
                { required: true, message: "Vui lòng điền địa chỉ" },
              ]}
            >
              <Input placeholder="Hãy điền địa chỉ cửa hàng" />
            </Form.Item>
            <Form.Item
              hasFeedback
              label="Mô tả"
              name="des"
              validateDebounce={1000}
              rules={[
                { min: 3, message: "Phải có ít nhất 3 ký tự" },
                { required: true, message: "Vui lòng điền mô tả" },
              ]}
            >
              <Input.TextArea placeholder="Hãy điền mô tả cho cửa hàng" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormUpdate;

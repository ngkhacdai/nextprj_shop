"use client";
import { URL } from "@/api/url";
import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Input,
  Form,
  Image,
  Select,
  Upload,
  notification,
  Col,
  Row,
  Button,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";

const ProductForm = ({ categoryData, productDetail }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState(
    productDetail.product_thumb.map((item, index) => ({
      uid: `${index}`,
      name: item, // Extract the file name
      status: "done",
      url: `${URL}/uploads/${item}`,
    }))
  );
  const [category, setCategory] = useState(productDetail.category);
  const [api, contextHolder] = notification.useNotification();
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [attribute, setAttribute] = useState([]);

  useEffect(() => {
    const updatedAttributes = productDetail.product_attributes.map((attr) => ({
      ...attr,
      options: [...attr.options, { size: null, options_quantity: 0 }],
    }));

    setAttribute([
      ...updatedAttributes,
      {
        color: null,
        options: [{ size: null, options_quantity: 0 }],
      },
    ]);
  }, []);
  const openNotificationWithIcon = (message, type = "error") => {
    api[type]({
      message: `Notification ${type}`,
      description: message,
    });
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const categoryOptions = [];
  categoryData.map((item) => {
    categoryOptions.push({
      value: item._id,
      label: item.category_name,
    });
  });
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
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const checkAttributes = () => {
    let check = true;
    for (let index = 0; index < attribute.length - 1; index++) {
      for (
        let indexOption = 0;
        indexOption < attribute[index].options.length - 1;
        indexOption++
      ) {
        if (attribute[index].options[0].size == null) {
          openNotificationWithIcon("Hãy chọn size");
          return (check = false);
        }
        if (
          attribute[index].options[indexOption].options_quantity <= 0 ||
          attribute[index].options[indexOption].options_quantity == null
        ) {
          openNotificationWithIcon("Số lượng phải lớn hơn 0");
          return (check = false);
        }
      }
    }
    return check;
  };
  const optionSize = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
  ];
  const optionsColor = [
    { value: "Đỏ", label: "Đỏ" },
    { value: "Cam", label: "Cam" },
    { value: "Vàng", label: "VÀng" },
    { value: "Lục", label: "Lục" },
    { value: "Lam", label: "Lam" },
    { value: "Chàm", label: "Chàm" },
    { value: "Tím", label: "Tím" },
  ];

  const handleSelectAttribute = (value, index) => {
    const copyAtt = [...attribute];
    if (value[0] === undefined) {
      copyAtt.splice(index, 1);
    } else {
      copyAtt[index] = {
        color: value[value.length - 1],
        options: [{ size: null, options_quantity: 0 }],
      };
    }

    if (!copyAtt.some((attr) => attr.color === null)) {
      copyAtt.push({
        color: null,
        options: [{ size: null, options_quantity: 0 }],
      });
    }

    setAttribute(copyAtt);
  };

  const handleSelectOptions = (value, attributeIndex, optionIndex) => {
    const newAtt = [...attribute];
    if (value[0] === undefined) {
      newAtt[attributeIndex].options.splice(optionIndex, 1);
    } else {
      newAtt[attributeIndex].options[optionIndex] = {
        size: value[0],
        options_quantity:
          newAtt[attributeIndex].options[optionIndex]?.options_quantity || 0,
      };

      if (!newAtt[attributeIndex].options.some((opt) => opt.size === null)) {
        newAtt[attributeIndex].options.push({
          size: null,
          options_quantity: 0,
        });
      }
    }
    setAttribute(newAtt);
  };

  const onChangeQuantity = (value, attributeIndex, optionIndex) => {
    const newAtt = [...attribute];
    newAtt[attributeIndex].options[optionIndex] = {
      size: newAtt[attributeIndex].options[optionIndex].size,
      options_quantity: value,
    };
    setAttribute(newAtt);
  };
  const onFinish = async (values) => {
    let response = await fetch(
      "https://dai.tongdaihoidap.com/uploads/1700837254924-Screenshot 2023-11-24 214347.png"
    );
    let data = await response.blob();
    let metadata = {
      type: "image/jpeg",
    };
    let file = new File([data], `${Date.now()}.png`, metadata);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      {contextHolder}
      <div className="py-2 font-semibold text-lg">Chi tiết sản phẩm</div>
      <div className="md:w-5/6 mx-auto">
        <div className="text-center">
          <p>Sửa sản phẩm</p>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => setComponentDisabled(!componentDisabled)}
          />
        </div>
        <div className="w-full text-center mx-auto">
          <Form
            disabled={componentDisabled}
            name="basic"
            layout="vertical"
            className="w-full flex flex-col justify-center items-center"
            initialValues={{
              nameProduct: productDetail.product_name,
              productPrice: productDetail.product_price,
              description: productDetail.product_description,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              className="w-full"
              name="imgageProduct"
              label="Ảnh sản phẩm"
            >
              <div>
                <Upload
                  beforeUpload={() => false}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    alt=""
                    wrapperStyle={{
                      display: "none",
                    }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              className="w-full"
              label="Tên sản phẩm"
              name="nameProduct"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập tên sản phẩm",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="w-full"
              label="Giá sản phẩm"
              name="productPrice"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập giá sản phẩm",
                },
              ]}
            >
              <Input type="Number" />
            </Form.Item>
            <Form.Item className="w-full" label="Loại sản phẩm">
              <Select
                style={{
                  width: "100%",
                }}
                onChange={(value) => setCategory(value)}
                defaultValue={category}
                options={categoryOptions}
              />
            </Form.Item>
            <Form.Item className="w-full" label="Mô tả" name="description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item className="w-full" label="Thuộc tính sản phẩm">
              <Row justify={"space-between"}>
                <Col span={7}>
                  <p>Màu sắc</p>
                </Col>
                <Col span={7}>
                  <p>Kích cỡ</p>
                </Col>
                <Col span={7}>
                  <p>Số lượng</p>
                </Col>
              </Row>
              {attribute.map((item, index) => {
                return (
                  <Row
                    className="py-2"
                    key={`att-${index}`}
                    justify={"space-between"}
                  >
                    <Col span={7}>
                      <Select
                        mode="tags"
                        style={{
                          width: "100%",
                        }}
                        value={item.color}
                        onChange={(e) => handleSelectAttribute(e, index)}
                        tokenSeparators={[","]}
                        options={optionsColor}
                      />
                    </Col>
                    <Col span={7}>
                      {attribute[index].color &&
                        attribute[index].options.map((item, optionIndex) => {
                          return (
                            <Select
                              key={`options-${optionIndex}`}
                              mode="tags"
                              style={{
                                width: "100%",
                              }}
                              className="pb-2"
                              value={item.size}
                              onChange={(e) =>
                                handleSelectOptions(e, index, optionIndex)
                              }
                              tokenSeparators={[","]}
                              options={optionSize}
                            />
                          );
                        })}
                    </Col>
                    <Col span={7}>
                      {attribute[index].options[0].size &&
                        attribute[index].options.map((item, optionIndex) => (
                          <div
                            className="pb-2"
                            key={`optionquan-${optionIndex}`}
                          >
                            <Input
                              onChange={(e) =>
                                onChangeQuantity(
                                  e.target.value,
                                  index,
                                  optionIndex
                                )
                              }
                              type="number"
                              value={item.options_quantity}
                            />
                          </div>
                        ))}
                    </Col>
                  </Row>
                );
              })}
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;

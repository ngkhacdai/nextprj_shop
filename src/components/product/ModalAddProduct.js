"use client";
import { PlusOutlined } from "@ant-design/icons";
import {
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Upload,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { FloatButton } from "antd";
import { CiCirclePlus } from "react-icons/ci";
import { createProduct } from "@/api/Product";

const ModalAddProduct = ({ categoryData }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [category, setCategory] = useState(categoryData[0]?._id);
  const [description, setDescription] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [attribute, setAttribute] = useState([
    {
      color: null,
      options: [{ size: null, options_quantity: 0 }],
    },
  ]);
  const openNotificationWithIcon = (message, type = "error") => {
    api[type]({
      message: `Notification ${type}`,
      description: message,
    });
  };
  const categoryOptions = [];
  categoryData.map((item) => {
    categoryOptions.push({
      value: item._id,
      label: item.category_name,
    });
  });

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (
      fileList.length === 0 ||
      !productName ||
      !productPrice ||
      !category ||
      !description
    ) {
      return openNotificationWithIcon("Hãy điền đầy đủ các trường");
    }
    if (!checkAttributes()) {
      return;
    }
    const newAtt = [];
    for (let index = 0; index < attribute.length - 1; index++) {
      newAtt.push({
        color: attribute[index].color,
        options: [],
      });
      for (
        let optionIndex = 0;
        optionIndex < attribute[index].options.length - 1;
        optionIndex++
      ) {
        newAtt[index].options.push({
          size: attribute[index].options[optionIndex].size,
          options_quantity:
            attribute[index].options[optionIndex].options_quantity,
        });
      }
    }
    const formData = new FormData();
    fileList.forEach((item, index) => {
      formData.append(`thumbs`, item.originFileObj);
    });
    formData.append("product_name", productName);
    formData.append("product_description", description);
    formData.append("product_price", productPrice);
    formData.append("category", category);
    formData.append("product_attributes", JSON.stringify(newAtt));
    await createProduct(formData);
    clearForm();
    setIsModalOpen(false);
  };
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

  const handleCancel = () => {
    // clearForm();
    setIsModalOpen(false);
  };

  const clearForm = () => {
    setFileList([]);
    setProductName("");
    setProductPrice(0);
    setDescription("");
    setCategory(categoryData[0]?._id);
    setAttribute([
      {
        color: null,
        options: [{ size: null, options_quantity: 0 }],
      },
    ]);
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
  return (
    <div>
      {contextHolder}
      <Modal
        className="w-[58rem]"
        title="Thêm sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item>
            <div>Ảnh sản phẩm: </div>
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
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </Form.Item>
          <Form.Item label="Tên sản phẩm">
            <Input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Giá sản phẩm">
            <Input
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              type="Number"
            />
          </Form.Item>
          <Form.Item label="Loại sản phẩm">
            <Select
              style={{
                width: 120,
              }}
              onChange={(value) => setCategory(value)}
              defaultValue={category}
              options={categoryOptions}
            />
          </Form.Item>
          <Form.Item label="Mô tả">
            <Input.TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
        </Form>
        <p>Thuộc tính sản phẩm</p>
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
                    <div className="pb-2" key={`option-${optionIndex}`}>
                      <Input
                        onChange={(e) =>
                          onChangeQuantity(e.target.value, index, optionIndex)
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
      </Modal>

      <FloatButton
        shape="circle"
        type="primary"
        onClick={showModal}
        style={{
          right: 24,
        }}
        icon={<CiCirclePlus />}
      />
    </div>
  );
};

export default ModalAddProduct;

"use client";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
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
import React, { useState } from "react";
import { FloatButton } from "antd";
import { CiCirclePlus } from "react-icons/ci";
import { createProduct } from "@/api/Product";
import { usePathname } from "next/navigation";

const ModalAddProduct = ({ profile, categoryData }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathName = usePathname();
  const [attribute, setAttribute] = useState([
    {
      color: null,
      options: [{ size: null, options_quantity: 0 }],
    },
  ]);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const openNotificationWithIcon = (message, type = "error") => {
    api[type]({
      message: `Notification ${type}`,
      description: message,
    });
  };

  const categoryOptions = categoryData.map((item) => ({
    value: item._id,
    label: item.category_name,
  }));

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
    if (!profile)
      return openNotificationWithIcon("Hãy cập nhật thông tin shop trước");
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const formValues = form.getFieldsValue();
    const { productName, productPrice, category, description } = formValues;

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
    fileList.forEach((item) => {
      formData.append(`thumbs`, item.originFileObj);
    });
    formData.append("product_name", productName);
    formData.append("product_description", description);
    formData.append("product_price", productPrice);
    formData.append("category", category);
    formData.append("product_attributes", JSON.stringify(newAtt));
    try {
      const productData = await createProduct(formData, pathName);
      openNotificationWithIcon("Sản phẩm đã được thêm thành công", "success");
      clearForm();
      setIsModalOpen(false);
    } catch (error) {
      openNotificationWithIcon("Failed to create product");
    }
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
    clearForm();
    setIsModalOpen(false);
  };

  const clearForm = () => {
    form.resetFields();
    setFileList([]);
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
    { value: "Vàng", label: "Vàng" },
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
        footer={
          <div>
            <Button onClick={handleCancel}>Đóng</Button>
            <Button
              type="primary"
              onClick={clearForm}
              className="mx-2 bg-red-600 text-white hover:bg-red-500"
            >
              Xóa form
            </Button>
            <Button onClick={handleOk} type="primary">
              Thêm sản phẩm
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
          initialValues={{
            category: categoryData[0]?._id,
            attributes: attribute,
          }}
        >
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            label={"Ảnh sản phẩm"}
            name="image"
          >
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
          <Form.Item
            name="productName"
            rules={[
              {
                required: true,
              },
            ]}
            label="Tên sản phẩm"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="productPrice"
            rules={[
              {
                required: true,
              },
            ]}
            label="Giá sản phẩm"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name={"category"}
            rules={[
              {
                required: true,
              },
            ]}
            label="Loại sản phẩm"
          >
            <Select
              style={{
                width: 120,
              }}
              options={categoryOptions}
            />
          </Form.Item>
          <Form.Item
            name={"description"}
            rules={[
              {
                required: true,
              },
            ]}
            label="Mô tả"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={"attributes"}
            rules={[
              {
                required: true,
              },
            ]}
            label="Thuộc tính sản phẩm"
          >
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
                <Row key={`att-${index}`} justify={"space-between"}>
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
                        <div className="pb-2" key={`optionquan-${optionIndex}`}>
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
        </Form>
      </Modal>

      <FloatButton
        shape="circle"
        type="primary"
        onClick={showModal}
        style={{
          right: 20,
          bottom: 20,
        }}
        icon={<CiCirclePlus />}
      />
    </div>
  );
};

export default ModalAddProduct;

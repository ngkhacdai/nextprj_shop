import { API } from "@/api/url";
import { Col, Row } from "antd";
import React from "react";

const OrderDetail = ({ detail }) => {
  console.log(detail);

  return (
    <div>
      <div className="text-center">
        <p className="font-bold text-lg break-words">{detail.product_name}</p>
      </div>
      <hr />
      <div>
        <p className="text-green-400">Thông tin sản phẩm</p>
        <Row gutter={[10, 10]}>
          <Col span={16}>
            <img
              alt=""
              className="w-full h-56"
              src={`${API}/uploads/${detail.product_thumb[0]}`}
            />
          </Col>
          <Col className="py-2">
            <p>Màu: {detail.product_attributes.color}</p>
            <p>Kích cỡ: {detail.product_attributes.size}</p>
          </Col>
        </Row>
      </div>
      <hr className="my-1" />
      <div>
        <p className="text-green-400">Thông tin khách hàng</p>
        <Row justify={"space-between"} gutter={[10, 10]}>
          <Col>Tên khách hàng:</Col>
          <Col>{detail.user_name}</Col>
        </Row>
        <Row justify={"space-between"} gutter={[10, 10]}>
          <Col>Số điện thoại:</Col>
          <Col>0{detail.phoneNumber}</Col>
        </Row>
        <Row justify={"space-between"} gutter={[10, 10]}>
          <Col>Địa chỉ:</Col>
          <Col>{detail.order_shipping.Address}</Col>
        </Row>
      </div>
      <hr className="my-1" />

      <div>
        <p className="text-green-400">Chi tiết đơn hàng</p>
        <Row justify={"space-between"} gutter={[10, 10]}>
          <Col>Mã đơn hàng:</Col>
          <Col>{detail.oderId}</Col>
        </Row>
        <Row justify={"space-between"} gutter={[10, 10]}>
          <Col>Phương thức thanh toán:</Col>
          <Col>{detail.order_payment}</Col>
        </Row>
        <Row justify={"space-between"} gutter={[10, 10]}>
          <Col>Ngày mua:</Col>
          <Col>
            {new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }).format(new Date(detail.crateDate))}
          </Col>
        </Row>
        <Row justify={"space-between"} gutter={[10, 10]}>
          <Col>Giá:</Col>
          <Col>
            {detail.product_attributes.price.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </Col>
        </Row>
        <Row justify={"space-between"} gutter={[10, 10]}>
          <Col>Số lượng:</Col>
          <Col>x{detail.product_attributes.quantity}</Col>
        </Row>
        <Row justify={"space-between"} gutter={[10, 10]}>
          <Col>Phí ship:</Col>
          <Col>
            {detail.order_checkout.feeShip.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </Col>
        </Row>
        <Row justify={"space-between"} gutter={[10, 10]}>
          <Col>Tổng tiền:</Col>
          <Col>
            {(
              detail.order_checkout.feeShip +
              detail.order_checkout.totalCheckout
            ).toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OrderDetail;

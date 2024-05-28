import { API } from "@/api/url";
import { Col, Image, Row } from "antd";
import React from "react";

const InformationShop = ({ shopInfor }) => {
  return (
    <div className="mt-2">
      <Row gutter={[10, 10]} justify={"space-between"}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={6}
          xl={6}
          className="flex items-center w-full justify-center"
        >
          <Image
            alt="'Chưa có avatar'"
            src={`${API}/${shopInfor.avatarShop}`}
            className="rounded-full min-w-44 "
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={18} xl={18}>
          <Row className="font-bold text-2xl py-1" gutter={[10, 0]}>
            <Col xs={24} sm={6}>
              <p>Tên shop:</p>
            </Col>
            <Col xs={24} sm={18}>
              <p>{shopInfor.nameShop}</p>
            </Col>
          </Row>
          <Row className="py-1" gutter={[10, 0]}>
            <Col xs={24} sm={6}>
              <p>Số điện thoại:</p>
            </Col>
            <Col xs={24} sm={18}>
              <p>0{shopInfor.phoneNumberShop}</p>
            </Col>
          </Row>
          <Row className="py-1" gutter={[10, 0]}>
            <Col xs={24} sm={6}>
              <p>Địa chỉ:</p>
            </Col>
            <Col xs={24} sm={18}>
              <p>{shopInfor.address}</p>
            </Col>
          </Row>
          <Row className="py-1" gutter={[10, 0]}>
            <Col xs={24} sm={6}>
              <p>Mô tả về shop:</p>
            </Col>
            <Col xs={24} sm={18}>
              <p>{shopInfor.des}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default InformationShop;

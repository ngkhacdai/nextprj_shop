import { API } from "@/api/url";
import { Col, Image, Row } from "antd";
import React from "react";

const InformationShop = ({ shopInfor }) => {
  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
      <Row gutter={[20, 20]} justify="space-between">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          className="flex items-center justify-center"
        >
          <Image
            alt="Chưa có avatar"
            src={`${API}/${shopInfor.avatarShop}`}
            className="w-full h-auto rounded-lg"
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Row className="py-2" justify="start" gutter={[10, 0]}>
            <Col span={24}>
              <p className="text-lg font-serif text-gray-600">Tên shop:</p>
            </Col>
            <Col span={24}>
              <p className="font-extrabold text-3xl text-gray-900 break-words">
                {shopInfor.nameShop}
              </p>
            </Col>
          </Row>
          <Row className="py-2" gutter={[10, 0]}>
            <Col span={24}>
              <p className="text-lg font-serif text-gray-600 break-words">
                Số điện thoại:
              </p>
            </Col>
            <Col
              className="font-bold text-2xl text-gray-900 break-words"
              span={24}
            >
              <p>0{shopInfor.phoneNumberShop}</p>
            </Col>
          </Row>
          <Row className="py-2" gutter={[10, 0]}>
            <Col span={24}>
              <p className="text-lg font-serif text-gray-600 break-words">
                Địa chỉ:
              </p>
            </Col>
            <Col
              className="font-bold text-2xl text-gray-900 break-words"
              span={24}
            >
              <p>{shopInfor.address}</p>
            </Col>
          </Row>
          <Row className="py-2" gutter={[10, 0]}>
            <Col span={24}>
              <p className="text-lg font-serif text-gray-600 break-words">
                Mô tả về shop:
              </p>
            </Col>
            <Col
              className="font-bold text-xl text-gray-900 break-words"
              span={24}
            >
              <p>{shopInfor.des}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default InformationShop;

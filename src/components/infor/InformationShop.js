import { URL } from "@/api/url";
import { Col, Image, Row } from "antd";
import React from "react";

const InformationShop = ({ shopInfor }) => {
  return (
    <div className="">
      {!shopInfor ? (
        <p>Chưa có thông tin shop</p>
      ) : (
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
              src={`${URL}/${shopInfor?.avatarShop}`}
              className="w-full h-auto rounded-lg"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Row className="py-2" justify="start" gutter={[10, 0]}>
              <Col span={24}>
                <p className="text-lg font-mono text-gray-600">Tên shop:</p>
              </Col>
              <Col span={24}>
                <p className="font-semibold text-3xl text-gray-900 break-words">
                  {shopInfor?.nameShop}
                </p>
              </Col>
            </Row>
            <Row className="py-2" gutter={[10, 0]}>
              <Col span={24}>
                <p className="text-lg font-mono text-gray-600 break-words">
                  Số điện thoại:
                </p>
              </Col>
              <Col
                className="font-semibold text-2xl text-gray-900 break-words"
                span={24}
              >
                <p>0{shopInfor?.phoneNumberShop}</p>
              </Col>
            </Row>
            <Row className="py-2" gutter={[10, 0]}>
              <Col span={24}>
                <p className="text-lg font-mono text-gray-600 break-words">
                  Địa chỉ:
                </p>
              </Col>
              <Col
                className="font-semibold text-2xl text-gray-900 break-words"
                span={24}
              >
                <p>{shopInfor?.address}</p>
              </Col>
            </Row>
            <Row className="py-2" gutter={[10, 0]}>
              <Col span={24}>
                <p className="text-lg font-mono text-gray-600 break-words">
                  Mô tả về shop:
                </p>
              </Col>
              <Col
                className="font-semibold text-xl text-gray-900 break-words"
                span={24}
              >
                <p className="whitespace-pre-wrap">{shopInfor?.des}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default InformationShop;

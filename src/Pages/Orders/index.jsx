import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DatePicker, Select, Pagination, Skeleton } from "antd";
import { Container, Row, Col, Table } from "react-bootstrap";
import {
  ArrowLeftOutlined,
  RightOutlined,
  CloseCircleTwoTone,
  EllipsisOutlined,
  MinusCircleTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";

// import { getAllOrders } from "../../services";
import { formatAmount } from "../../utils/helpers";
import moment from "moment";
import "./index.scss";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useGetUser } from "../../hooks/getUserHook";
import { useGetOrderQuery } from "../../services/api";
import BackArrowBox from "../../components/BackArrowBox";
import EmptyResponse from "../../components/EmptyResponse";

export const Orders = () => {
  const [loading, setLoading] = useState(false);

  const [status] = useState({
    "pending payment": (
      <MinusCircleTwoTone twoToneColor="#1BC91B" className="ml-3" />
    ),
    "pending confirmation": (
      <MinusCircleTwoTone twoToneColor="#1BC91B" className="ml-3" />
    ),
    success: <CheckCircleTwoTone twoToneColor="#1BC91B" className="ml-3" />,
    failed: <CloseCircleTwoTone twoToneColor="#1BC91B" className="ml-3" />,
    all: "",
  });
  const [page, setPage] = useState(1);
  const [activeStatus, setActiveStatus] = useState(null);
  const { user } = useGetUser();
  const {
    data: orders = null,
    isLoading,
    isError,
    error,
  } = useGetOrderQuery({ page: page });
  console.log(orders, "orders");
  const navigate = useNavigate();
  //   const {
  //     state: { currentUser },
  //   } = useAuth();
  //   useEffect(() => {
  //     const getD = async () => {
  //       setLoading(true);
  //       try {
  //         const data = await getAllOrders({
  //           page,
  //         });
  //         setOrders(data.data);
  //       } catch (error) {
  //         setOrders(null);
  //         openNotification({
  //           type: "error",
  //           title: "Payment",
  //           message: error.message,
  //         });
  //       }
  //       setLoading(false);
  //     };
  //     getD();
  //     return () => {
  //       setLoading(false);
  //     };
  //   }, [activeStatus, currentUser?.id, page]);

  return (
    <>
      <Navbar bg={true} />
      <Container id="orders">
        <BackArrowBox>
          <p className="page_link">
            Home {">"} <span>Cart</span>
          </p>
        </BackArrowBox>

        <Row>
          <Col sm={6}>
            <h3 className="mt-5 font-weight-bold">My Order List</h3>
            <span className="h-divider-primary d-inline-block"></span>
          </Col>
          {/* <Col
            sm={6}
            className="d-flex align-items-center justify-content-between flex-wrap"
          >
            <div className="my-3">
              <label className="mr-4 font-weight-bold">From</label>
              <DatePicker
                picker="month"
                size="large"
                placeholder="Choose Month"
              />
            </div>
            <div className="my-3">
              <label className="mr-4 font-weight-bold">To</label>
              <DatePicker
                picker="month"
                size="large"
                placeholder="Choose Month"
              />
            </div>
            <div className="my-3">
              <Select
                onChange={(f) => setActiveStatus(f)}
                placeholder="- - - - Sort By - - - -"
              >
                {Object.keys(status).map((el, i) =>
                  el === "all" ? (
                    <Select.Option key={el + i}>{el}</Select.Option>
                  ) : (
                    <Select.Option key={el + i}>{el}</Select.Option>
                  )
                )}
              </Select>
            </div>
          </Col> */}
        </Row>

        <Row>
          <Col>
            {isError ? (
              <EmptyResponse message={"Something went wrong"} />
            ) : isLoading ? (
              <Skeleton />
            ) : (
              <div className="over_flow_table">
                {orders && !orders?.data?.rows.length ? (
                  <EmptyResponse message={"No Orders yet"} />
                ) : (
                  <Table hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Orders</th>
                        <th>Delivery Status</th>
                        <th>Delivered to</th>
                        <th>Delivery Address</th>
                        <th>Amount</th>
                        <th>Payment Status</th>
                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.data?.rows?.map((order) => (
                        <tr
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigate(`/order/${order.id}`);
                          }}
                          key={order.id}
                        >
                          <td>{moment(order.createdAt).format("L")}</td>
                          <td>{order?.numOfItems}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              {" "}
                              {order.status.toLowerCase()}
                              {status[order.status.toLowerCase()]}
                            </div>

                            {/* <CheckCircleTwoTone
														twoToneColor='#1BC91B'
														className='ml-3'
													/> */}
                          </td>
                          <td>{order?.name}</td>
                          <td>{order?.address}</td>
                          <td>₦{formatAmount(order?.totalAmount)}</td>
                          <td>{order?.paymentStatus}</td>
                          {/* <td>
                          <button className="btn">
                            <EllipsisOutlined />
                          </button>
                        </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
            )}
            {orders && (
              <Pagination
                total={orders?.data?.total}
                onShowSizeChange={(k) => setPage(k)}
                current={page}
                responsive
                onChange={(k) => setPage(k)}
              />
            )}
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

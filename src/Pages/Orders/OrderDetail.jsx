import React, { useHistory } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import BackArrowBox from "../../components/BackArrowBox";
import EmptyResponse from "../../components/EmptyResponse";
import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import { useGetSingleOrderQuery } from "../../services/api";

export const OrderDetail = () => {
  const { orderId } = useParams();
  const {
    data: order = null,
    isLoading,
    isError,
    error,
  } = useGetSingleOrderQuery(orderId);
  console.log(order, "order");

  if (isLoading) {
    return <Loading full />;
  }
  if (isError) {
    return <EmptyResponse message={error} full />;
  }

  return (
    <>
      <Navbar bg={true} />
      <Container style={{ marginTop: "180px", paddingBottom: "40px" }}>
        <BackArrowBox>
          <p className="page_link">
            Order {">"} <span>Order Details</span>
          </p>
        </BackArrowBox>
        <br />
        {order && (
          <>
            <div className="row justify-content-between">
              <div className="col-sm-6">
                <h5 className="font-weight-bold">Order Details</h5>
              </div>
              <div className="col-sm-6 text-right ">
                {/* <Button width="120px">Cancel Order</Button> */}
              </div>
            </div>
            <div className="row">
              <div className="col-md-5">
                <div className="p-2 mt-3 shadow-sm bg-white  py-3 px-3">
                  <h6 className="font-weight-bold">Customer details</h6>
                  <div className="row mb-3 text-md-left text-center align-items-center ">
                    <div className="col-md-6">
                      <p className="small mb-2 mt-3">Customer Name</p>
                      <h6 className="font-weight-bold">
                        {order.data.order.name}
                      </h6>
                    </div>
                    <div className="col-md-6">
                      <p className="small mb-2 mt-3">Customer Contact</p>
                      <h6 className="font-weight-bold">
                        {order.data.order.phone_number}
                      </h6>
                    </div>
                    <div className="col-md-6">
                      <p className="small mb-2 mt-3">Customer Address</p>
                      <h6 className="font-weight-bold">
                        {order.data.order.address}
                      </h6>
                    </div>
                    <div className="col-md-6">
                      <p className="small mb-2 mt-3">Customer Email</p>
                      <h6 className="font-weight-bold">
                        {order.data.order.email}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="p-2 mt-3 shadow-sm bg-white  py-3 px-3">
                  <h6 className="font-weight-bold">Order details</h6>
                  <div className="row mb-3 text-md-left text-center align-items-center ">
                    <div className="col-md-6">
                      <p className="small mb-2 mt-3">Number Of Items</p>
                      <h6 className="font-weight-bold">
                        {" "}
                        {order.data.order.numOfItems}
                      </h6>
                    </div>
                    <div className="col-md-6">
                      <p className="small mb-2 mt-3">Meal Status.</p>
                      <h6 className="font-weight-bold">
                        {" "}
                        {order.data.order.status}
                      </h6>
                    </div>

                    <div className="col-md-6">
                      <p className="small mb-2 mt-3">Tracking Number</p>
                      <h6 className="font-weight-bold">
                        {order.data.order.trackingNumber}
                      </h6>
                    </div>
                    <div className="col-md-6">
                      <p className="small mb-2 mt-3">Payment Status</p>
                      <h6 className="font-weight-bold">
                        {" "}
                        {order.data.order.paymentStatus}
                      </h6>
                    </div>
                  </div>
                </div>
                {/* <div className="p-2 mt-3 shadow-sm bg-white  py-3 px-3">
                  <h6 className="font-weight-bold">Delivery details</h6>
                  <div className="row mb-3 text-md-left text-center align-items-center ">
                    <div className="col-md-6">
                      <p className="small mb-2 mt-3">Tracking Number</p>
                      <h6 className="font-weight-bold">
                        {order.data.order.trackingNumber}
                      </h6>
                    </div>
                    <div className="col-md-6">
                      <p className="small mb-2 mt-3">Delivery Contact</p>
                      <h6 className="font-weight-bold">+2347032931497</h6>
                    </div>
                    <div className="col-md-6">
                      <p className="small mb-2 mt-3">Delivery time</p>
                      <h6 className="font-weight-bold">30 mins - 60 mins</h6>
                    </div>
                    <div className="col-md-6">
                      <p className="small mb-2 mt-3">Delivery Email</p>
                      <h6 className="font-weight-bold">davisamadi@gmail.com</h6>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="col-md-7 p-3">
                {order.data.order.items &&
                  order.data.order.items.map((item) => {
                    return (
                      <div className="row mb-3">
                        <div className="col-3">
                          <img
                            src={`${item.meal.images[0]}`}
                            alt="food"
                            border="0"
                            className="img-fluid rounded-3"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div className="col-6">
                          <h6 className="font-weight-bold">
                            {item.meal.name} (X{item.quantity})
                          </h6>
                          <p className="small">{item.meal.description}</p>
                        </div>
                        <div className="col-2">
                          <h6 className="font-weight-bold">
                            N{item.meal.price}
                          </h6>
                        </div>
                      </div>
                    );
                  })}

                <div className="border-top border-bottom">
                  <div className="d-flex justify-content-between mt-3">
                    <p>Price</p>
                    <p className="font-weight-bold">
                      N {order.data.order.subTotalAmount}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>VAT</p>
                    <p className="font-weight-bold">
                      N {order.data.order.vatFee}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <p>Total</p>
                    <p className="font-weight-bold">
                      N{order.data.order.totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Container>{" "}
    </>
  );
};

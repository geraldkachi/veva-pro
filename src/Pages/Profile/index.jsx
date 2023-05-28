import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Button, FormLabel } from "react-bootstrap";
import { Input, Form } from "antd";
import { useDispatch } from "react-redux";
import CreateIcon from "@mui/icons-material/Create";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import "./index.scss";
import { openNotification } from "../../utils/helpers";
import { useGetUser } from "../../hooks/getUserHook";
import {
  useImageUploadMutation,
  usePasswordUpdateEmailQuery,
  usePasswordUpdateMutation,
  usePictureUpdateMutation,
  useProfileUpdateMutation,
} from "../../services/api";
import { IconButton } from "@mui/material";
import BackArrowBox from "../../components/BackArrowBox";
import { updateUserDetails } from "../../store/slice/AuthSlice";
import { getBase64 } from "../../utils/utils";

const MInput = ({ ...props }) => {
  const [disable, setDisable] = useState(true);
  const toggleDisable = () => {
    setDisable(!disable);
  };
  return (
    <div className="input-wrapper">
      <Input
        disabled={disable}
        {...props}
        className="w-100 border-0 font-weight-bold py-3"
        suffix={
          //   <FontAwesomeIcon
          //     icon={faPen}
          //     onClick={toggleDisable}
          //     className="text-smaller h-100 va-text-secondary"
          //     style={{ cursor: "pointer" }}
          //   />

          <IconButton onClick={toggleDisable} aria-label="delete">
            <CreateIcon />
          </IconButton>
        }
      />
    </div>
  );
};

export const Profile = () => {
  const [changePassword, setChangePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [security, setSecurity] = useState(false);
  const [skip, setSkip] = useState(true);
  const [mail, setMail] = useState("");
  const isLoading = false;
  const { user } = useGetUser();
  const [imageUploaded, setImageUploaded] = useState("");
  const [files, setFiles] = useState(null);
  const [file, setFile] = useState(null);
  const [val, setVal] = useState(null);
  const {
    data = null,
    isLoading: passLoad,
    isError: passIsError,
    error: passError,
  } = usePasswordUpdateEmailQuery({ email: mail }, { skip });
  useEffect(() => {
    if (data) {
      setSkip(true);
    }
  }, [data]);
  const [profileChange, { isLoading: loadProfile }] =
    useProfileUpdateMutation();
  const [passChange, { isLoading: loadPass }] = usePasswordUpdateMutation();
  const [uploadImage, { isLoading: loadImage }] = useImageUploadMutation();
  const [picChange, { isLoading: loadPic }] = usePictureUpdateMutation();
  const dispatch = useDispatch();
  const updateProfile = async (id, val) => {
    let payload;
    if (imageUploaded) {
      payload = {
        ...val,
        image: imageUploaded,
      };
    } else {
      payload = {
        ...val,
      };
    }

    try {
      const response = await profileChange({
        credentials: payload,
        id: id,
      }).unwrap();

      console.log(response);
      dispatch(updateUserDetails({ user: response.user }));
      openNotification({
        type: "success",
        title: "Update",
        message: `Update successful`,
      });
    } catch (err) {
      if (err.status === "FETCH_ERROR") {
        openNotification({
          type: "error",
          title: "Error",
          message: "an error occured",
        });
      } else {
        openNotification({
          type: "error",
          title: "Error",
          message: err.data.message,
        });
      }
    }
  };
  const uploadPicture = async (id, val) => {
    try {
      const response = await picChange({ credentials: val, id }).unwrap();
      openNotification({
        type: "success",
        title: "Update",
        message: `Update successful`,
      });
    } catch (err) {
      if (err.status === "FETCH_ERROR") {
        openNotification({
          type: "error",
          title: "Error",
          message: "an error occured",
        });
      } else {
        openNotification({
          type: "error",
          title: "Error",
          message: err.data.message,
        });
      }
    }
  };
  const resetPassword = async (id, val) => {
    try {
      // call login trigger from rtk query
      const response = await passChange(val).unwrap();
      // set user details and token in the state
      console.log(response);
      openNotification({
        type: "success",
        title: "Update",
        message: `Update successful`,
      });
    } catch (err) {
      if (err.status === "FETCH_ERROR") {
        openNotification({
          type: "error",
          title: "Error",
          message: "an error occured",
        });
      } else {
        openNotification({
          type: "error",
          title: "Error",
          message: err.data.message,
        });
      }
    }
  };

  const toggleChangePassword = () => {
    setChangePassword(!changePassword);
  };

  const handleProfileUpdate = (values) => {
    console.log(values, "values");
    updateProfile(user.id, values);
  };

  const handleChangeProfilePicture = async (e) => {
    // const file = Array.from(e.target.files)[0];
    // const formData = new FormData();
    // const types = ["image/png", "image/jpeg"];

    // if (types.every((type) => file.type !== type)) {
    //   openNotification({
    //     title: "Profile Picture",
    //     message: `'${file.type}' is not a supported format`,
    //     type: "error",
    //   });
    // } else {
    //   formData.append("image", file);
    //   uploadPicture(user.id, formData);
    // }

    const { files } = e.target;
    //console.log(files[0])
    setFiles(URL.createObjectURL(files[0]));
    setFile(files[0]);

    const mealImage = await getBase64(files[0]);
    const payload = {
      folder: "users",
      image: mealImage,
    };
    const res = await uploadImage(payload);
    console.log(res, "rest");
    setImageUploaded(res.data.url);
  };

  const handleChangePassword = (values) => {
    resetPassword(values);
  };

  const handleRequestPasswordReset = async ({ email }) => {
    console.log(email);
    setLoading(true);
    setMail(email);
    setSkip(false);
    // try {
    //   const data = await requestPasswordReset(email);
    //   openNotification({
    //     title: "Password Reset",
    //     message: data.message,
    //     type: "info",
    //   });
    //   console.log(data);
    //   toggleChangePassword();
    // } catch (error) {
    //   openNotification({
    //     title: "Password Reset",
    //     message: error.message,
    //     type: "info",
    //   });
    //   console.log(error);
    // }
    setLoading(false);
  };

  if (!user) {
    return <Loading full />;
  }

  return (
    <Fragment>
      <NavBar bg={true} />
      <Container id="profile">
        <BackArrowBox>
          <p className="page_link">
            Home {">"} <span>My Profile</span>
          </p>
        </BackArrowBox>

        <Row>
          <Col>
            <h3 style={{ fontWeight: "600" }} className="mt-4 font-weight-bold">
              My Profile
            </h3>
            <p
              className="mb-0 w-100 va-text-secondary my-5"
              style={{ maxWidth: "750px" }}
            >
              View and edit profile details
            </p>
          </Col>
        </Row>

        <Row>
          <Col className="mt-2">
            <Button
              className={
                "va-text-secondary changeBtn personal-security mr-2 " +
                (!security ? " active" : "")
              }
              style={{
                marginRight: "10px",
              }}
              onClick={() => {
                setChangePassword(false);
                setSecurity(false);
              }}
            >
              Personal Information
            </Button>
            <Button
              className={
                "va-text-secondary personal-security changeBtn ml-4" +
                (security ? " active" : "")
              }
              onClick={() => setSecurity(true)}
            >
              Security
            </Button>
          </Col>
        </Row>

        <Row>
          {/* Security */}
          {security ? (
            <Col md={6} style={{ paddingTop: "10rem" }}>
              {/* One Password */}
              {!changePassword ? (
                <Form onFinish={handleRequestPasswordReset}>
                  <div className="w-100 d-flex align-items-center">
                    <div className="w-60">
                      <FormLabel
                        htmlFor="email"
                        className="font-weight-bold w-100"
                      >
                        Email
                      </FormLabel>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            type: "email",
                          },
                        ]}
                      >
                        <div className="password-wrapper">
                          <Input
                            className="w-100 border-0 py-3"
                            placeholder="Enter your email address"
                          />
                        </div>
                      </Form.Item>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        width: "150px",
                        marginLeft: "10px",
                        fontSize: "14px",
                      }}
                      className="btn ml-4 va-text-underline "
                    >
                      {loading ? "Loading..." : "Change Password"}
                    </button>
                  </div>
                </Form>
              ) : (
                <Form onFinish={handleChangePassword}>
                  {/* Change Password */}
                  <div className="w-45">
                    <FormLabel htmlFor="otp" className="font-weight-bold w-100">
                      OTP
                    </FormLabel>
                    <Form.Item
                      name="otp"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the OTP sent to you",
                        },
                      ]}
                    >
                      <div className="password-wrapper">
                        <Input
                          name="otp"
                          className="w-100 border-0 py-3"
                          placeholder="OTP code"
                        />
                      </div>
                    </Form.Item>
                  </div>
                  <div className="d-flex mt-5">
                    <div className="w-45">
                      <FormLabel
                        htmlFor="password"
                        className="font-weight-bold w-100"
                      >
                        New Password
                      </FormLabel>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your new password!",
                          },
                          {
                            pattern:
                              /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\d).{8,}$/,
                            message:
                              "Password must be at least 8 characters, and contain at least 1 letter and 1 number",
                          },
                        ]}
                      >
                        <div className="password-wrapper">
                          <Input.Password
                            name="password"
                            className="w-100 border-0 py-3"
                            placeholder="New Password"
                          />
                        </div>
                      </Form.Item>
                    </div>
                    <div className="w-45 ml-auto">
                      <FormLabel
                        htmlFor="confirmPassword"
                        className="font-weight-bold w-100"
                      >
                        Confirm Password
                      </FormLabel>
                      <Form.Item
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your password!",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error(
                                  "The passwords that you entered do not match!"
                                )
                              );
                            },
                          }),
                        ]}
                      >
                        <div className="password-wrapper">
                          <Input.Password
                            name="confirmPassword"
                            className="w-100 border-0 py-3"
                            placeholder="Confirm Password"
                          />
                        </div>
                      </Form.Item>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn va-bg-primary text-small font-weight-bold py-4 px-5"
                    style={{ marginTop: "5rem" }}
                  >
                    {!isLoading ? "Save Changes" : "Saving..."}
                  </button>
                </Form>
              )}
            </Col>
          ) : (
            <Col style={{ paddingTop: "10rem" }}>
              {/* Personal Information */}
              <Row>
                <Col md={2} className="d-flex justify-content-center">
                  <div
                    className="avatar position-relative"
                    style={{
                      backgroundImage: `url(${
                        files
                          ? files
                          : user?.image ||
                            `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&font-size=0.20&background=808080&color=fff`
                      })`,
                      opacity: isLoading ? 0.5 : 1,
                    }}
                  >
                    <button
                      // type='submit'
                      className="btn edit-avatar"
                      onClick={() =>
                        document.getElementsByName("avatar")[0].click()
                      }
                    >
                      {/* <FontAwesomeIcon icon={faPen} /> */}
                      <CreateIcon />
                    </button>
                    <input
                      onChange={handleChangeProfilePicture}
                      type="file"
                      name="avatar"
                      accept="image/*"
                      hidden
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <Form onFinish={handleProfileUpdate} initialValues={user}>
                    <Row>
                      <Col md={6} className="my-3">
                        <FormLabel htmlFor="firstName" className="w-100">
                          First name
                        </FormLabel>
                        <Form.Item name="firstName" rules={[]}>
                          <MInput type="text" name="firstName" id="firstName" />
                        </Form.Item>
                      </Col>
                      <Col md={6} className="my-3">
                        <FormLabel htmlFor="lastName" className="w-100">
                          Last name
                        </FormLabel>
                        <Form.Item name="lastName" rules={[]}>
                          <MInput type="text" name="lastName" id="lastName" />
                        </Form.Item>
                      </Col>

                      <Col md={6} className="my-3">
                        <FormLabel htmlFor="phone" className="w-100">
                          Phone Number
                        </FormLabel>
                        <Form.Item name="phone" rules={[]}>
                          <MInput type="text" name="phone" id="phone" />
                        </Form.Item>
                      </Col>

                      <Col md={6} className="my-3">
                        <FormLabel htmlFor="email" className="w-100">
                          Email
                        </FormLabel>
                        <Form.Item
                          name="email"
                          rules={[
                            {
                              type: "email",
                              message: "The email is not valid E-mail!",
                            },
                          ]}
                        >
                          <MInput type="text" name="email" id="email" />
                        </Form.Item>
                      </Col>

                      <Col md={6} className="my-3">
                        <FormLabel htmlFor="password" className="w-100">
                          Birthday
                        </FormLabel>
                        <Form.Item name="birthday" rules={[]}>
                          <MInput type="date" name="birthday" id="birthday" />
                        </Form.Item>
                      </Col>
                      <Col md={12} className="my-3 ">
                        <button
                          type="submit"
                          disabled={loadImage}
                          className="btn va-bg-primary text-small font-weight-bold py-2 px-5"
                          style={{
                            marginTop: "5rem",
                          }}
                        >
                          {!isLoading ? "Save Changes" : "Saving..."}
                        </button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
};

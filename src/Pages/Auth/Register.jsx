import React, { useState, useEffect } from "react";
import Logo from "Assets/logo.svg";
import Api from "Api.js";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Select, message, } from "antd";
import VisibilityIcon from "Assets/icons/visibility.svg";
import InVisibilityIcon from "Assets/icons/invisibility.svg";
import { useUserContext } from "../../Context/UserContext";
function Register(props) {
  const { login: signin, getUser } = useUserContext();
  const history = new useHistory();
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form] = Form.useForm();
  const { Option } = Select;
  function RegisterUser(values) {

    Api.post("/register", values)

      .then((response) => {
        setRefresh(!refresh);
        // history.push("/");
        setSuccess(' "Your password has been sent you by email. please check and login"');
        signin(response.data);
        form.resetFields();
        message.info(
          "Your password has been sent you by email. please check and login"
        );
      })
      .catch((error) => {
        message.info(error.response.data.errors.email);
        setError(error.response.data.errors);
      });
  }

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-register-container">
          {
            // logo
          }
          <img className="logo-img" src={Logo} alt="Logo" />

          <h1>Sign up</h1>
          <p>Please enter your email & password to continue</p>
            {error.email?<span className="text text-danger">{error.email}</span> :''}
            {success?<span className="text text-success">{success}</span> :''}
          <Form form={form} layout="vertical" onFinish={RegisterUser}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
              required
              label="Name"
              name="name"
            >
              <Input className="primary-input" placeholder="Enter Name " />
            </Form.Item>

            <Form.Item
               rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            required label="Email or User Name" name="email">
              <Input className="primary-input" placeholder="Enter email " />
            </Form.Item>
            <Form.Item 
               rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            label="Password" name="password">
              <Input.Password
                className="primary-input"
                placeholder="Enter password"
                iconRender={(visible) =>
                  visible ? (
                    <img src={VisibilityIcon} alt="" />
                  ) : (
                    <img src={InVisibilityIcon} alt="" />
                  )
                }
              />
            </Form.Item>

            <div>
              <Form.Item 
              
              rules={[
                {
                  required: true,
                  message: "Please input your role!",
                },
              ]}
              label="Enter your Role" name="role">
                <Select
                  required
                  className="primary-select"
                  placeholder="select one"
                >
                  <Option value="1">User</Option>
                  <Option value="2">Admin</Option>
                </Select>
              </Form.Item>
            </div>
            <Button className="primary-button" htmlType="submit">
              Register
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Register;

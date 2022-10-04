import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Index.jsx";
import Api from "Api.js";
import axios from "axios";
import { Card, Button, Modal, Form, Input, message } from "antd";
import { useUserContext } from "../../Context/UserContext";

function Category(props) {
  const { login: signin, getUser } = useUserContext();
  const [refresh, setRefresh] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [response, setResponse] = useState();
  useEffect(() => {
    Api.get("/category").then((res) => {
      setData(res.data);
    });
  }, [refresh]);

  function handleNew(values) {
    setModal(false);

    Api.post("/category", values)

      .then((response) => {
        message.success("category added successfully");
        setRefresh(!refresh);

        setResponse(response.data);
      })
      .catch((error) => {});
  }

  function handleEdit(id) {
    setLoading(true);
    Api.get("/category/" + id)

      .then((response) => {
        setLoading(false);

        setEditData(response.data);
      })
      .catch((error) => {
        setLoading(false);
      });

    setEditModal(true);
  }

  function deletedata(id) {
    Api.delete("/category/" + id)

      .then((response) => {
        message.success("category deleted successfully");
        setRefresh(!refresh);
      })
      .catch((error) => {});
  }

  function updateData(values, id) {
    setEditModal(false);

    Api.put("/category/" + id, values)

      .then((response) => {
        message.success("category edited successfully");
        setRefresh(!refresh);
        setResponse(response.data);
      })
      .catch((error) => {});
  }

  function handleChange(event) {
    setEditData(event.target.value);
  }
  const { Meta } = Card;
  return (
    <div>
      <Layout title="category" currentPage="1">
        <div className="main-wrapper">
          <div style={{ marginBottom: "50px" }}>
            {getUser().role == "admin" && (
              <Button
                className="btn-create-new"
                style={{ background: "#186bb1", color: "white" }}
                onClick={() => setModal(true)}
              >
                create new
              </Button>
            )}
          </div>

          <div className="cards-wrapper d-flex  flex-wrap">
            {data.map((brand) => (
              <Card
                hoverable
                style={{ width: 240, marginRight: "50px", marginTop: "50px" }}
                cover={
                  <img
                    alt="example"
                    src="https://cdn.pixabay.com/photo/2013/07/13/13/22/car-160895_960_720.png"
                  />
                }
              >
                <Meta title={brand.name} description="www.instagram.com" />

                {getUser().role == "admin" && (
                  <div
                    className="d-flex float-end"
                    style={{ marginTop: "20px" }}
                  >
                    <Button
                      style={{ background: "red", color: "white" }}
                      onClick={() => deletedata(brand.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      style={{ background: "#186bb1", color: "white" }}
                      onClick={() => handleEdit(brand.id)}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        <Modal
          title="create new Category"
          closable={true}
          footer={false}
          maskClosable={true}
          visible={modal}
        >
          <p>Enter category Name</p>

          <Form layout="vertical" onFinish={handleNew}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "field required!",
                },
              ]}
              label="Name"
              name="name"
            >
              <Input
                className="primary-input"
                required
                placeholder="Enter Name "
              />
            </Form.Item>

            <div className="d-flex">
              <Button
                className="primary-button"
                htmlType="submit"
                onClick={handleNew}
              >
                Create
              </Button>
              <Button
                className="primary-button"
                style={{
                  marginLeft: "10px",
                  background: "white",
                  color: "black",
                }}
                onClick={() => setModal(false)}
              >
                Close
              </Button>
            </div>
          </Form>
        </Modal>

        <Modal
          title="Edit"
          closable={true}
          footer={false}
          maskClosable={true}
          visible={editModal}
        >
          <p>Edit category Name</p>
          {editData.name && editData.name.length > 0 && (
            <Form
              layout="vertical"
              onFinish={(values) => {
                updateData(values, editData.id);
              }}
              initialValues={editData}
            >
              <Form.Item label="Name" name="name">
                <Input className="primary-input" placeholder="Enter Name " />
              </Form.Item>

              <div className="d-flex">
                <Button htmlType="submit" className="primary-button">
                  Update
                </Button>
                <Button
                  className="primary-button"
                  style={{
                    marginLeft: "10px",
                    background: "white",
                    color: "black",
                  }}
                  onClick={() => setEditModal(false)}
                >
                  Close
                </Button>
              </div>
            </Form>
          )}
        </Modal>
      </Layout>
    </div>
  );
}

export default Category;

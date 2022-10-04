import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Index.jsx";
import Api from "Api.js";
import axios from "axios";
import { Card, Button, Modal, Form, Input, message, Select } from "antd";
import Brand from "./Brand.jsx";
import { useUserContext } from "../../Context/UserContext";

function Product(props) {
  const { login: signin, getUser } = useUserContext();
  const [uploadFile, setUploadFile] = React.useState();
  const [uploadFile2, setUploadFile2] = React.useState();

  const [refresh, setRefresh] = useState(false);
  const [editData, setEditData] = useState();
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [data, setData] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [response, setResponse] = useState();
  const { Meta } = Card;
  const { Option } = Select;
  const [modal, setModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    Api.get("/products").then((res) => {
      setData(res.data);
    });

    Api.get("/brands").then((res) => {
      setBrands(res.data);
    });
    Api.get("/category").then((res) => {
      setCategories(res.data);
    });
  }, [refresh]);

  function handleEdit(id) {
    setLoading(true);
    Api.get("/products/" + id)

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
    Api.delete("/products" + id)
      .then((response) => {
        message.success("products deleted successfully");
        setRefresh(!refresh);
      })
      .catch((error) => {});
  }

  function updateData(values, id) {
    setEditModal(false);

    const formData = new FormData();
    formData.append("image", uploadFile2);
    formData.append("brand_id", values.brand_id);
    formData.append("category_id", values.category_id);
    formData.append("name", values.name);
    formData.append("price", values.price);

    Api.post("/product/update/" + id, formData)
      .then((response) => {
        message.success("brand edited successfully");
        setRefresh(!refresh);
        // setResponse(response.data);
      })
      .catch((error) => {});
  }

  function handleNew(values) {
    const formData = new FormData();

    formData.append("image", uploadFile);
    formData.append("brand_id", values.brand_id);
    formData.append("category_id", values.category_id);
    formData.append("name", values.name);
    formData.append("price", values.price);

    setModal(false);

    Api.post("/products", formData)

      .then((response) => {
        message.success("car added successfully");
        setRefresh(!refresh);

        setResponse(response.data);
      })
      .catch((error) => {});
  }

  return (
    <Layout title="Products" currentPage={3}>
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

        <div className="cards-wrapper d-flex flex-wrap">
          {data.map((brand) => (
            <Card
              hoverable
              style={{ width: 240, marginRight: "50px", marginTop: "50px" }}
              cover={<img alt="example" src={brand.image} />}
            >
              <Meta title="color" description={brand?.name} />
              <Meta title="model" description={brand?.price} />
              <Meta title="Category" description={brand?.category.name} />
              <Meta title="brand" description={brand?.brand.name} />

              {getUser().role == "admin" && (
                <div className="d-flex float-end" style={{ marginTop: "20px" }}>
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
        title="create new Brand"
        closable={true}
        footer={false}
        maskClosable={true}
        visible={modal}
      >
        <p>Enter product Details</p>

        <Form layout="vertical" onFinish={handleNew}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "field required!",
              },
            ]}
            label="Color"
            name="name"
          >
            <Input
              className="primary-input"
              required
              placeholder="Enter a color "
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "field required!",
              },
            ]}
            label="Model"
            name="price"
          >
            <Input
              className="primary-input"
              required
              placeholder="Enter a model "
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "field required!",
              },
            ]}
            label="category"
            name="category_id"
          >
            <Select
              style={{ width: "269px", height: "48px" }}
              placeholder="select one"
            >
              {categories.map((category) => (
                <Option value={category.id}>{category.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "field required!",
              },
            ]}
            label="Brand"
            name="brand_id"
          >
            <Select
              style={{ width: "269px", height: "48px" }}
              placeholder="select one"
            >
              {brands.map((brand) => (
                <>
                  <Option value={brand?.id}>{brand?.name}</Option>
                </>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="image" name="image">
            <Input
              rules={[
                {
                  required: true,
                  message: "field required!",
                },
              ]}
              type="file"
              required
              className="primary-input"
              onChange={(e) => setUploadFile(e.target.files[0])}
            ></Input>
          </Form.Item>

          <div className="d-flex">
            <Button className="primary-button" htmlType="submit">
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

      {editData && (
        <Modal
          title="Edit"
          closable={true}
          footer={false}
          maskClosable={true}
          visible={editModal}
        >
          <p>Edit Brand Name</p>

          <Form
            layout="vertical"
            onFinish={(values) => {
              updateData(values, editData.id);
            }}
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "field required!",
                },
              ]}
              initialValue={editData.name}
              label="Name"
              name="name"
            >
              <Input
                className="primary-input"
                required
                placeholder="Enter Name "
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "field required!",
                },
              ]}
              initialValue={editData.price}
              label="Price"
              name="price"
            >
              <Input
                className="primary-input"
                required
                placeholder="Enter price "
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "field required!",
                },
              ]}
              initialValue={editData.category_id}
              label="category"
              name="category_id"
            >
              <Select
                style={{ width: "269px", height: "48px" }}
                placeholder="select one"
              >
                {categories.map((category) => (
                  <Option value={category.id}>{category.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "field required!",
                },
              ]}
              initialValue={editData.brand_id}
              label="Brand"
              name="brand_id"
            >
              <Select
                style={{ width: "269px", height: "48px" }}
                placeholder="select one"
              >
                {brands.map((brand) => (
                  <>
                    <Option value={brand?.id}>{brand?.name}</Option>
                  </>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please add a new image!",
                },
              ]}
              label="image"
              name="image"
            >
              <Input
                type="file"
                className="primary-input"
                onChange={(e) => setUploadFile2(e.target.files[0])}
              ></Input>
            </Form.Item>

            <div className="d-flex">
              <Button className="primary-button" htmlType="submit">
                update
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
        </Modal>
      )}
    </Layout>
  );
}

export default Product;

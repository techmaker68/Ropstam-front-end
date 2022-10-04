import React, { useEffect, useState } from "react";

function Cars(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    Api.get("/products").then((res) => {
      setData(res.data);
    });
  }, [refresh]);
  return (
    <div>
      <Layout title="Brands" currentPage="1">
        <div className="main-wrapper">
          <div style={{ marginBottom: "50px" }}></div>
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
      </Layout>
    </div>
  );
}

export default Cars;

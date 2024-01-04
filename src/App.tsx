import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function show() {
  const [api, setApi] = useState({
    id: 0,
    title: "",
    description: "",
    category: "",
    image: "",
    price: 0
  });


  const getapiProducts = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products`);
      console.log(response.data);
      setApi(response.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getapiProducts();
  }, []);

  return (
    // <div className="container">
    //   <div className="card">
    //     <h1>product</h1>
    //     <h1>{api.id}</h1>
    //     <h1>{api.title}</h1>

    //   </div>
    // </div>
    <div className="container">
      <div className="card" style={{ width: '18rem' }}>
        <img src="..." className="card-img-top" alt="Card" />
        <div className="card-body">
          <h1>{api.id}</h1>
          <h2 className="card-title">{api.title}</h2>
          <p className="card-text">
            {api.description}
          </p>
          <a href="#" className="btn btn-primary">
            select
          </a>
        </div>
      </div>
    </div>
  );
}
export default show;

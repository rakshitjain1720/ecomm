import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const show = () => {
  const [products, setProducts] = useState([
    {
      id: 0,
      image: "",
      title: "",
      price: 0,
      description: "",
      category: "",
    },
  ]);
  const [filterCriteria, setFilterCriteria] = useState("all");

  for (let i = 0; i < products.length; i++) {

  }

  const filterProducts = () => {
    switch (filterCriteria) {
      case "1":
        return products.filter(
          (product) => product.category === "men's clothing"
        );
      case "2":
        return products.filter(
          (product) => product.category === "women's clothing"
        );
      case "3":
        return products.filter(
          (product) => product.category === "electronics"
        );
      case "4":
        return products.filter(
          (product) => product.category === "jewelery"
        );
      default:
        return products;
    }
  };

  const filteredProducts = filterProducts();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="body">
      <h1 className="store-name">Rj Store</h1>
      {/* <div>
        <select
          id="filter"
          onChange={(e) => setFilterCriteria(e.target.value)}
          value={filterCriteria}
        >
          <option value="all">All Products</option>
          <option value="1">Mens Cloth's</option>
          <option value="2">Women Cloth's</option>
          <option value="3">Electronic</option>
          <option value="4">Jewelry</option>
        </select>
      </div> */}
      {/* <div className="card-container">
        {filteredProducts.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} />
            <div className="card-details">
              <h2 className="card-title">{product.title}</h2>
              <h2 className="card-des">{product.description}</h2>
              <p className="card-price">${product.price}</p>
            </div>
          </div>
        ))}
      </div> */}
      <div className="container"></div>
      <div className="card ">
        {filteredProducts.map((product) => (
          <div className="" key={product.id}>
            <img className="card-img-top" src={product.image} alt="" />
            <div className="card-body">
              <h3 className="card-title">{product.title}</h3>
              <p className="card-text">{product.description}</p>
              <p className="card-price">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default show;

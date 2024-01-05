import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const ProductList = () => {
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

  const filterProducts = () => {
    switch (filterCriteria) {
      case "menClothes":
        return products.filter(
          (product) => product.category === "men's clothing"
        );
      case "womenClothes":
        return products.filter(
          (product) => product.category === "women's clothing"
        );
      case "electronics":
        return products.filter((product) => product.category === "electronics");
      case "jewelry":
        return products.filter((product) => product.category === "jewelry");
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
    <div>
      <h1 className="store-name">Product List</h1>
      <div>
        <select
          id="filter"
          onChange={(e) => setFilterCriteria(e.target.value)}
          value={filterCriteria}
        >
          <option value="all">All Products</option>
          <option value="under10">Mens Cloth's</option>
          <option value="over10">Women Cloth's</option>
          <option value="over10">Electronic</option>
          <option value="over10">Jewelry</option>
        </select>
      </div>
      <div className="container">
        <div className="card-container">
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
        </div>
      </div>
    </div>
  );
};

export default ProductList;

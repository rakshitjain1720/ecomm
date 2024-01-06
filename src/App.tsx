import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Card from "./Card";

const Apifetching = () => {
  const [products, setProducts] = useState([
    {
      id: 0,
      image: "",
      title: "",
      price: 0,
      description: "",
      category: "",
      rating: {
        rate: 0,
        count: 0,
      }
    },
  ]);
  const [filterCriteria, setFilterCriteria] = useState("all");
  const [search, setSearch] = useState("");

  const filterProducts = () => {
    let filtered = [];
    // console.log(filtered);
    for (let i = 0; i < products.length; i++) {
      const details = products[i];

      if (filterCriteria === "all" || details.category === filterCriteria) {
        filtered.push(details);
      }
    }

    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (show) =>
          show.title.toLowerCase().includes(query) ||
          show.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  };


  const filteredProducts = filterProducts();

  const fetchData = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // const dropdown = filterCriteria.map(filterCriteria => )

  return (
    <div>
      {/* <Card setProducts={setProducts}/> */}
      <h1 className="text-center md-4 store-name">Rj Store</h1>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <select
              className="form-select"
              onChange={(e) => setFilterCriteria(e.target.value)}
              value={filterCriteria}
            >
              <option value="all">All Products</option>
              <option value="men's clothing">Mens Cloth's</option>
              <option value="women's clothing">Women Cloth's</option>
              <option value="electronics">Electronic</option>
              <option value="jewelery">Jewelry</option>
            </select>
              {/* {filteredProducts.map(products)} */}
          </div>
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        {/* <div className="container mt-4 "> */}
        <div className="row">
          {filteredProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card">
                <div>
                  <h5 className="card-title">{product.title}</h5>
                </div>
                <img src={product.image} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <p className="card-price"><b>${product.price}</b></p>
                  <p className="card-text">{product.description}</p>
                  <p className="card-rate"><b>Rating:-</b> {product.rating.rate}</p>
                  {/* <p className="card-text"><b>{product.rating.count}</b></p> */}
                  <a href="#" className="btn btn-primary">Add to cart</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Apifetching;
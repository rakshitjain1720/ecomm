import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
      },
    },
  ]);

  const [filterCriteria, setFilterCriteria] = useState("all");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      console.log(response.data);
      setProducts(response.data);

      const uniqueCategories = [
        ...new Set(products.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  // const filterBySearch = () => {
  //   let filtered = [...products];

  //   if (search) {
  //     const query = search.toLowerCase();
  //     filtered = filtered.filter(
  //       (product) =>
  //         product.title.toLowerCase().includes(query) ||
  //         product.description.toLowerCase().includes(query)
  //     );
  //   }

  //   return filtered;
  // };

  // const filterByCategory = () => {
  //   let filtered = [...products];

  //   if (filterCriteria !== "all") {
  //     filtered = filtered.filter(product => product.category === filterCriteria);
  //   }

  //   return filtered;
  // };

  // const searchFilteredProducts = filterBySearch();
  // const categoryFilteredProducts = filterByCategory();

  //  const filteredProducts = filterCriteria === "all" ? searchFilteredProducts : categoryFilteredProducts;

  //   const filterProducts = () => {
  //   let filtered = [...products];

  //   if (search) {
  //     const query = search.toLowerCase();
  //     filtered = filtered.filter(
  //       (product) =>
  //         product.title.toLowerCase().includes(query) ||
  //         product.description.toLowerCase().includes(query)
  //     );
  //   }

  //   return filtered;
  // };

  const filteredProducts = filterProducts();

  return (
    <div >
      <h1 className="text-center md-4 heading">Rj Store</h1>
      <div className="row mb-3">
        <div className="col-md-4">
          <select
            className="form-select mb-3"
            value={filterCriteria}
            onChange={(e) => setFilterCriteria(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
            <div className="card">
              <div>
                <h5 className="card-title">{product.title}</h5>
              </div>
              <img
                src={product.image}
                className="card-img-top"
                alt={product.title}
              />
              <div className="card-body">
                <p className="card-price">
                  <b>${product.price}</b>
                </p>
                <p className="card-text">{product.description}</p>
                <p className="card-rate">
                  <b>Rating:-</b> {product.rating.rate}
                </p>
                {/* <p className="card-text"><b>{product.rating.count}</b></p> */}
                <a href="#" className="btn btn-primary">
                  Add to cart
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Apifetching;

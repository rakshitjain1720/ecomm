import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Present from "./ProductCard";
import Seacrhfilter from "./SearchDrop";
// import { Route, Switch } from "react-router-dom";

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
  // const [titleSuggestions, setTitleSuggestions] = useState([]);

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
  // useEffect(() => {
  //   const titles = products.map((product) => product.title);
  //   setTitleSuggestions([...new Set(titles)]);
  // }, [products]);

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

  return (
    <div>
      {/* <Switch>
      <Route  path="/" Component={Present}/>
      <Route path="/" Component={Seacrhfilter}/>
    </Switch> */}

      <h1 className="text-center mb-4 heading">Rj Store</h1>
      <Seacrhfilter
        filterCriteria={filterCriteria}
        setFilterCriteria={setFilterCriteria}
        categories={categories}
        search={search}
        setSearch={setSearch}
      />
      <div className="row">
        {filteredProducts.map((product) => (
          <Present key={product.id} product={product} />
        ))}
      </div>
      {/* <div className="row mb-2">
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
      </div> */}

      {/* <div className="row">
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

                <a href="#" className="btn btn-primary">
                  Add to cart
                </a>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};
export default Apifetching;

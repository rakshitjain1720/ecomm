import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductCard from "./ProductCard";
import SearchDrop from "./SearchDrop";
// import Props from "./type"
// import Layout from "./Layout";
// import { Routes, Route } from "react-router-dom";

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

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log(response.data);
        setProducts(response.data);
  
        const choose = [
          ...new Set(products.map((product) => product.category)),
        ];
        setCategories(choose);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [products]);


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
      <h1 className="text-center mb-4 heading">Rj Store</h1>

      {/* <Routes>
      <Route path="/" element={<Layout />}/>
        <Route path="/" element={<SearchDrop
          filterCriteria={filterCriteria}
          setFilterCriteria={setFilterCriteria}
          categories={categories}
          search={search}
          setSearch={setSearch}
        />} />
        <Route
          path="/products"
          element={
            <div className="row">
              {filteredProducts.map((product) => (
                <ProductCard product={product} />
              ))}
            </div>
          }
        />
      </Routes> */}
      <SearchDrop
          filterCriteria={filterCriteria}
          setFilterCriteria={setFilterCriteria}
          categories={categories}
          search={search}
          setSearch={setSearch}
        />
      <div className="row">
        {filteredProducts.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};
export default Apifetching;

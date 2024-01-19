import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductCard from "./ProductCard";
import SearchDrop from "./SearchDrop";
import CartDisplay from "./CartDisplay";

const Apifetching = () => {
  const [products, setProducts] = useState<Props[]>([]);
  const [filterCriteria, setFilterCriteria] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<Props[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Props[]>(
          "https://fakestoreapi.com/products"
        );
        setProducts(response.data);

        const uniqueCategories = Array.from(
          new Set(response.data.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filterProducts = (details: Props): boolean => {
    const categoryMatch =
      filterCriteria === "all" || details.category === filterCriteria;
    const searchMatch =
      !search ||
      details.title.toLowerCase().includes(search.toLowerCase()) ||
      details.description.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  };

  const filteredProducts = products.filter(filterProducts);

  const addToCart = (item: Props) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <div>
      <h1 className="text-center mb-4 heading">Rj Store</h1>

      <SearchDrop
        filterCriteria={filterCriteria}
        setFilterCriteria={setFilterCriteria}
        categories={categories}
        search={search}
        setSearch={setSearch}
      />
      <div className="row">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart}/>
        ))}
      </div>
      {cartItems.length > 0 && <CartDisplay cartItems={cartItems} />}
    </div>
  );
};

export default Apifetching;

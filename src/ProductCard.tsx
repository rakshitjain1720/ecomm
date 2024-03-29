import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }: { product: Props }) => {
  const navigate = useNavigate();
  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };
  const handleAddToCart = () => {
    addToCart(product);
  };
  return (
    <div className="col-lg-4 col-md-6 mb-4" key={product.id} onClick={handleProductClick}>
      <div className="card">
        <div>
          <h5 className="card-title">{product.title}</h5>
        </div>
        <img src={product.image} className="card-img-top" alt={product.title} />
        <div className="card-body">
          <p className="card-price">
            <b>${product.price}</b>
          </p>
          <p className="card-text">{product.description}</p>
          <p className="card-rate">
            <b>Rating:-</b> {product.rating.rate}
          </p>
          {/* <p className="card-text"><b>{product.rating.count}</b></p> */}
          <a href="#" className="btn btn-primary" onClick={handleAddToCart}>
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

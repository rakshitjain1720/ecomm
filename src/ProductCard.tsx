const Present = ({ product }: { product: any }) => {
  return (
    <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
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
          <a href="#" className="btn btn-primary">
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
};

export default Present;

import React from "react";
import { Link } from "react-router-dom";

const ProductList = ({ products }) => (
  <section>
    <div className="page-heading">
      <div>
        <p className="eyebrow">The latest devices</p>
        <h1>Find your next phone</h1>
      </div>
      <span className="product-count">{products.length} phones</span>
    </div>

    {products.length === 0 ? (
      <p className="empty-state">No phones are available right now.</p>
    ) : (
      <div className="product-grid">
        {products.map((product) => (
          <Link
            className="product-card"
            key={product.id}
            to={`/products/${product.id}`}
          >
            <img src={product.image} alt={product.name} />
            <div className="product-card-copy">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <strong>${Number(product.price).toFixed(2)}</strong>
            </div>
          </Link>
        ))}
      </div>
    )}
  </section>
);

export default ProductList;
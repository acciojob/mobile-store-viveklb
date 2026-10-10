import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";

const ProductDetails = ({ products, onUpdateProduct }) => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const product = products.find((item) => item.id === id);
  const [draft, setDraft] = useState({ name: "", description: "", image: "", price: "" });
  const [saved, setSaved] = useState(false);
  const isAdminView = Boolean(location.state && location.state.fromAdmin);

  useEffect(() => {
    if (product) {
      setDraft({
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
      });
    }
  }, [product]);

  const updateDraft = (event) => {
    const { name, value } = event.target;
    setDraft((currentDraft) => ({ ...currentDraft, [name]: value }));
    setSaved(false);
  };

  const saveProduct = (event) => {
    event.preventDefault();
    onUpdateProduct({ ...product, ...draft, price: Number(draft.price) });
    setSaved(true);
  };

  if (!product) {
    return (
      <section className="empty-state">
        <h1>Phone not found</h1>
        <Link to="/">Return to the store</Link>
      </section>
    );
  }

  return (
    <section>
      <button className="btn back-button" type="button" onClick={() => history.push("/")}>
        Back
      </button>
      {isAdminView && (
        <Link className="admin-return-link" to="/admin">
          Return to admin
        </Link>
      )}

      <div className="product-detail">
        <img className="detail-image" src={product.image} alt={product.name} />
        <div className="detail-copy">
          <p className="eyebrow">Mobile phone</p>
          <h1>{product.name}</h1>
          <p className="detail-description">{product.description}</p>
          <p className="detail-price">${Number(product.price).toFixed(2)}</p>
        </div>

        {isAdminView && (
          <form className="detail-edit-form" onSubmit={saveProduct}>
            <h2>Edit product</h2>
            <label>
              Name
              <input className="form-control" name="name" value={draft.name} onChange={updateDraft} required />
            </label>
            <label>
              Description
              <textarea className="form-control" name="description" value={draft.description} onChange={updateDraft} required />
            </label>
            <label>
              Image URL
              <input className="form-control" name="image" value={draft.image} onChange={updateDraft} required />
            </label>
            <label>
              Price
              <input className="form-control" name="price" type="number" min="0" step="0.01" value={draft.price} onChange={updateDraft} required />
            </label>
            <button className="float-right primary-button" type="submit">
              Save changes
            </button>
            {saved && <span className="save-status" role="status">Changes saved</span>}
          </form>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
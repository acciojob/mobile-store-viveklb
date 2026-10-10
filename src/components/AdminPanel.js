import React, { useState } from "react";
import { Link } from "react-router-dom";

const emptyProduct = { name: "", description: "", image: "", price: "" };

const AdminPanel = ({ products, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
  const [newProduct, setNewProduct] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState(emptyProduct);

  const updateNewProduct = (event) => {
    const { name, value } = event.target;
    setNewProduct((currentProduct) => ({ ...currentProduct, [name]: value }));
  };

  const addProduct = (event) => {
    event.preventDefault();
    onAddProduct({ ...newProduct, price: Number(newProduct.price) });
    setNewProduct(emptyProduct);
  };

  const beginEditing = (product) => {
    setEditingId(product.id);
    setEditDraft({
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
    });
  };

  const updateEditDraft = (event) => {
    const { name, value } = event.target;
    setEditDraft((currentDraft) => ({ ...currentDraft, [name]: value }));
  };

  const saveEdit = (product, event) => {
    event.preventDefault();
    onUpdateProduct({ ...product, ...editDraft, price: Number(editDraft.price) });
    setEditingId(null);
  };

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Store management</p>
          <h1>Admin panel</h1>
        </div>
        <span className="product-count">{products.length} products</span>
      </div>

      <form className="add-product-form" onSubmit={addProduct}>
        <h2>Add a product</h2>
        <div className="form-grid">
          <label>
            Name
            <input className="form-control" name="name" value={newProduct.name} onChange={updateNewProduct} required />
          </label>
          <label>
            Description
            <textarea className="form-control" name="description" value={newProduct.description} onChange={updateNewProduct} required />
          </label>
          <label>
            Image URL
            <input className="form-control" name="image" type="url" value={newProduct.image} onChange={updateNewProduct} required />
          </label>
          <label>
            Price
            <input className="form-control" name="price" type="number" min="0" step="0.01" value={newProduct.price} onChange={updateNewProduct} required />
          </label>
        </div>
        <button className="primary-button" type="submit">Add</button>
      </form>

      <div className="admin-list-heading">
        <h2>Products</h2>
      </div>
      {products.length === 0 ? (
        <p className="empty-state">No products to manage.</p>
      ) : (
        <ul className="admin-list">
          {products.map((product) => {
            const isEditing = editingId === product.id;
            const formId = `edit-product-${product.id}`;

            return (
              <li className="admin-product" key={product.id}>
                <Link
                  className="admin-product-link"
                  to={{ pathname: `/products/${product.id}`, state: { fromAdmin: true } }}
                >
                  <img src={product.image} alt="" />
                  <span>
                    <strong>{product.name}</strong>
                    <small>${Number(product.price).toFixed(2)}</small>
                  </span>
                </Link>
                <div className="admin-action">
                  <button
                    className="float-right danger-button"
                    type="button"
                    onClick={() => onDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="admin-action">
                  <button
                    className="float-right secondary-button"
                    type={isEditing ? "submit" : "button"}
                    form={isEditing ? formId : undefined}
                    onClick={isEditing ? undefined : () => beginEditing(product)}
                  >
                    {isEditing ? "Save" : "Edit"}
                  </button>
                </div>
                {isEditing && (
                  <form
                    className="admin-edit-form"
                    id={formId}
                    onSubmit={(event) => saveEdit(product, event)}
                  >
                    <label>
                      Name
                      <input className="form-control" name="name" value={editDraft.name} onChange={updateEditDraft} required />
                    </label>
                    <label>
                      Description
                      <textarea className="form-control" name="description" value={editDraft.description} onChange={updateEditDraft} required />
                    </label>
                    <label>
                      Image URL
                      <input className="form-control" name="image" value={editDraft.image} onChange={updateEditDraft} required />
                    </label>
                    <label>
                      Price
                      <input className="form-control" name="price" type="number" min="0" step="0.01" value={editDraft.price} onChange={updateEditDraft} required />
                    </label>
                  </form>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default AdminPanel;
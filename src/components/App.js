
import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
import initialProducts from "../data/products";
import "./../styles/App.css";

const App = () => {
  const [products, setProducts] = useState(initialProducts);

  const addProduct = (product) => {
    setProducts((currentProducts) => [
      ...currentProducts,
      { ...product, id: String(Date.now()) },
    ]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (productId) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <Router>
      <div className="app-shell">
        <header className="site-header">
          <Link className="store-name" to="/">
            Mobile Store
          </Link>
          <nav className="site-nav" aria-label="Main navigation">
            <ul>
              <li><Link to="/">Products</Link></li>
              <li><Link to="/admin">Admin Panel</Link></li>
            </ul>
          </nav>
        </header>

        <main className="page-content">
          <Switch>
            <Route
              exact
              path="/"
              render={() => <ProductList products={products} />}
            />
            <Route
              exact
              path="/products/:id"
              render={() => (
                <ProductDetails products={products} onUpdateProduct={updateProduct} />
              )}
            />
            <Route
              exact
              path="/admin"
              render={() => (
                <AdminPanel
                  products={products}
                  onAddProduct={addProduct}
                  onUpdateProduct={updateProduct}
                  onDeleteProduct={deleteProduct}
                />
              )}
            />
            <Route
              render={() => (
                <section className="empty-state">
                  <h1>Page not found</h1>
                  <Link to="/">Return to the store</Link>
                </section>
              )}
            />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;

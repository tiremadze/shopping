import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";

import * as productService from "../../../services/product-service";
import ProductsTable from "./ProductsTable/ProductsTable";
import Header from "./Layout/Header/Header";

import "./admin.scss";
import AddOrEditProduct from "./AddOrEditProduct/AddOrEditProduct";

class Admin extends Component {
  state = {
    products: [],
  };

  getProducts = async () => {
    const products = (await productService.getProducts()).data;
    this.setState({ products });
  };

  handleProductDelete = async (product) => {
    await productService.deleteProduct(product.id);
    await this.getProducts();
  };
  componentDidMount = async () => {
    await this.getProducts();
  };
  render() {
    const { products } = this.state;
    return (
      <>
        <Header></Header>
        <main className="container">
          <Switch>
            <Route exact path="/admin">
              <Link to="/admin/add-new-product" className="btn btn-danger">
                Add new product
              </Link>
              <ProductsTable
                onDelete={this.handleProductDelete}
                products={products}
              />
            </Route>
            <Route path="/admin/add-new-product">
              <AddOrEditProduct></AddOrEditProduct>
            </Route>
            <Route path="/admin/edit-product/:id">
              <AddOrEditProduct></AddOrEditProduct>
            </Route>
          </Switch>
        </main>
      </>
    );
  }
}

export default Admin;

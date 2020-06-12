import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import _ from "lodash";

import Header from "./Layout/Header/Header";
import Home from "./Home/Home";
import About from "./About/About";
import Contact from "./Contact/Contact";
import Cart from "./Cart/Cart";
import ProductDetails from "./ProductDetails/ProductDetails";

import { getProducts } from "../../../services/product-service";

class Shopping extends Component {
  state = {
    products: [],
    sizes: [
      { _id: "XS", name: "XS" },
      { _id: "S", name: "S" },
      { _id: "M", name: "M" },
      { _id: "L", name: "L" },
      { _id: "XL", name: "XL" },
      { _id: "XXL", name: "XXL" },
    ],
    cart: [],
    selectedSizes: [],
    sortOrder: "",
    orderOptions: [
      {
        value: "",
        text: "Order By",
      },
      {
        value: "asc",
        text: "Lowest to Highest",
      },
      {
        value: "desc",
        text: "Highest to Lowest",
      },
    ],
  };

  componentDidMount = async () => {
    const products = (await getProducts()).data;
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) cart = [];
    this.setState({ products, cart });
  };

  //#region Home

  handleSizeChange = (size) => {
    const selectedSizes = [...this.state.selectedSizes];

    const index = selectedSizes.indexOf(size);

    if (index !== -1) {
      selectedSizes.splice(index, 1);
    } else {
      selectedSizes.push(size);
    }

    this.setState({ selectedSizes });
  };

  handleSortOrderChange = (order) => {
    this.setState({ sortOrder: order });
  };

  getProductListHeaderData() {
    const { sizes, selectedSizes, orderOptions } = this.state;

    return {
      sizeFilter: {
        sizes: sizes,
        selectedSizes: selectedSizes,
        onSizeSelect: this.handleSizeChange,
      },
      sort: {
        orderOptions: orderOptions,
        onSort: this.handleSortOrderChange,
      },
    };
  }

  getproductListData() {
    const { products, selectedSizes, sortOrder } = this.state;
    const filterProduct =
      selectedSizes.length > 0
        ? products.filter((p) => {
            for (let size of selectedSizes) {
              if (p.availableSizes.find((as) => as === size._id)) {
                return true;
              }
            }
            return false;
          })
        : products;

    const sorted = sortOrder
      ? _.orderBy(filterProduct, ["price"], [sortOrder])
      : filterProduct;

    return {
      products: sorted,
      onAddToCart: this.handleAddToCart,
    };
  }

  //#endregion

  //#region Cart

  handleAddToCart = (product) => {
    const cart = [...this.state.cart];
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      productInCart.count++;
    } else {
      const newCartProduct = {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        count: 1,
      };
      cart.push(newCartProduct);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  handleDecrementCartItem = (item) => {
    if (item.count === 1) {
      return;
    }
    const cart = [...this.state.cart];
    const index = cart.indexOf(item);
    cart[index] = { ...item };
    cart[index].count--;
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  handleIncrementCartItem = (item) => {
    const cart = [...this.state.cart];
    const index = cart.indexOf(item);
    cart[index] = { ...item };
    cart[index].count++;
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  handleDeleteCartItem = (item) => {
    const cart = this.state.cart.filter((p) => item.id !== p.id);
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  //#endregion

  render() {
    const productListHeaderData = this.getProductListHeaderData();
    const productListData = this.getproductListData();

    return (
      <div className="container-wrapper">
        <Header cartCount={this.state.cart.length}></Header>
        <main className="wrap">
          <Switch>
            <Route exact path="/">
              <Redirect to="home"></Redirect>
            </Route>
            <Route path="/home">
              <Home
                headerData={productListHeaderData}
                productData={productListData}
              ></Home>
            </Route>
            <Route path="/product/:id">
              <ProductDetails
                onAddToCart={this.handleAddToCart}
              ></ProductDetails>
            </Route>
            <Route path="/about">
              <About></About>
            </Route>
            <Route path="/contact">
              <Contact></Contact>
            </Route>
            <Route path="/cart">
              <Cart
                items={this.state.cart}
                onDelete={this.handleDeleteCartItem}
                onIncrement={this.handleIncrementCartItem}
                onDecrement={this.handleDecrementCartItem}
              ></Cart>
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default Shopping;

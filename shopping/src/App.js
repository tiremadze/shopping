import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Admin from "./components/Pages/Admin/Admin";
import Shopping from "./components/Pages/Shopping/Shopping";

import "./App.scss";

class App extends Component {
  state = {
    cart: [],
  };

  componentDidMount = async () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) cart = [];
    this.setState({ cart });
  };

  handleAddToCart = (product) => {
    const cart = [...this.state.cart];
    let productInCart = cart.find((item) => item.id === product.id);
    if (!productInCart) {
      productInCart = {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        count: 1,
      };
      cart.push(productInCart);
    } else {
      productInCart.count++;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  handleDecriment = (product) => {
    if (product.count === 1) {
      return;
    }
    const cart = [...this.state.cart];
    const index = cart.indexOf(product);
    cart[index] = { ...product };
    cart[index].count--;
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  handleIncriment = (product) => {
    const cart = [...this.state.cart];
    const index = cart.indexOf(product);
    cart[index] = { ...product };
    cart[index].count++;
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  handlerDelete = (productId) => {
    const cart = this.state.cart.filter((p) => productId !== p.id);
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/admin">
            <Admin></Admin>
          </Route>
          <Route path="/">
            <Shopping></Shopping>
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;

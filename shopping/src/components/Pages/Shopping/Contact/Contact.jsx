import React, { Component } from "react";
import "./contact.scss";
import { sendMessage } from "../../../../services/send-message-service";
class Contact extends Component {
  state = {
    name: "",
    email: "",
    message: "",
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    sendMessage({ ...this.state });
    this.setState({
      name: "",
      email: "",
      message: "",
    });
  };
  render() {
    const { name, email, message } = this.state;
    return (
      <div className="contac-section">
        <h1>Contact us</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
            placeholder="Email"
            required
          />
          <textarea
            onChange={this.handleInputChange}
            name="message"
            value={message}
            placeholder="Text"
          ></textarea>
          <input type="submit" value="Send" className="input-button" />
        </form>
      </div>
    );
  }
}

export default Contact;

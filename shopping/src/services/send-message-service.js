const axios = require("axios").default;

const sendMessage = async (message) => {
  await axios.post("http://localhost:3000/contact", message);
};

module.exports = {
  sendMessage,
};

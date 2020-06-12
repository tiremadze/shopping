const axios = require("axios").default;

const endPoint = "http://localhost:3000/products/";

const getProducts = () => {
  return axios.get(endPoint);
};

const getProductById = (id) => {
  return axios.get(endPoint + id);
};

//admin services
const addProduct = async (product) => {
  const productToPost = getFormData(product);

  await axios.post(endPoint, productToPost);
};
const editProduct = async (product) => {
  const productToPost = getFormData(product);

  await axios.put(endPoint + product.id, productToPost);
};
const deleteProduct = async (id) => {
  await axios.delete(endPoint + id);
};

const getFormData = (product) => {
  const { image, ...rest } = product;
  const formData = new FormData();
  formData.append("data", JSON.stringify(rest));
  image && formData.append("image", image);

  return formData;
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
};

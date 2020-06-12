const productsJSON = appRoot + "/data/products.json";
const fs = require("fs");
var uuidv4 = require("uuid").v4;
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function getProductById(productId) {
  const products = JSON.parse(await readFile(productsJSON)).products;

  return products.find((product) => product.id === productId);
}

async function getProducts(filter) {
  const products = JSON.parse(await readFile(productsJSON)).products;

  const productsFiltered =
    filter && filte.size
      ? products.filter((p) =>
          p.availableSizes.includes(String(filter.size).toUpperCase())
        )
      : products;

  return productsFiltered;
}

async function addProduct(product) {
  const newProduct = { ...product, id: uuidv4() };

  const productsData = JSON.parse(await readFile(productsJSON));

  productsData.products.push(newProduct);
  const productsDataString = JSON.stringify(productsData);

  await writeFile(productsJSON, productsDataString);
}

async function updateProduct(product) {
  const productsData = JSON.parse(await readFile(productsJSON));

  const index = productsData.products.findIndex((p) => p.id === product.id);

  productsData.products[index] = product;

  const productsDataString = JSON.stringify(productsData);
  await writeFile(productsJSON, productsDataString);
}

async function deleteProduct(productId) {
  const productsData = JSON.parse(await readFile(productsJSON));

  const idx = productsData.products.findIndex((m) => m.id === productId);
  productsData.products.splice(idx, 1);

  const productsDataString = JSON.stringify(productsData);
  await writeFile(productsJSON, productsDataString);
}

module.exports = {
  getProductById,
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
};

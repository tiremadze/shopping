const express = require("express");
const router = express.Router();
const multer = require("multer");
const productService = require("../services/productsService");
const fs = require("fs");
var uuidv4 = require("uuid").v4;

const storage = multer.diskStorage({
  destination: "public/images",
  filename(req, image, cb) {
    const startIndex = image.mimetype.indexOf("/");
    const extenssion = image.mimetype.substring(startIndex + 1);
    cb(null, `${uuidv4()}.${extenssion}`);
  },
});

const upload = multer({ storage });
async function removeOldImage(id) {
  const existingProduct = await productService.getProductById(id);
  fs.unlink(`public/images/${existingProduct.image}`, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

router
  .get("/", async (req, res) => {
    const products = await productService.getProducts();

    return res.send(products);
  })
  .get("/:id", async (req, res) => {
    const productId = req.params.id;
    const productById = await productService.getProductById(productId);
    return res.send(productById);
  })
  .post("/", upload.single("image"), async (req, res) => {
    // multipart/from-data - ს ვიყენებ იმისთვის რომ აიტვირთოს ფოტო, მაგრამ
    // ობიექტზე დამეპვა ვერ ხდება ნორმალურად, რიცხვი სტრინგად აღიქმებოდა და ა.შ.
    // ამიტომ ფრონტში FormData-ში ვამატებ data ველს რომელშიც წერია პროდუქტის JSON.
    let product = JSON.parse(req.body.data);

    product.image = req.file ? req.file.filename : null;

    await productService.addProduct(product);

    return res.status(201).send();
  })
  .put("/:id", upload.single("image"), async (req, res) => {
    let product = JSON.parse(req.body.data);
    // multipart/from-data - ს ვიყენებ იმისთვის რომ აიტვირთოს ფოტო, მაგრამ
    // ობიექტზე დამეპვა ვერ ხდება ნორმალურად, რიცხვი სტრინგად აღიქმებოდა და ა.შ.
    // ამიტომ ფრონტში FormData-ში ვამატებ data ველს რომელშიც წერია პროდუქტის JSON.

    const id = req.params.id;
    if (req.file) {
      product.image = req.file.filename;

      //remove old image
      await removeOldImage(id);
    } else {
      product.image = (await productService.getProductById(id)).image;
    }

    await productService.updateProduct(product);

    return res.status(200).send();
  })
  .delete("/:id", async (req, res) => {
    const id = req.params.id;

    //remove old image
    await removeOldImage(id);

    await productService.deleteProduct(id);

    return res.status(200).send();
  });

module.exports = router;

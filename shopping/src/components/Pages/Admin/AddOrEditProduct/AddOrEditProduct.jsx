import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import {
  getProductById,
  addProduct,
  editProduct,
} from "../../../../services/product-service";

import "./AddOrEditProduct.scss";

const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];

const ProductSchema = yup.object().shape({
  title: yup.string().required(),
  price: yup.number().required(),
  freeShipping: yup.boolean(),
  XS: yup.boolean(),
  S: yup.boolean(),
  M: yup.boolean(),
  L: yup.boolean(),
  XL: yup.boolean(),
  XXL: yup.boolean(),
  description: yup.string(),
});

const AddOrEditProduct = () => {
  let { id } = useParams();
  let history = useHistory();
  const [image, setImage] = useState({ preview: "", raw: "" });
  // const { register, handleSubmit, setValue, errors } = useForm({
  const { register, handleSubmit, setValue } = useForm({
    validationSchema: ProductSchema,
  });
  const [editMode] = useState(id !== undefined);

  const onImageChange = useCallback((e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  }, []);

  const onSubmit = async (data) => {
    const productToPost = {
      title: data.title,
      description: data.description,
      price: data.price,
      isFreeShipping: data.freeShipping,
      availableSizes: allSizes.filter((s) => data[s]),
      image: image.raw,
    };

    if (editMode) {
      productToPost.id = data.id;
      await editProduct(productToPost);
    } else {
      await addProduct(productToPost);
    }
    history.push("/admin");
  };

  useEffect(() => {
    if (editMode) {
      async function fetchData() {
        const prod = (await getProductById(id)).data;
        setValue("id", prod.id);
        setValue("title", prod.title);
        setValue("description", prod.description);
        setValue("price", prod.price);
        setValue("freeShipping", prod.isFreeShipping);
        for (const size of prod.availableSizes) {
          setValue(size, size);
        }
        setImage({ preview: `http://localhost:3000/images/${prod.image}` });
      }

      fetchData();
    }
  }, [id, editMode, setValue]);

  // console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {editMode && <input type="hidden" name="id" ref={register} />}
      <div className="form-row">
        <div className="col">
          <img
            src={image.preview}
            className="img-thumbnail upload-img"
            alt=""
          />

          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="image"
              name="image"
              onChange={onImageChange}
            />
            <label className="custom-file-label" htmlFor="customFile">
              Choose image
            </label>
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              ref={register}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                ref={register}
              />
              <div className="input-group-prepend">
                <div className="input-group-text">GEL</div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="freeShipping"
                name="freeShipping"
                ref={register}
              />
              <label className="form-check-label" htmlFor="freeShipping">
                Free shipping
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="XS"
                name="XS"
                ref={register}
              />
              <label className="form-check-label" htmlFor="XS">
                XS
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="S"
                name="S"
                ref={register}
              />
              <label className="form-check-label" htmlFor="S">
                S
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="M"
                name="M"
                ref={register}
              />
              <label className="form-check-label" htmlFor="M">
                M
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="L"
                name="L"
                ref={register}
              />
              <label className="form-check-label" htmlFor="L">
                L
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="XL"
                name="XL"
                ref={register}
              />
              <label className="form-check-label" htmlFor="XL">
                XL
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="XXL"
                name="XXL"
                ref={register}
              />
              <label className="form-check-label" htmlFor="XXL">
                XXL
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              defaultValue=""
              ref={register}
            />
          </div>
        </div>
      </div>

      <input type="submit" className="btn btn-secondary mb-2" />
    </form>
  );
};

export default AddOrEditProduct;

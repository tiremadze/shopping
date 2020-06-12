import React from "react";
import { Link } from "react-router-dom";

import "./products-table.scss";

const ProductsTable = (props) => {
  const { products, onDelete } = props;

  return (
    <>
      <table className="table ">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className="img-container">
                  <img
                    src={`http://localhost:3000/images/${product.image}`}
                    alt=""
                  />
                </div>
              </td>
              <td>{product.title}</td>
              <td>
                {product.price}
                <span>Gel</span>{" "}
              </td>
              <td>
                <Link to={`/admin/edit-product/${product.id}`} className="mr-2">
                  <button className="btn btn-secondary">Edit</button>
                </Link>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => onDelete(product)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductsTable;

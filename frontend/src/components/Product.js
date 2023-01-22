import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import "../index.css";

function Product({ product }) {
  return (
    <Card style={{ height: "450px" }} className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} className="title-link">
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"#fcb103"}
            />
          </div>
        </Card.Text>

        <Card.Text className="price" as="h3">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;

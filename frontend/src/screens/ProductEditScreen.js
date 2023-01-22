import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  FormCheck,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

function ProductEditScreen() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const { id } = useParams();
  const productId = id;
  const history = useNavigate();

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET })
        history('/admin/productlist')
    } else {
        if (!product.name || product._id !== Number(productId)) {
            dispatch(listProductDetails(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)

        }
    }
  }, [dispatch, product, productId, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  return (
    <div>
      <Link to="/admin/productlist">Go Back</Link>

      <FormContainer>
        <h1>Edit Product</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name">
              <Form.Label>Name</Form.Label>
              <FormControl
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="price">
              <Form.Label>Price</Form.Label>
              <FormControl
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="image">
              <Form.Label>Image</Form.Label>
              <FormControl
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="brand">
              <Form.Label>Brand</Form.Label>
              <FormControl
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="countInStock">
              <Form.Label>Stock</Form.Label>
              <FormControl
                type="number"
                placeholder="Enter stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="category">
              <Form.Label>Category</Form.Label>
              <FormControl
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="description">
              <Form.Label>Description</Form.Label>
              <FormControl
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></FormControl>
            </FormGroup>

            <Row className="py-3">
              <Col>
                <Button type="submit" variant="primary">
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
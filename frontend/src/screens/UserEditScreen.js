import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Button, FormGroup, FormControl,FormCheck,Row,Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails,updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from '../constants/userConstants'

function UserEditScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setAdmin] = useState(false);

  const { id } = useParams();
  const userId = id;
  const history = useNavigate();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { error:errorUpdate, loading:loadingUpdate,success:successUpdate } = userUpdate;

  useEffect(() => {
    if(successUpdate){
        dispatch({type:USER_UPDATE_RESET})
        history('/admin/userlist')
    }else{
        if(!user.name||user._id!==Number(userId)){
            dispatch(getUserDetails(userId))
        }else{
            setName(user.name)
            setEmail(user.email)
            setAdmin(user.isAdmin)
        }
    }
    
  }, [user,userId,successUpdate,history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({_id:user._id, name, email,isAdmin}))
  };
  return (
    <div>
      <Link to="/admin/userlist">Go Back</Link>

      <FormContainer>
        <h1>Edit User</h1>

        {loadingUpdate&&<Loader/>}
        {errorUpdate&&<Message variant="danger">{errorUpdate}</Message>}

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

            <FormGroup controlId="email">
              <Form.Label>Email Address</Form.Label>
              <FormControl
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="isadmin">
              <FormCheck
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setAdmin(e.target.checked)}
              ></FormCheck>
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

export default UserEditScreen;

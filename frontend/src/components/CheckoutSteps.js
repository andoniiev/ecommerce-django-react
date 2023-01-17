import React from "react";
import { Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className="justify-content-center md-4">
      <NavItem>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>
              Login<i class="fa-solid fa-right-to-bracket"></i>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            Login<i class="fa-solid fa-right-to-bracket"></i>
          </Nav.Link>
        )}
      </NavItem>

      <NavItem>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>
              Shipping <i class="fa-solid fa-truck-fast"></i>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            Shipping <i class="fa-solid fa-truck-fast"></i>
          </Nav.Link>
        )}
      </NavItem>

      <NavItem>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>
              Payment <i class="fa-regular fa-credit-card"></i>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            Payment <i class="fa-regular fa-credit-card"></i>
          </Nav.Link>
        )}
      </NavItem>

      <NavItem>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>
              Place Order <i class="fa-solid fa-receipt"></i>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            Place Order <i class="fa-solid fa-receipt"></i>
          </Nav.Link>
        )}
      </NavItem>
    </Nav>
  );
}

export default CheckoutSteps;

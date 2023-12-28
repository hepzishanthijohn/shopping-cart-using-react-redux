import React, { useState } from "react";
import image from '../images/4555971.png'
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { remove } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);

  const [productCount, setProductCount] = useState(
    products.reduce((counts, product) => {
      counts[product.id] = 1; // Default count for each product is 1
      return counts;
    }, {})
  );

  const increaseCount = (productId) => {
    setProductCount((prevCounts) => ({
      ...prevCounts,
      [productId]: prevCounts[productId] + 1,
    }));
  };

  const decreaseCount = (productId) => {
    if (productCount[productId] > 1) {
      setProductCount((prevCounts) => ({
        ...prevCounts,
        [productId]: prevCounts[productId] - 1,
      }));
    } else {
      // If quantity is 1 or below, remove the product from the cart
      removeProduct(productId);
    }
  };

  const removeProduct = (id) => {
    dispatch(remove(id));
    setProductCount((prevCounts) => {
      const newCounts = { ...prevCounts };
      delete newCounts[id];
      return newCounts;
    });
  };

  const calculateTotalPrice = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * productCount[product.id];
    });
    return total;
  };

  const cards = products.map((product) => (
    <div className="card-container" key={product.id}>
      <div className="card-products">
        <Card style={{ width: "27rem",height:"45rem" }} className="cards">
          <Card.Img
            variant="top"
            src={product.images}
            style={{ width: "410px", height: "290px" }}
          />
          <Card.Body>
            <Card.Title><h3><strong>{product.title}</strong></h3></Card.Title>
            
            <Card.Text>
              <h4>Current Price: <i class="fa fa-inr"></i>
              {product.price}</h4>
              <h6>Description:{product.description}</h6>
             <h6>Rating:{product.rating}</h6>
             <h6>Stock:{product.stock}</h6>
             <h6>Category:{product.category}</h6>
            </Card.Text>
            
            <div className="InDe">
              <div className="price-total">
                <Card.Text className="card-text">
                  <h6>Subtotal of product price:<i class="fa fa-inr"></i>{" "}
                  {product.price * productCount[product.id] || product.price}</h6>
                </Card.Text>
              </div>
              <div className="price-total">
                <Button
                  variant="primary"
                  className="increament"
                  style={{ borderRadius: "50%" }}
                  onClick={() => decreaseCount(product.id)}
                >
                  -
                </Button>
                <Card.Text className="text">
                  {productCount[product.id] || 1}
                </Card.Text>
                <Button
                  variant="primary"
                  className="increament"
                  style={{ borderRadius: "50%" }}
                  onClick={() => increaseCount(product.id)}
                >
                  +
                </Button>
              </div>
            </div>
            <Button
              variant="danger"
              className="add mt-2"
              onClick={() => removeProduct(product.id)}
            >
              Remove Item
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  ));

  return (
    <>
      <div className="text-white">
        <span style={{ fontSize: 30 }}>My Cart</span> <br />
        <span style={{ fontSize: 30 }}>
          Grand Total:<i class="fa fa-inr"></i> {calculateTotalPrice()}
        </span>
        {products.length === 0 && (
          <div className="NoItems">
            <img
              src={image}
              alt="Cart Empty image"
            />
          </div>
        )}
        <div className="card-products mb-4">{cards}</div>
      </div>
    </>
  );
};

export default Cart;
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProductById} from "../data/products.js";
import {useCart} from "../context/CartContext.jsx";

export default function ProductDetails() {
  const { id} = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const {addToCart, cartItems} = useCart();

  useEffect(() => {
    const foundProduct = getProductById(id);

    if (!foundProduct) {
      navigate("/");
      return;
    }

    setProduct(foundProduct);
  }, [id]);

  if (!product) return (
    <div className={"page"}>
      <div className={"container"}>
        <h1>Loading...</h1>
      </div>
    </div>
  );

  const itemInCart = cartItems.find(item => item.id === product.id);
  const itemQuantityLabel = itemInCart ? `(${itemInCart.quantity})` : "";

  return (
    <div className={"page"}>
      <div className={"container"}>
        <div className={"product-detail"}>
          <div className={"product-detail-image"}>
            <img src={product?.image} alt={product?.name}/>
          </div>
          <div className={"product-details-content"}>
            <h1 className={"product-details-name"}>{product?.name}</h1>
            <p className={"product-details-price"}>${product?.price}</p>
            <p className={"product-details-description"}>{product?.description}</p>
            <button className={"btn btn-primary"} onClick={() => addToCart(product.id)}>
              Add to Cart {itemQuantityLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
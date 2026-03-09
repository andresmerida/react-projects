import {useCart} from "../context/CartContext.jsx";

export default function Checkout() {
  const {getCartItemsWithProducts, updateCartQuantity,
    removeFromCart, getTotalCartPrice, clearCart} = useCart();
  const cartItems = getCartItemsWithProducts();
  const totalPrice = getTotalCartPrice();

  function placeOrder() {
    alert("Order placed successfully!");
    clearCart();
  }

  return (
    <div className={"page"}>
      <div className={"container"}>
        <h1 className={"page-title"}>Checkout</h1>
        <div className={"checkout-container"}>
          <div className={"checkout-items"}>
            <h2 className={"checkout-section-title"}>Order Summary</h2>
            { cartItems.map((item) => (
              <div className={"checkout-item"} key={item.id}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className={"checkout-item-image"}
                />
                <div className={"checkout-item-details"}>
                  <h3 className={"checkout-item-name"}>{item.product.name}</h3>
                  <p className={"checkout-item-price"}>
                    ${item.product.price} each
                  </p>
                </div>
                <div className={"checkout-item-quantity"}>
                  <div className={"quantity-controls"}>
                    <button
                      className={"quantity-btn"}
                      onClick={() =>updateCartQuantity(item.id, item.quantity - 1)}
                    >-</button>
                    <span className={"quantity-value"}>
                      {item.quantity}
                    </span>
                    <button
                      className={"quantity-btn"}
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                  <p className={"checkout-item-total"}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className={"btn btn-secondary btn-small"}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={"checkout-summary"}>
            <h2 className={"checkout-section-title"}>Total</h2>
            <div className={"checkout-total"}>
              <p className={"checkout-total-label"}>Subtotal</p>
              <p className={"checkout-total-value checkout-total-final"}>
                ${totalPrice.toFixed(2)}
              </p>
            </div>
            <button
              className={"btn btn-primary btn-large btn-block"}
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
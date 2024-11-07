import { useShoppingCart } from "../context/ShoppingCartContext";
import { Offcanvas, Stack } from "react-bootstrap";
import CartItem from "./CartItem";
import formatPrice from "../utilities/formatPrice";
import storeItems from "../data/items.json";

type ShoppingCartProps = {
  isCartOpen: boolean;
};

export default function ShoppingCart({ isCartOpen }: ShoppingCartProps) {
  const { cartItems, closeCart } = useShoppingCart();

  return (
    <Offcanvas show={isCartOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatPrice(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(i => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

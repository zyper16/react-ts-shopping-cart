import { Button, Card } from "react-bootstrap";
import formatPrice from "../utilities/formatPrice";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export default function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <Card>
      <Card.Img
        variant="top"
        src={imgUrl}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatPrice(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => addToCart(id)}>
              + Add to cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseQuantity(id)}>+</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

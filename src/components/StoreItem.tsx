import { Card } from "react-bootstrap";
import formatPrice from "../utilities/formatPrice";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export default function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
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
      </Card.Body>
    </Card>
  );
}

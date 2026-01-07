import { Card, Typography, Checkbox, Image, Row, Col } from "antd";

export type ProductCardProps = {
  product: Product;
  isSelected: boolean;
  onSelect: (product: string) => void;
};

export type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
};

export default function ProductCard({
  product,
  isSelected,
  onSelect,
}: ProductCardProps) {
  const { Text, Title } = Typography;
  return (
    <Card
      onClick={() => onSelect(product.id)}
      size="small"
      title={
        <Row align="middle">
          <Checkbox
            checked={isSelected}
            onChange={() => onSelect(product.id)}
            style={{
              transform: "scale(1.5)",
              background: "white",
              borderRadius: "4px",
              padding: "4px",
              marginRight: "18px",
            }}
          />
          <Title level={4} style={{ margin: 0, fontSize: "18px" }}>
            {product.name}
          </Title>
        </Row>
      }
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        border: isSelected ? "2px solid #00A2DD" : "1px solid #b7b7b7ff",
        padding: "8px",
        cursor: "pointer",
      }}
    >
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <Col span={8}>
          <Image
            src={product.image}
            alt={product.name}
            width={100}
            height={100}
            style={{ borderRadius: "8px", marginRight: "8px" }}
            preview={false}
          />
        </Col>
        <Col span={14} offset={2}>
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Text
              type="secondary"
              style={{ fontSize: "14px", lineHeight: "1.6" }}
            >
              {product.description}
            </Text>
            <div style={{ marginTop: "12px", textAlign: "right" }}>
              <Text strong style={{ fontSize: "24px", color: "#1890ff" }}>
                ฿{product.price.toLocaleString()}
              </Text>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

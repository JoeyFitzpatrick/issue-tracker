import { Card, Button, Row, Col } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default function View({ issues }) {
  return (
    <>
      <Row xs={1} md={2} className="g-4">
        {issues.data.map((issue) => (
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{issue.title}</Card.Title>
                <Card.Text>{issue.content}</Card.Text>
                <Card.Text>{issue.user}</Card.Text>
                <Card.Text>{issue.date}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export async function getServerSideProps(context) {
  let res = await fetch("http://localhost:3000/api/issues", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let issues = await res.json();

  return {
    props: { issues },
  };
}

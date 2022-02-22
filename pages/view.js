import { Card, Button, Row, Col, Alert } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav"


export default function View({ issues }) {
  return (
    <>
    <Nav />
      {issues.data.length > 0 ? (
        <Row xs={1} md={2} className="g-4" style={{margin: "8em"}}>
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
      ) : (
        <Alert style={{margin: "8em"}}>No issues!</Alert>
      )}
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

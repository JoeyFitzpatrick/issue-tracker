import { Card, Button } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default function View({ issues }) {
  return (
    <>
      {issues.data.map((issue) => 
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{issue.title}</Card.Title>
            <Card.Text>{issue.content}</Card.Text>
            <Card.Text>{issue.user}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
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

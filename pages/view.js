import { useState } from "react";
import { Card, Button, Row, Col, Alert, Modal, Form } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";

export default function View({ issues }) {
  const [show, setShow] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (issue) => {
    setShow(true);
    setSelectedIssue(issue);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={() => console.log("click")} style={{ margin: "8em" }}>
            <Form.Group className="mb-3" controlId="createFormTitle">
              <Form.Label>Issue Title</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                value={selectedIssue?.title}
                onChange={() => console.log("click")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="createFormText">
              <Form.Label>Issue Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={selectedIssue?.content}
                onChange={() => console.log("click")}
              />
            </Form.Group>
            <fieldset>
              <Form.Group
                as={Row}
                className="mb-3"
                onChange={() => console.log("click")}
              >
                <Form.Label as="legend" column sm={2}>
                  Priority Level
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    type="radio"
                    label="High"
                    value="High"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    checked={selectedIssue?.priority === "High"}
                  />
                  <Form.Check
                    type="radio"
                    label="Medium"
                    value="Medium"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    checked={selectedIssue?.priority === "Medium"}
                  />
                  <Form.Check
                    type="radio"
                    label="Low"
                    value="Low"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                    checked={selectedIssue?.priority === "Low"}
                  />
                </Col>
              </Form.Group>
            </fieldset>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Nav />
      {issues.data.length > 0 ? (
        <Row xs={1} md={2} className="g-4" style={{ margin: "8em" }}>
          {issues.data.map((issue) => (
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>{issue.title}</Card.Title>
                  <Card.Text>{issue.content}</Card.Text>
                  <Card.Text>{issue.user}</Card.Text>
                  <Card.Text>{issue.date}</Card.Text>
                  <Button variant="primary" onClick={() => handleShow(issue)}>
                    Update
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert style={{ margin: "8em" }}>No issues!</Alert>
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

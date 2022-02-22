import { useState } from "react";
import { Card, Button, Row, Col, Alert, Modal, Form } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";

export default function View({ issues }) {
  const [show, setShow] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [issueTitle, setIssueTitle] = useState();
  const [issueText, setIssueText] = useState();
  const [priority, setPriority] = useState();
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (issue) => {
    setShow(true);
    setSelectedIssue(issue);
    setIssueTitle(issue.title);
    setIssueText(issue.content);
    setPriority(issue.priority);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("http://localhost:3000/api/issues", {
      method: "PUT",
      body: JSON.stringify({
        id: selectedIssue._id,
        title: issueTitle,
        content: issueText,
        priority: priority,
      }),
    });
    res = await res.json();
    console.log(res);
    setIssueTitle("");
    setIssueText("");
    setSubmitted(true);
    setSelectedIssue(null)
    handleClose();
    window.location.reload(false);
  };

  const handleIssueTitleChange = (e) => {
    setIssueTitle(e.target.value);
  };

  const handleIssueTextChange = (e) => {
    setIssueText(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
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
                value={issueTitle}
                onChange={handleIssueTitleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="createFormText">
              <Form.Label>Issue Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={issueText}
                onChange={handleIssueTextChange}
              />
            </Form.Group>
            <fieldset>
              <Form.Group
                as={Row}
                className="mb-3"
                onChange={handlePriorityChange}
              >
                <Form.Label>
                  Priority
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    type="radio"
                    label="High"
                    value="High"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    defaultChecked={selectedIssue?.priority === "High"}
                  />
                  <Form.Check
                    type="radio"
                    label="Medium"
                    value="Medium"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    defaultChecked={selectedIssue?.priority === "Medium"}
                  />
                  <Form.Check
                    type="radio"
                    label="Low"
                    value="Low"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                    defaultChecked={selectedIssue?.priority === "Low"}
                  />
                </Col>
              </Form.Group>
            </fieldset>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
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

import { useState, useEffect } from "react";
import { Card, Button, Row, Col, Alert, Modal, Form } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function View({ issuesObj }) {
  const [originalIssues, setOriginalIssues] = useState([...issuesObj.data]);
  const [issues, setIssues] = useState(issuesObj.data);
  const [show, setShow] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [issueTitle, setIssueTitle] = useState();
  const [issueText, setIssueText] = useState();
  const [priority, setPriority] = useState();
  const [resolved, setResolved] = useState();
  const [showResolved, setShowResolved] = useState(false);
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
        resolved: resolved === undefined ? selectedIssue.resolved : resolved,
      }),
    });
    res = await res.json();
    console.log(res);
    setIssueTitle("");
    setIssueText("");
    setSubmitted(true);
    setSelectedIssue(null);
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

  const handleResolvedChange = (e) => {
    console.log(e.target.checked);
    setResolved(e.target.checked);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    let res = await fetch("http://localhost:3000/api/issues", {
      method: "DELETE",
      body: JSON.stringify({
        id: selectedIssue._id,
      }),
    });
    res = await res.json();
    console.log(res);
    setIssueTitle("");
    setIssueText("");
    setSelectedIssue(null);
    handleClose();
    window.location.reload(false);
  };

  const sortByPriority = () => {
    const priorities = {
      High: 1,
      Medium: 2,
      Low: 3,
    };
    const issuesCopy = [...issues].sort((a, b) =>
      priorities[a.priority] > priorities[b.priority] ? 1 : -1
    );
    setIssues(issuesCopy);
  };

  const sortByOldest = () => {
    const issuesCopy = [...issues].sort((a, b) => (a.date > b.date ? 1 : -1));
    setIssues(issuesCopy);
  };
  const sortByNewest = () => {
    const issuesCopy = [...issues].sort((a, b) => (a.date > b.date ? -1 : 1));
    setIssues(issuesCopy);
  };
  useEffect(() => {
    const issuesCopy = [...originalIssues]
    issuesCopy.sort((a, b) => a.resolved ? 1 : -1)
    setIssues(issuesCopy);
  }, [showResolved]);

  useEffect(() => {
    sortByPriority();
    const issuesCopy = [...issues].filter((issue) => !issue.resolved);
    setIssues(issuesCopy);
  }, []);
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
                <Form.Label>Priority</Form.Label>
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
            <Form.Check
              type="checkbox"
              id="default-checkbox"
              label="Resolved?"
              defaultChecked={selectedIssue?.resolved}
              onChange={handleResolvedChange}
            />
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Nav />
      {issues.length > 0 ? (
        <div>
          <Button
            style={{ margin: "2em", marginTop: "6em" }}
            onClick={sortByPriority}
          >
            Sort by Priority
          </Button>
          <Button
            style={{ margin: "2em", marginTop: "6em" }}
            onClick={sortByOldest}
          >
            Sort by Oldest
          </Button>
          <Button
            style={{ margin: "2em", marginTop: "6em" }}
            onClick={sortByNewest}
          >
            Sort by Newest
          </Button>
          <Button
            style={{ margin: "2em", marginTop: "6em" }}
            onClick={() => setShowResolved(true)}
          >
            Show Resolved Issues
          </Button>
          <Row
            xs={1}
            md={2}
            className="g-4"
            style={{ marginLeft: "4em", marginRight: "4em" }}
          >
            {issues.map((issue) => (
              <Col>
                <Card style={{border: issue.resolved && "2px solid green"}}>
                  <Card.Body>
                    <Card.Title>{issue.title}</Card.Title>
                    <Card.Text>{issue.content}</Card.Text>
                    <Card.Text>Priority: {issue.priority}</Card.Text>
                    <Card.Text>{issue.date}</Card.Text>
                    <Button variant="primary" onClick={() => handleShow(issue)}>
                      Update
                    </Button>
                    <Card.Text>
                      {issue.resolved ? "Resolved" : "Not Resolved"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <Alert style={{ margin: "8em" }}>No issues!</Alert>
      )}
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
  async getServerSideProps(context) {
    let res = await fetch("http://localhost:3000/api/issues", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let issuesObj = await res.json();
  
    return {
      props: { issuesObj },
    };
  },
});

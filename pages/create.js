import { useState } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(function Create() {
  const { user, error, isLoading } = useUser();

  const [issueTitle, setIssueTitle] = useState();
  const [issueText, setIssueText] = useState();
  const [priority, setPriority] = useState();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("/api/issues", {
      method: "POST",
      body: JSON.stringify({
        title: issueTitle,
        content: issueText,
        priority: priority,
        user: user.sub,
        date: Date(),
        tags: ["test", "database"],
        resolved: false,
      }),
    });
    res = await res.json();
    setIssueTitle("");
    setIssueText("");
    setSubmitted(true);
    e.target.reset();
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
      <Nav />
      {!submitted ? (
        <Form onSubmit={handleSubmit} style={{ margin: "8em" }}>
          <Form.Group className="mb-3" controlId="createFormTitle">
            <Form.Label>Issue Title</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              onChange={handleIssueTitleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="createFormText">
            <Form.Label>Issue Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={handleIssueTextChange}
            />
          </Form.Group>
          <fieldset>
            <Form.Group
              as={Row}
              className="mb-3"
              onChange={handlePriorityChange}
            >
              <Form.Label as="legend" column sm={2}>
                Priority
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="High"
                  value="High"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="radio"
                  label="Medium"
                  value="Medium"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  type="radio"
                  label="Low"
                  value="Low"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                />
              </Col>
            </Form.Group>
          </fieldset>
          <Button type="submit">Submit Issue</Button>
        </Form>
      ) : (
        <Alert style={{ margin: "8em" }} variant="success">
          Issue submitted!
        </Alert>
      )}
    </>
  );
})

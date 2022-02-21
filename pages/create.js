import { useState, useEffect } from "react";

import { Row, Col, Form, Button } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const testIssue = {
  title: "First issue",
  content: "this is a test",
  priority: "medium",
  user: "Joey",
  date: Date(),
  tags: ["test", "database"],
};

export default function Create({ issues }) {
  const [issueTitle, setIssueTitle] = useState();
  const [issueText, setIssueText] = useState();
  const [priority, setPriority] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("http://localhost:3000/api/issues", {
      method: "POST",
      body: JSON.stringify({
        title: issueTitle,
        content: issueText,
        priority: priority,
        user: "Joey",
        date: Date(),
        tags: ["test", "database"],
      }),
    });
    res = await res.json();
    setIssueTitle("");
    setIssueText("");
    e.target.reset()
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
      <Form onSubmit={handleSubmit}>
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
          <Form.Group as={Row} className="mb-3" onChange={handlePriorityChange}>
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

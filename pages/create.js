import { useState } from "react";
import clientPromise from "../lib/mongodb";

import { Row, Col, Form, Button } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const testIssue = {
  title: "First issue",
  body: "this is a test",
  priority: "medium",
  user: "Joey",
  date: Date(),
  tags: ["test", "database"],
};

export default function Create({ users }) {
  const [issueTitle, setIssueTitle] = useState();
  const [issueText, setIssueText] = useState();
  const [priority, setPriority] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(issueTitle, issueText, priority);
    console.log(users)
  };

  const handleIssueTitleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setIssueTitle(e.target.value);
  };

  const handleIssueTextChange = (e) => {
    console.log(e.target.name, e.target.value);
    setIssueText(e.target.value);
  };

  const handlePriorityChange = (e) => {
    console.log(e.target.name, e.target.value);
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
};

export async function getServerSideProps(context) {
    const client = await clientPromise;
  
    const db = client.db("issue_tracker_db");
  
    let users = await db.collection("issues").find({}).toArray();
    users = JSON.parse(JSON.stringify(users));
  
    return {
      props: { users },
    };
  }

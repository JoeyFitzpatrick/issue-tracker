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

const Create = ({ db }) => {
  const [issueTitle, setIssueTitle] = useState();
  const [issueText, setIssueText] = useState();
  const [priority, setPriority] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(issueTitle, issueText, priority);
    console.log(client.db())
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

export default Create;

export async function getServerSideProps(context) {
  try {
    // client.db() will be the default database passed in the MONGODB_URI
    // You can change the database by calling the client.db() function and specifying a database like:
    // const db = client.db("myDatabase");
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    await clientPromise;
    return {
      props: { db: client.db() },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { db: null },
    };
  }
}

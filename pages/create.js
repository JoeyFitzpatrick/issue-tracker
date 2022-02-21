import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Create = () => {
  const [issueText, setIssueText] = useState();
  const [priority, setPriority] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(issueText, priority);
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

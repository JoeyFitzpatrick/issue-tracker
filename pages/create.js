import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Create = () => {
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="createFormText">
          <Form.Label>Issue Description</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <fieldset>
          <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={2}>
              Priority Level
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="High"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <Form.Check
                type="radio"
                label="Medium"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
              <Form.Check
                type="radio"
                label="Low"
                name="formHorizontalRadios"
                id="formHorizontalRadios3"
              />
            </Col>
          </Form.Group>
        </fieldset>
      </Form>
    </>
  );
};

export default Create;

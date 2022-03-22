import { useState } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(function Create() {
  const { user, error, isLoading } = useUser();

  const [projectTitle, setProjectTitle] = useState();
  const [projectText, setProjectText] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [project, setProject] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({
        title: projectTitle,
        content: projectText,
        project: project,
        user: user.sub,
        date: Date(),
      }),
    });
    res = await res.json();
    setProjectTitle("");
    setProjectText("");
    setSubmitted(true);
    e.target.reset();
  };

  const handleProjectTitleChange = (e) => {
    setProjectTitle(e.target.value);
  };

  const handleProjectTextChange = (e) => {
    setProjectText(e.target.value);
  };

  return (
    <>
      <Nav />
      {!submitted ? (
        <Form onSubmit={handleSubmit} style={{ margin: "8em" }}>
          <Form.Group className="mb-3" controlId="createFormTitle">
            <Form.Label>Project Title</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              onChange={handleProjectTitleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="createFormText">
            <Form.Label>Project Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={handleProjectTextChange}
            />
          </Form.Group>
          <Button type="submit">Submit Project</Button>
        </Form>
      ) : (
        <Alert style={{ margin: "8em" }} variant="success">
          Project submitted!
        </Alert>
      )}
    </>
  );
});

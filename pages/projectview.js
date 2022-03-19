import { useState, useEffect } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(function ProjectView() {
  const { user, error } = useUser();
  const [isLoading, setLoading] = useState(false);
  const [projects, setProjects] = useState();
  const [projectTitle, setProjectTitle] = useState();

  const handleProjectTitleChange = (e) => {
    setIssueTitle(e.target.value);
  };

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

  useEffect(() => {
    setLoading(true);
    if (user) {
      fetch(`api/projects/${user.sub}`)
        .then((res) => res.json())
        .then((data) => {
          setProjects(data.data);
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <>
      {isLoading && <h3>Loading...</h3>}
      <Nav />
      <Form onSubmit={handleSubmit} style={{ margin: "8em" }}>
        <Form.Group className="mb-3" controlId="createProjectTitle">
          <Form.Label>Project Title</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            onChange={handleProjectTitleChange}
          />
        </Form.Group>
      </Form>
    </>
  );
});

import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Card from "react-bootstrap/Card";
import { DropdownButton, Dropdown } from "react-bootstrap";

const ProjectColumn = ({ dropdown, onClick }) => {
  const { user } = useUser();

  const [isLoading, setLoading] = useState(false);
  const [projects, setProjects] = useState();
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
  if (isLoading) return <div>Loading...</div>;
  if (dropdown) {
    return (
      projects?.length > 0 && (
        <DropdownButton
          variant="outline-secondary"
          title={"Select Project"}
          id="input-group-dropdown-1"
        >
          {projects.map((project) => (
            <Dropdown.Item href="#" onClick={() => onClick(project)}>{project.title}</Dropdown.Item>
          ))}
          <Dropdown.Item href="#" onClick={onClick}>No Project</Dropdown.Item>
        </DropdownButton>
      )
    );
  }
  return projects?.length > 0 ? (
    <div style={{ backgroundColor: "red" }}>
      {" "}
      {projects.map((project) => (
        <Card onClick={() => onClick(project)}>
          <Card.Body>
            <Card.Title>{project.title}</Card.Title>
          </Card.Body>
        </Card>
      ))}
    </div>
  ) : (
    <div>No projects</div>
  );
};

export default ProjectColumn;

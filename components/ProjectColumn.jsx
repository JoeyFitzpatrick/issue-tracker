import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Card from "react-bootstrap/Card"

const ProjectColumn = () => {
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
  return projects?.length > 0 ? (
    <div style={{ backgroundColor: "red" }}>
      {" "}
      {projects.map((project) => (
          <Card>
            <Card.Body>
              <Card.Title>{project.title}</Card.Title>
            </Card.Body>
          </Card>
      ))}
    </div>
  )
  : 
  <div>No projects</div>
};

export default ProjectColumn;

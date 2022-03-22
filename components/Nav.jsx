import { Nav, Navbar, Container } from "react-bootstrap";

const Navigation = () => {
  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/">Issue Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/create">Create Issue</Nav.Link>
              <Nav.Link href="/view">View Issues</Nav.Link>
              <Nav.Link href="/api/auth/login">Login</Nav.Link>
              <Nav.Link href="/api/auth/logout">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;

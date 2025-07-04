import { NavDropdown } from "react-bootstrap";

const Language = (props) => {
  return (
    <>
      <NavDropdown
        title="Việt Nam"
        id="language-nav-dropdown"
        className="no-caret"
      >
        <NavDropdown.Item>English</NavDropdown.Item>
        <NavDropdown.Item>Việt Nam</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Language;

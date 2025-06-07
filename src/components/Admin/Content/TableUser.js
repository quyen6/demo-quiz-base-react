import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getAllUser } from "../../../services/apiServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const TableUser = (props) => {
  const [listUser, setListUser] = useState([]);
  const fetchListUser = async () => {
    let res = await getAllUser();
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };
  useEffect(() => {
    fetchListUser();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Emai</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {listUser &&
          listUser.length > 0 &&
          listUser.map((user, index) => {
            return (
              <tr key={`table-user-${index}`}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-secondary">
                    <FontAwesomeIcon icon={faEye} />
                    &nbsp; View
                  </button>
                  <button className="btn btn-warning">
                    <FontAwesomeIcon icon={faPen} />
                    &nbsp; Edit
                  </button>
                  <button className="btn btn-danger">
                    <FontAwesomeIcon icon={faTrash} />
                    &nbsp; Delete
                  </button>
                </td>
              </tr>
            );
          })}
        {listUser && listUser.length === 0 && (
          <tr>
            <td colSpan={4} style={{ textAlign: "center" }}>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TableUser;

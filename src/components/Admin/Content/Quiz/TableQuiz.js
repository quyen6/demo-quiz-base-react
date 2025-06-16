import { Table } from "react-bootstrap";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TableQuiz = (props) => {
  const { handleClickBtnEditQuiz, listQuiz, handleClickBtnDeleteQuiz } = props;

  return (
    <>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td className="d-flex gap-3">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleClickBtnEditQuiz(item)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                      &nbsp; Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickBtnDeleteQuiz(item)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      &nbsp; Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default TableQuiz;

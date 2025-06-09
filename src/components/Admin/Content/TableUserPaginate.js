import { Table } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

const TableUserPaginate = (props) => {
  const {
    listUser,
    handleClickBtnUpdateUser,
    handleClickBtnViewUser,
    handleClickBtnDeleteUser,
    fetchListUserWithPaginate,
    pageCount,
    currentPage,
    setCurrentPage,
  } = props;

  const handlePageClick = (event) => {
    fetchListUserWithPaginate(+event.selected + 1);
    setCurrentPage(+event.selected + 1);
  };
  return (
    <>
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
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleClickBtnViewUser(user)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                      &nbsp; View
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleClickBtnUpdateUser(user)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                      &nbsp; Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickBtnDeleteUser(user)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      &nbsp; Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUser && listUser.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <ReactPaginate
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< Prev"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
      />
    </>
  );
};

export default TableUserPaginate;

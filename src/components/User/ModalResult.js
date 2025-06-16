import Modal from "react-bootstrap/Modal";

const ModalResult = (props) => {
  const { show, setShow, dataModalResult } = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        className="modal-result"
      >
        <Modal.Header>
          <Modal.Title>Your Result...</Modal.Title>
          {/* <p>Deleting this profile will remove all personal data</p> */}
        </Modal.Header>

        <Modal.Body>
          <div>
            Total Question: <b>{dataModalResult.countTotal}</b>
          </div>
          <div>
            Total Correct answers: <b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-end modal-result-footer">
          <button className="btn btn-warning " onClick={handleClose}>
            Show Answer
          </button>
          <button className="btn btn-secondary " onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;

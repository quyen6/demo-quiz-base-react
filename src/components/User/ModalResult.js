import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

const ModalResult = (props) => {
  const { t } = useTranslation();
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
          <Modal.Title>{t("user.detailquiz.modalresult.title")}</Modal.Title>
          {/* <p>Deleting this profile will remove all personal data</p> */}
        </Modal.Header>

        <Modal.Body>
          <div className="total-q">
            {t("user.detailquiz.modalresult.total-q")}:{" "}
            <b>{dataModalResult.countTotal}</b>
          </div>
          <div className="total-a-correct">
            {t("user.detailquiz.modalresult.total-a-correct")}{" "}
            <b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-end modal-result-footer">
          <button className="btn btn-warning " onClick={handleClose}>
            {t("user.detailquiz.modalresult.btnshow")}
          </button>
          <button className="btn btn-secondary " onClick={handleClose}>
            {t("user.detailquiz.modalresult.btnclose")}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;

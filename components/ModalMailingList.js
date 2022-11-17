import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import MailingListSendgrid from "@/components/MailingListSendgrid";

export default function ModalMailingList(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="special_modal" //Add class name here
    >
      <Modal.Header closeButton>
        {/*         <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <MailingListSendgrid />
      </Modal.Body>
    </Modal>
  );
}

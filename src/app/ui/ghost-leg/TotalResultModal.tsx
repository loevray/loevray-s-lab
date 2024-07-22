import Modal, { ModalProps } from "../common/modal/Modal";

interface TotalResultModal extends ModalProps {
  mappedResult: string[];
}
const TotalResultModal = ({
  open,
  onClose,
  mappedResult,
}: TotalResultModal) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-20 h-fit py-2 bg-white flex flex-col justify-center items-center">
        {mappedResult.map((el, i) => (
          <span key={`${el}${i}`}>{`${i + 1}번 => ${el}`}</span>
        ))}
      </div>
    </Modal>
  );
};

export default TotalResultModal;

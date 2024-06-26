import { CustomCommentDataType } from "@/utils/parsedYoutubeCommentThread";
import Modal, { ModalProps } from "../common/modal/Modal";
import Comment from "./Comment";

interface WinnerModalProps extends ModalProps {
  winnerComments: CustomCommentDataType[];
}
const WinnerModal = ({ open, onClose, winnerComments }: WinnerModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-90 p-2 bg-purple-50">
        <div className="w-60 h-60 flex flex-col  gap-2 overflow-y-auto">
          {winnerComments.map((comment) => (
            <Comment key={comment.commentId} {...comment} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default WinnerModal;

import { CustomCommentDataType } from "@/utils/parsedYoutubeCommentThread";
import Modal, { ModalProps } from "../common/modal/Modal";
import Comment from "./Comment";
import Button from "../common/Button";
import { ComponentProps } from "react";
import winnerToXlsx from "@/utils/winnerToXlsx";
import Link from "next/link";

interface WinnerModalProps extends ModalProps {
  winnerComments: CustomCommentDataType[];
}
const WinnerModal = ({ open, onClose, winnerComments }: WinnerModalProps) => {
  const { download } = winnerToXlsx(winnerComments);
  console.log(winnerComments);
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
      }}
    >
      <div className="w-90 p-2 bg-yellow-50 flex">
        <div className="w-60 h-60 flex flex-col  gap-2 overflow-y-auto pr-1">
          {winnerComments.map((comment) => (
            <Comment key={comment.commentId} {...comment} />
          ))}
        </div>
        <Button colorPalette="rin" text="엑셀 다운" onClick={download} />
      </div>
    </Modal>
  );
};

export default WinnerModal;

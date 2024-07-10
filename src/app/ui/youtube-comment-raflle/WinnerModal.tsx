import { YoutubeCommentType } from "@/utils/parsedYoutubeCommentThread";
import Modal, { ModalProps } from "../common/modal/Modal";
import Comment from "./Comment/Comment";
import Button from "../common/Button";
import { ComponentProps } from "react";
import winnerToXlsx from "@/utils/winnerToXlsx";
import Link from "next/link";

interface WinnerModalProps extends ModalProps {
  winnerComments: YoutubeCommentType[];
}
const WinnerModal = ({ open, onClose, winnerComments }: WinnerModalProps) => {
  const { download } = winnerToXlsx(winnerComments);
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
      }}
    >
      <div className="flex flex-col w-30 md:w-65 p-2 items-center bg-yellow-50 gap-2 rounded-2xl">
        <Button colorPalette="rin" text="엑셀 다운" onClick={download} />
        <div className="w-full h-60 flex flex-col  gap-2 overflow-y-auto pr-1">
          {winnerComments.map((comment) => (
            <Comment key={comment.commentId} {...comment} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default WinnerModal;

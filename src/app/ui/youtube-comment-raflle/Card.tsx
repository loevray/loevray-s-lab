import Image from "next/image";

const Card = () => {
  return (
    <div>
      <Image src="" alt="thumbnail" />
      <div>
        <span>제목</span>
        <span>작성자</span>
        <div>
        <span>조회수</span>
        <span>5개월 전</span>
        </div>
      </div>
    </div>
  );
};

export default Card;

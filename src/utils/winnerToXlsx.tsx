import { utils, write, writeFile } from "xlsx";

const winnerToXlsx = <T,>(data: T[]) => {
  const workbook = utils.book_new();
  const sheet = utils.json_to_sheet(data);
  utils.book_append_sheet(workbook, sheet, "sheet1");
  const download = () => writeFile(workbook, "raffle-winner-list.xlsx");
  return { download };
};

export default winnerToXlsx;

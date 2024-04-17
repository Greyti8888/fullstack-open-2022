import { DiaryEntry } from "../types";

const diaryStyle = {
  border: "1px solid black",
  margin: "0 0 5px 0",
  padding: "5px",
};

const Diary = (diary: DiaryEntry) => {
  return (
    <div style={diaryStyle}>
      <div>Date: {diary.date}</div>
      <div>Weather: {diary.weather}</div>
      <div>Visibility: {diary.visibility}</div>
    </div>
  );
};

export default Diary;

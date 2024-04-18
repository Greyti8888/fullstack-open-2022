import axios from "axios";

import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = async (): Promise<DiaryEntry[]> => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const add = async (diary: NewDiaryEntry): Promise<DiaryEntry> => {
  const res = await axios.post(baseUrl, diary);
  return res.data;
};

export default { getAll, add };

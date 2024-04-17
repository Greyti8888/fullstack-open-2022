import axios from "axios";

import { DiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = async (): Promise<DiaryEntry[]> => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export default { getAll };

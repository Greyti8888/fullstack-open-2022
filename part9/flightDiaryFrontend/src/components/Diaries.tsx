import { useQuery } from "@tanstack/react-query";

import Diary from "./Diary";

import diariesService from "../services/diaries";

import { DiaryEntry } from "../types";

const Diaries = () => {
  const {
    data: diaries,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["diaries"],
    queryFn: diariesService.getAll,
  });

  if (isLoading) return "Loading...";
  if (error) console.log(error);
  if (diaries) {
    return (
      <div>
        {diaries.map((diary: DiaryEntry) => (
          <Diary key={diary.id} {...diary} />
        ))}
      </div>
    );
  }
};

export default Diaries;

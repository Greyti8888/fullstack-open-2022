import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import diariesService from "../services/diaries";

import { Weather, Visibility, NewDiaryEntry, DiaryEntry } from "../types";

const NewDiary = () => {
  const [addNew, setAddNew] = useState(false);
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<Weather | "">("");
  const [visibility, setVisibility] = useState<Visibility | "">("");
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const addDiary = useMutation({
    mutationFn: diariesService.add,
    onSuccess: (res) => {
      console.log(res);
      console.log("success");
      setAddNew(false);
      queryClient.invalidateQueries({ queryKey: ["diaries"] });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data);
        setTimeout(() => setError(""), 5000);
      } else console.log(err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && weather && visibility) {
      const payload: NewDiaryEntry = {
        date,
        weather,
        visibility,
        comment,
      };
      addDiary.mutate(payload);
    }
  };
  if (addNew) {
    return (
      <>
        {error && <div style={{ color: "red", margin: "5px 0" }}>{error}</div>}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "250px",
            border: "1px solid black",
            margin: "0 0 5px 0",
            padding: "5px",
          }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
          <label htmlFor="weather">Weather:</label>
          <select
            style={{ margin: "0 0 5px 0" }}
            id="weather "
            name="weather"
            onChange={(e) => setWeather(e.target.value as Weather)}
          >
            <option value=""></option>
            {Object.values(Weather).map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <label htmlFor="weather">Visibility:</label>
          <select
            style={{ margin: "0 0 5px 0" }}
            id="visibility"
            name="visibility"
            onChange={(e) => setVisibility(e.target.value as Visibility)}
          >
            <option value=""></option>
            {Object.values(Visibility).map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Your comments..."
            style={{ resize: "vertical", margin: "0 0 5px 0" }}
            onChange={(e) => setComment(e.target.value)}
          />
          <button style={{ margin: "0 0 5px 0" }} type="submit">
            Add
          </button>
          <button
            style={{ margin: "0 0 5px 0" }}
            onClick={() => setAddNew(false)}
          >
            Cancel
          </button>
        </form>
      </>
    );
  } else
    return (
      <button style={{ margin: "0 0 5px 0" }} onClick={() => setAddNew(true)}>
        Add
      </button>
    );
};

export default NewDiary;

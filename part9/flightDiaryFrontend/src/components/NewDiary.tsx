import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import diariesService from "../services/diaries";

import { Weather, Visibility, NewDiaryEntry } from "../types";

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

            border: "1px solid black",
            margin: "0 0 5px 0",
            padding: "5px",
          }}
          onSubmit={handleSubmit}
        >
          <fieldset
            style={{ margin: "0 0 5px 0" }}
            onChange={(e) => setDate((e.target as HTMLInputElement).value)}
          >
            <legend>Date: </legend>
            <input id="date" type="date" />
          </fieldset>

          <fieldset
            style={{ margin: "0 0 5px 0" }}
            onChange={(e) =>
              setWeather((e.target as HTMLInputElement).value as Weather)
            }
          >
            <legend>Weather: </legend>
            {Object.values(Weather).map((w) => (
              <label key={w}>
                {w}
                <input type="radio" id={w} name="weather" value={w} />
              </label>
            ))}
          </fieldset>
          <fieldset
            style={{ margin: "0 0 5px 0" }}
            onChange={(e) =>
              setVisibility((e.target as HTMLInputElement).value as Visibility)
            }
          >
            <legend>Visibility: </legend>
            {Object.values(Visibility).map((v) => (
              <label key={v}>
                {v}
                <input type="radio" id={v} name="visibility" value={v} />
              </label>
            ))}
          </fieldset>
          <input
            placeholder="Your comment..."
            style={{ margin: "0 0 5px 0" }}
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

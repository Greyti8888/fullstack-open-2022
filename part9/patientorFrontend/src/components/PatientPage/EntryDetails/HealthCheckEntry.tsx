import BaseEntry from "./BaseEntry";
import { Favorite } from "@mui/icons-material";
import { Rating } from "@mui/material";

import {
  HealthCheckEntry as HCE,
  HealthCheckRating as HCR,
} from "../../../types";

import { assertNever } from "../../../utils";

interface Props {
  entry: HCE;
}

const HealthCheckEntry = ({ entry }: Props) => {
  const rating = {
    value: 0,
    color: "",
  };
  const maxRating = 4;

  switch (entry.healthCheckRating) {
    case HCR.Healthy:
      rating.value = maxRating - entry.healthCheckRating;
      rating.color = "green";
      break;
    case HCR.LowRisk:
      rating.value = maxRating - entry.healthCheckRating;
      rating.color = "yellow";
      break;
    case HCR.HighRisk:
      rating.value = maxRating - entry.healthCheckRating;
      rating.color = "orange";
      break;
    case HCR.CriticalRisk:
      rating.value = maxRating - entry.healthCheckRating;
      rating.color = "red";
      break;
    default:
      assertNever(entry.healthCheckRating);
  }
  return (
    <BaseEntry entry={entry}>
      <div>
        <Rating
          readOnly
          emptyIcon={<Favorite />}
          icon={<Favorite style={{ color: rating.color }} />}
          max={maxRating}
          value={rating.value}
        />
      </div>
    </BaseEntry>
  );
};

export default HealthCheckEntry;

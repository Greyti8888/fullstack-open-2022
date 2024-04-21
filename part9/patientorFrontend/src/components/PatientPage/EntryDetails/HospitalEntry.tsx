import BaseEntry from "./BaseEntry";

import { HospitalEntry as HE } from "../../../types";

interface Props {
  entry: HE;
}

const HospitalEntry = ({ entry }: Props) => {
  return (
    <BaseEntry entry={entry}>
      {entry.discharge && (
        <div>
          discharge: {entry.discharge?.date} - {entry.discharge.criteria}
        </div>
      )}
    </BaseEntry>
  );
};

export default HospitalEntry;

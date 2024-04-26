import { Entry, Types } from "../../../types";

import { assertNever } from "../../../utils";

import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

interface Props {
  entry: Entry;
}

const EntryDetails = ({ entry }: Props) => {
  const { type } = entry;
  switch (type) {
    case Types.HealthCheck:
      return <HealthCheckEntry entry={entry} />;
    case Types.Hospital:
      return <HospitalEntry entry={entry} />;
    case Types.OccupationalHealthcare:
      return <OccupationalHealthcareEntry entry={entry} />;
    default:
      return assertNever(type);
  }
};

export default EntryDetails;

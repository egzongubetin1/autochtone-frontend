
import { CompetitionsDetails } from "@/layout/user/competition/CompetitionDetails";
import { Fragment } from "react";

export default async function CompetitionsDetail({ params }) {
  return (
    <Fragment>
      <div className="container flex flex-col gap-10">
        <h1 className="text-2xl	font-semibold	">Dream Car</h1>
        <CompetitionsDetails id={params.id} />
      </div>
    </Fragment>
  );
}

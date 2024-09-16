import UserLayout from "@/layout/user/UserLayout";
import { MyCompetitions } from "@/layout/user/competition/MyCompetitions";
import { Fragment } from "react";

export default function Competions() {
  return (
    <Fragment>
      <UserLayout active={"competitions"}>
        <MyCompetitions />
      </UserLayout>
    </Fragment>
  );
}

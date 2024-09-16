import UserLayout from "@/layout/user/UserLayout";
import EditUserProfile from "@/layout/user/profile/EditForm";
import { Fragment } from "react";

export default function DetailsPage() {
  return (
    <Fragment>
      <UserLayout active={"details"}>
        <EditUserProfile />
      </UserLayout>
    </Fragment>
  );
}

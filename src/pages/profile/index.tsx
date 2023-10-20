import React from "react";
import { NextPage } from "next";
import { Profile } from "@/types";
import { useGetProfile } from "@/services/useClient";
import { Header } from "@/components/Header";
import { ProfileInfo } from "@/components/Profile/ProfileInfo";
import { Loading } from "@/components/Loading";

const Profile: NextPage = () => {
  const { data, isLoading, error } = useGetProfile();

  return (
    <section className="flex flex-col gap-4">
      <Header title="My Profile" showBack showSidebar />
      {isLoading ? (
        <Loading />
      ) : data?.data?.length ? (
        <ProfileInfo data={data.data[0] as Profile} />
      ) : (
        <p>
          {data?.error?.message ??
            (error as Error)?.message ??
            "Something failed, please try again in another moment."}
        </p>
      )}
    </section>
  );
};

export default Profile;

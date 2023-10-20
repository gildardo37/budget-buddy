import React from "react";
import { NextPage } from "next";
import { useGetProfile } from "@/services/useApi";
import { Header } from "@/components/Header";
import { ProfileInfo } from "@/components/Profile/ProfileInfo";
import { Loading } from "@/components/Loading";
import { RequestError } from "@/components/Errors/RequestError";

const Profile: NextPage = () => {
  const { data, isLoading, error } = useGetProfile();

  return (
    <section className="flex flex-col gap-4">
      <Header title="My Profile" showBack showSidebar />
      {isLoading ? (
        <Loading />
      ) : data?.data?.length ? (
        <ProfileInfo data={data.data[0]} />
      ) : (
        <RequestError requestError={data?.error} error={error} />
      )}
    </section>
  );
};

export default Profile;

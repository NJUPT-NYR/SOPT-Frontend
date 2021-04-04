import {
  Button,
  Card,
  Descriptions,
  Input,
  ProfileScaffold,
} from "@/components";
import { COOKIE_NAME_JWT_TOKEN } from "@/utils/constants";
import { makeServerFetcher, serverDoFetch } from "@/utils/request";
import { GetServerSideProps } from "next";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { GoTelescope } from "react-icons/go";
import * as model from "@/utils/model";

interface IProfileSendInvitation {
  info: {
    username: string;
    avatar: string;
  };
  error: string;
}

export default function ProfileInvitaiton(props: IProfileSendInvitation) {
  const { avatar, username } = props?.info || {};
  const { register, handleSubmit, errors } = useForm();
  const [formData, setFormData] = useState(null);

  const onSubmit = useCallback((data) => {
    console.log(data);
    // setFormData(data);
  }, []);
  return (
    <ProfileScaffold avatar={avatar} username={username} isAdmin>
      <Card>
        <Descriptions title="Send Invitation"></Descriptions>
        <form
          className="grid grid-cols-2 gap-y-2 gap-x-1 "
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div>
            <Input
              placeholder="To"
              autoComplete={"off"}
              name="to"
              inputRef={register({ required: true })}
            />
          </div>
          <div>
            <Input
              placeholder="Address"
              autoComplete={"off"}
              name="address"
              inputRef={register({ required: true })}
            />
          </div>
          <div className="col-span-2">
            <Input
              placeholder="Body"
              autoComplete={"off"}
              name="body"
              inputRef={register({ required: true })}
            />
          </div>
          <Button className="col-span-2" type="submit">
            <span>Send</span>
          </Button>
        </form>
      </Card>
      <Card className="mt-5">
        <ProfileInvitationList />
      </Card>
    </ProfileScaffold>
  );
}

interface IProfileInvitationList {}

function ProfileInvitationList() {
  return (
    <>
      <Descriptions title="Invitations"></Descriptions>
      <div className="flex flex-col items-center">
        <div>
          <GoTelescope className="text-9xl my-3 ml-6" />
        </div>
        <div className="text-gray-500 ml-6">No Invitations</div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[COOKIE_NAME_JWT_TOKEN];
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const fetcher = makeServerFetcher({ token });

  const { data, error } = await serverDoFetch(fetcher, [
    model.requestUserShowUser,
  ]);

  return {
    props: {
      info: data ?? {},
      error,
    },
  };
};

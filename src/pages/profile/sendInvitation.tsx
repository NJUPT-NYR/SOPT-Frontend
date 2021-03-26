import {
  Button,
  Card,
  Descriptions,
  Input,
  ProfileScaffold,
} from "@/components";
import { GetServerSideProps } from "next";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

interface IProfileSendInvitation {
  username: string;
  avatar: string;
}

export default function ProfileInvitaiton({
  avatar,
  username,
}: IProfileSendInvitation) {
  const { register, handleSubmit, errors } = useForm();
  const [formData, setFormData] = useState(null);

  const onSubmit = useCallback((data) => {
    console.log(data);
    // setFormData(data);
  }, []);
  return (
    <ProfileScaffold avatar={avatar} username={username}>
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
    </ProfileScaffold>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      username: "cattchen",
      registerTime: "2021-03-25 10:10:10",
      lastActivity: "2021-03-25 10:10:11",
      inviter: "Brethland",
      upload: "0kb",
      download: "0kb",
      money: "0",
      rank: "1",
      avatar:
        "https://cdn.jsdelivr.net/gh/ChenKS12138/ChenKS12138.github.io/static/avatar-9ebf78a88f69fda4a3b437a4f389bb51.png",
      passkey: "abc123",
      email: "cattchen@tracker.sopt.rs",
    },
  };
};

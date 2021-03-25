import React, { useEffect } from "react";
import { Link, Scaffold, Card } from "@/components";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const AVATAR_SRC =
  "https://cdn.jsdelivr.net/gh/ChenKS12138/ChenKS12138.github.io/static/avatar-9ebf78a88f69fda4a3b437a4f389bb51.png";

export default function Profile() {
  const router = useRouter();
  useEffect(() => {
    // router.push("/login");
  }, []);
  return (
    <Scaffold title="Profile">
      <div className="grid md:grid-cols-1fr-3fr pt-10">
        <div className="flex flex-col items-center">
          <img className="rounded-full" src={AVATAR_SRC} />
          <div className="font-light text-2xl">cattchen</div>
        </div>
        <div>
          <Card>
            <div>profile info</div>
          </Card>
        </div>
      </div>
    </Scaffold>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return {
//     redirect: {
//       destination: "/login",
//       permanent: false,
//       statusCode: 401,
//     },
//   };
// };

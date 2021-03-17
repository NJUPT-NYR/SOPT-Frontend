import React, { useEffect } from "react";
import { Link, Scaffold } from "@/components";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);
  return (
    <Scaffold title="Profile">
      <div className="w-full h-ful bg-gray-50 flex flex-col items-center pt-40">
        <div className="mt-40 text-gray-500 text-lg">This Profile Page</div>
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

import { Button, Input, Link, Scaffold, Alert } from "@/components";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

import * as model from "@/utils/model";
import { objectSkipNullOrUndefinedOrEmptyString } from "@/utils/tools";
import { useRouter } from "next/router";
import { useModel } from "@/utils/hooks";

export default function SignUp() {
  const { register, handleSubmit, errors } = useForm();
  const { requester, isLoading } = useModel([model.requestUserAddUser]);

  const router = useRouter();

  const onSubmit = useCallback(async (formData) => {
    const nextFormData = objectSkipNullOrUndefinedOrEmptyString(formData);
    const { data, error } = await requester(nextFormData);
    if (!error) {
      router.replace("/login");
    }
  }, []);

  return (
    <Scaffold title="SignUp">
      <div className="overflow-hidden py-3">
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md mt-32">
          <div className="px-6 py-4">
            <h2 className="text-3xl text-center text-gray-700">
              SIGN UP | NYR
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full mt-8">
                <Input
                  name="email"
                  placeholder="Email Address"
                  inputRef={register({ required: true })}
                />
              </div>
              <div className="w-full mt-4">
                <Input
                  name="username"
                  placeholder="Username"
                  inputRef={register({ required: true })}
                />
              </div>
              <div className="w-full mt-4">
                <Input
                  name="password"
                  placeholder="Password"
                  isPassword
                  inputRef={register({ required: true })}
                />
              </div>
              <div className="w-full mt-4">
                <Input
                  name="invite_code"
                  placeholder="Invitation Code (Optional)"
                  inputRef={register({
                    required: false,
                  })}
                />
              </div>
              <div className="mt-5">
                <Button className="w-full" type="submit" isLoading={isLoading}>
                  <span className="text-center">Sign Up</span>
                </Button>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center py-4 bg-gray-100 text-center text-sm ">
            <span>{"Already Have An Account?"}</span>
            <span className="ml-3">
              <Link href="/login">
                <span className="text-blue-500 font-bold mt-3 cursor-pointer">
                  Login
                </span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </Scaffold>
  );
}

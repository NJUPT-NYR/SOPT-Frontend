import { Button, Input, Link, Scaffold, Alert } from "@/components";
import React, { useCallback } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

import * as model from "@/utils/model";
import { objectSkipNullOrUndefinedOrEmptyString } from "@/utils/tools";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function SignUp() {
  const { register, handleSubmit, errors } = useForm();
  const [formData, setFormData] = useState(null);

  const { data, error, isValidating } = useSWR(
    formData && [model.requestUserAddUser, formData]
  );
  const router = useRouter();

  const onSubmit = useCallback((data) => {
    const nextData = objectSkipNullOrUndefinedOrEmptyString(data);
    setFormData(nextData);
  }, []);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        router.replace("/login");
      }, 2000);
    }
  }, [data]);

  return (
    <Scaffold title="SignUp">
      <div className="overflow-hidden py-3">
        {!isValidating && data && (
          <Alert type="success">
            <span>Sign Up Success! Navigating To Login...</span>
          </Alert>
        )}
        {!isValidating && error && (
          <Alert type="error">
            <span>{String(error)}</span>
          </Alert>
        )}
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
                <Button
                  className="w-full"
                  type="submit"
                  isLoading={isValidating}
                >
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

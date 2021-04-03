import React, { useCallback, useState } from "react";
import { Alert, Button, Input, Link, Scaffold } from "@/components";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import * as model from "@/utils/model";
import { useEffect } from "react";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import { COOKIE_NAME_JWT_TOKEN } from "@/utils/constants";

export default function Login() {
  const { register, handleSubmit, errors } = useForm();
  const [formData, setFormData] = useState(null);
  const router = useRouter();

  const { data, error, isValidating } = useSWR<string | undefined>(
    formData && [model.requestUserLogin, formData]
  );

  const onSubmit = useCallback(
    (data) => {
      setFormData(data);
    },
    [setFormData]
  );

  useEffect(() => {
    if (data?.length) {
      cookies.set(COOKIE_NAME_JWT_TOKEN, data, {
        sameSite: "Lax",
        expires: 3,
      });
      router.replace("/profile");
    }
  }, [data]);

  return (
    <Scaffold title="Login">
      <div className="overflow-hidden py-3">
        <div className="mt-2">
          {!isValidating && error && (
            <Alert type="error" closable={false}>
              <span>{String(error)}</span>
            </Alert>
          )}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md mt-32 "
        >
          <div className="px-6 py-4">
            <h2 className="text-3xl text-center text-gray-700">LOGIN | NYR</h2>
            <div>
              <div className="w-full mt-8">
                {errors.username && (
                  <span className="text-red-500 text-sm font-semibold">
                    Username Required
                  </span>
                )}
                <Input
                  placeholder="Username"
                  name="username"
                  inputRef={register({ required: true })}
                />
              </div>
              <div className="w-full mt-4">
                {errors.password && (
                  <span className="text-red-500 text-sm font-semibold">
                    Password Required
                  </span>
                )}
                <Input
                  placeholder="Password"
                  name="password"
                  inputRef={register({ required: true })}
                  isPassword
                />
              </div>
              <div className="flex items-center justify-between mt-6">
                <Link href="#">
                  <span className="cursor-pointer select-none text-gray-500 text-sm">
                    Forget Password?
                  </span>
                </Link>
                <Button type="submit" isLoading={isValidating}>
                  <span>Login</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center py-4 bg-gray-100 text-center text-sm ">
            <span>{"Don't Have Account?"}</span>
            <Link href="/signUp">
              <span className="text-blue-500 font-bold ml-3 cursor-pointer">
                Sign Up
              </span>
            </Link>
          </div>
        </form>
      </div>
    </Scaffold>
  );
}

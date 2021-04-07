import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Input, Link, Scaffold } from "@/components";
import { useForm } from "react-hook-form";
import * as model from "@/utils/model";
import { useRouter } from "next/router";
import { useInstantModel, useModel } from "@/utils/hooks";

export default function ForgetPassword() {
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();
  const { isLoading, requester } = useModel([
    model.requestUserAuthForgetPassword,
  ]);

  const onSubmit = useCallback(
    async (formData) => {
      const { error } = await requester(formData);
      if (!error) {
        router.replace("/login");
      }
    },
    [requester, router]
  );

  return (
    <Scaffold title="Login">
      <div className="overflow-hidden py-3">
        {/* <div className="mt-2">
          {!isValidating && data === null && (
            <Alert type="success" closable={false}>
              <span>Success! Navigating To Login...</span>
            </Alert>
          )}
        </div>
        <div className="mt-2">
          {!isValidating && error && (
            <Alert type="error" closable={false}>
              <span>{String(error)}</span>
            </Alert>
          )}
        </div> */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md mt-32 "
        >
          <div className="px-6 py-4">
            <h2 className="text-3xl text-center text-gray-700">
              FORGET PASSWORD
            </h2>
            <div>
              <div className="w-full mt-8">
                {errors.username && (
                  <span className="text-red-500 text-sm font-semibold">
                    Username Required
                  </span>
                )}
                <Input
                  placeholder="Email"
                  name="email"
                  inputRef={register({ required: true })}
                />
              </div>
              <div className="flex items-center justify-between mt-6">
                <Button className="w-full" type="submit" isLoading={isLoading}>
                  <span>Send Email</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center py-4 bg-gray-100 text-center text-sm ">
            <span>{"Remember Password?"}</span>
            <Link href="/login">
              <span className="text-blue-500 font-bold ml-3 cursor-pointer">
                Login
              </span>
            </Link>
          </div>
        </form>
      </div>
    </Scaffold>
  );
}

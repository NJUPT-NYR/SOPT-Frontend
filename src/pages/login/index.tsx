import React, { useCallback } from "react";
import { Alert, Button, Input, Link, Scaffold } from "@/components";
import { useForm } from "react-hook-form";
import useSWR from "swr";

export default function Login() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = useCallback((data) => {
    console.log(data);
  }, []);
  // console.log(errors);
  return (
    <Scaffold title="Login">
      <div className="w-full h-full bg-gray-200 overflow-hidden">
        {/* <div className="mt-2">
          {errors && (
            <Alert
              type="error"
              onClose={() => {
                // this.setState({ loginError: "" });
              }}
            >
              <span>{Object.keys(errors)}</span>
            </Alert>
          )}
        </div> */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md mt-32 "
        >
          <div className="px-6 py-4">
            <h2 className="text-3xl text-center text-gray-700">LOGIN | NYR</h2>
            <div>
              <div className="w-full mt-8">
                {errors.email && (
                  <span className="text-red-500 text-sm font-semibold">
                    Email Required
                  </span>
                )}
                <Input
                  placeholder="Email Address"
                  name="email"
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
                />
              </div>
              <div className="flex items-center justify-between mt-6">
                <Link href="#">
                  <span className="select-none text-gray-500 text-sm">
                    Forget Password?
                  </span>
                </Link>
                <Button type="submit">
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

import { Alert, Button, Input, Link, Scaffold } from "@/components";
import React from "react";

export default function Login() {
  const loginError = "Authorization Fail.";
  return (
    <Scaffold title="Login">
      <div className="w-full h-full bg-gray-200 overflow-hidden">
        <div className="mt-2">
          {loginError && (
            <Alert
              type="error"
              onClose={() => {
                // this.setState({ loginError: "" });
              }}
            >
              <span>{loginError}</span>
            </Alert>
          )}
        </div>
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md mt-32 ">
          <div className="px-6 py-4">
            <h2 className="text-3xl text-center text-gray-700">LOGIN | NYR</h2>
            <div>
              <div className="w-full mt-8">
                <Input placeholder="Email Address" />
              </div>
              <div className="w-full mt-4">
                <Input placeholder="Password" />
              </div>
              <div className="flex items-center justify-between mt-6">
                <Link href="#">
                  <span className="select-none text-gray-500 text-sm">
                    Forget Password?
                  </span>
                </Link>
                <Button>
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
        </div>
      </div>
    </Scaffold>
  );
}

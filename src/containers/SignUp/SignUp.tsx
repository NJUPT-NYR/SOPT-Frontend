import { Button, Input, Link, Scaffold } from "@/components";
import { BasicServerPage } from "@/utils";
import { Page } from "@/utils/decorator";
import React from "react";

interface ISignUpState {
  username: string;
  password: string;
  invitationCode: string;
}

@Page("/signUp")
export default class SignUp extends BasicServerPage<{}, {}> {
  render() {
    return (
      <Scaffold title="SignUp">
        <div className="w-full h-full bg-gray-200 overflow-hidden">
          <div></div>
          <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md mt-32">
            <div className="px-6 py-4">
              <h2 className="text-3xl text-center text-gray-700">
                SIGN UP | NYR
              </h2>
              <div>
                <div className="w-full mt-8">
                  <Input placeholder="Email Address" />
                </div>
                <div className="w-full mt-4">
                  <Input placeholder="Password" />
                </div>
                <div className="w-full mt-4">
                  <Input placeholder="Invitation Code" />
                </div>
                <div className="mt-5">
                  <Button>
                    <span className="text-center">Sign Up</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center py-4 bg-gray-100 text-center text-sm ">
              <span>{"Already Have An Account?"}</span>
              <Link to="/login" className="ml-3">
                <span className="text-blue-500 font-bold">Login</span>
              </Link>
            </div>
          </div>
        </div>
      </Scaffold>
    );
  }
}

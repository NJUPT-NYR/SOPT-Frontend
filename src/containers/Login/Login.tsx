import { Button, Input, Scaffold } from "@/components";
import { BasicServerPage } from "@/utils";
import { Page } from "@/utils/decorator";
import React from "react";

interface ILoginState {
  username: string;
  password: string;
}

@Page("/login")
export default class Profile extends BasicServerPage<{}, ILoginState> {
  state = {
    username: "",
    password: "",
  };
  render() {
    const { username, password } = this.state;
    return (
      <Scaffold title="Login">
        <div className="container mx-auto flex flex-col items-center pt-40">
          <div>
            <div className="block text-sm font-medium text-gray-700">
              USERNAME:
            </div>
            <Input
              classname="w-300"
              value={username}
              onInput={(value) => {
                this.setState({ username: value });
              }}
            />
          </div>
          <div>
            <div className="block text-sm font-medium text-gray-700 mt-3">
              PASSWORD:
            </div>
            <Input
              classname="w-300"
              value={password}
              onInput={(value) => {
                this.setState({ password: value });
              }}
            />
          </div>
          <div>
            <Button classname="mt-3 w-50">
              <span className="text-white select-none">Login</span>
            </Button>
          </div>
        </div>
      </Scaffold>
    );
  }
}

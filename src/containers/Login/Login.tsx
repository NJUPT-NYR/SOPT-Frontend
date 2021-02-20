import { Alert, Button, Input, Scaffold } from "@/components";
import { BasicServerPage } from "@/utils";
import { Page } from "@/utils/decorator";
import React from "react";

interface ILoginState {
  username: string;
  password: string;
  loginError: string;
}

@Page("/login")
export default class Profile extends BasicServerPage<{}, ILoginState> {
  state = {
    username: "",
    password: "",
    loginError: "",
  };
  handleLogin = () => {
    this.setState({ loginError: "Login Fail, Please Retry." });
  };
  render() {
    const { username, password, loginError } = this.state;
    return (
      <Scaffold title="Login">
        <div className="container mx-auto flex flex-col items-center pt-40">
          <div>
            {loginError && (
              <Alert
                className="w-80 mb-3 text-gray-700 "
                type="error"
                showClose
                onClose={() => {
                  this.setState({ loginError: "" });
                }}
              >
                <div>{loginError}</div>
              </Alert>
            )}
          </div>
          <div>
            <div className="block text-sm font-medium text-gray-700">
              USERNAME:
            </div>
            <Input
              className="w-300"
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
              className="w-300"
              value={password}
              onInput={(value) => {
                this.setState({ password: value });
              }}
            />
          </div>
          <div>
            <Button className="mt-3 w-50" onClick={this.handleLogin}>
              <span className="text-white select-none">Login</span>
            </Button>
          </div>
        </div>
      </Scaffold>
    );
  }
}

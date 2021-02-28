import { Alert, Button, Input, Link, Scaffold } from "@/components";
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
    this.setState({ loginError: "Authorization Fail." });
  };
  render() {
    const { username, password, loginError } = this.state;
    return (
      <Scaffold title="Login">
        <div className="w-full h-full bg-gray-200 overflow-hidden">
          <div className="mt-2">
            {loginError && (
              <Alert
                type="error"
                onClose={() => {
                  this.setState({ loginError: "" });
                }}
              >
                <span>{loginError}</span>
              </Alert>
            )}
          </div>
          <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md mt-32 ">
            <div className="px-6 py-4">
              <h2 className="text-3xl text-center text-gray-700">
                LOGIN | NYR
              </h2>
              <div>
                <div className="w-full mt-8">
                  <Input placeholder="Email Address" />
                </div>
                <div className="w-full mt-4">
                  <Input placeholder="Password" />
                </div>
                <div className="flex items-center justify-between mt-6">
                  <Link className="select-none" to="#">
                    <span className="text-gray-500 text-sm">
                      Forget Password?
                    </span>
                  </Link>
                  <Button onClick={this.handleLogin}>
                    <span>Login</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center py-4 bg-gray-100 text-center text-sm ">
              <span>{"Don't Have Account?"}</span>
              <Link to="/signUp" className="ml-3">
                <span className="text-blue-500 font-bold">Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </Scaffold>
    );
  }
}

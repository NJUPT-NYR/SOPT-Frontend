import { Scaffold } from "@/components";
import { BasicServerPage } from "@/utils";
import { Page } from "@/utils/decorator";
import React from "react";

@Page("/uploading")
export default class Uploading extends BasicServerPage {
  render() {
    return (
      <Scaffold title="Upload">
        <div className="container mx-auto flex flex-col items-center pt-40">
          <div className="mt-40 text-gray-500 text-lg">This Upload Page</div>
        </div>
      </Scaffold>
    );
  }
}

import React from "react";

import { Link, PathContext } from "@/components/CustomRouter/CustomRouter";
import { urlMatch } from "@/utils";

const navigationItems = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Upload",
    to: "/uploading",
  },
  {
    label: "Help",
    to: "/help",
  },
  {
    label: "Profile",
    to: "/profile",
  },
];

export default function Navigation() {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="text-white font-bold text-2xl">NYR</div>
            </div>
            <div>
              <div className="ml-10 flex items-baseline space-x-4">
                <PathContext.Consumer>
                  {(value) => {
                    return navigationItems.map((item) => {
                      return (
                        <Link
                          key={item.to}
                          className={
                            urlMatch(item.to, value.path).isMatched
                              ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer select-none "
                              : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer select-none "
                          }
                          to={item.to}
                        >
                          <span>{item.label}</span>
                        </Link>
                      );
                    });
                  }}
                </PathContext.Consumer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

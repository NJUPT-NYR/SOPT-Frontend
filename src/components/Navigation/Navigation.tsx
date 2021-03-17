import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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
  const router = useRouter();

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="text-white font-bold text-2xl cursor-pointer">
                  NYR
                </div>
              </Link>
            </div>
            <div>
              <div className="ml-10 flex items-baseline space-x-4">
                {navigationItems.map((item) => {
                  return (
                    <Link href={item.to} key={item.to}>
                      <span
                        className={
                          item.to === router.pathname
                            ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer select-none "
                            : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer select-none "
                        }
                      >
                        <span>{item.label}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

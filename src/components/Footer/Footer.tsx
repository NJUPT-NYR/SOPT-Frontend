import React, { useMemo } from "react";

export default function Footer() {
  const now = useMemo(() => new Date(), []);
  return (
    <footer className="grid place-items-center bg-gray-100 ">
      <div className="text-center text-gray-400 text-sm">
        @{now.getFullYear()} NYR.
      </div>
    </footer>
  );
}

import React, { useMemo, useState } from "react";

interface IFooterState {
  now: Date;
}

export default class Footer extends React.Component<{}, IFooterState> {
  state = {
    now: new Date(),
  };
  render() {
    const { now } = this.state;
    return (
      <footer className="grid place-items-center bg-gray-100 ">
        <div className="text-center text-gray-400 text-sm">
          @{now.getFullYear()} NYR.
        </div>
      </footer>
    );
  }
}

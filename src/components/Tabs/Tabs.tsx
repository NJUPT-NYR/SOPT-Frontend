import classNames from "classnames";
import React from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useContext } from "react";
import { IBaseComponent } from "../base";

type ITabItem = { tab: string; value: string };

interface ITabsContext {
  activeValue: string;
}

const TabsContext = React.createContext<ITabsContext>(null);

interface ITabs extends IBaseComponent {
  defaultactiveValue: string;
}

export default function Tabs({ children, defaultactiveValue, ...rest }: ITabs) {
  const tabs = parseTabsFromChildren(children);
  const [activeValue, setactiveValue] = useState(defaultactiveValue);

  const contextValue = useMemo(
    () => ({
      activeValue,
    }),
    [activeValue]
  );

  return (
    <div {...rest}>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
        }}
      >
        {tabs.map((tab) => (
          <div
            className={classNames(
              "mx-2 my-1 p-1 text-center  hover:text-gray-500 border-gray-500 cursor-pointer",
              tab.value === activeValue
                ? "border-b-2 text-gray-500 "
                : "text-gray-300"
            )}
            key={tab.value}
            onClick={() => {
              setactiveValue(tab.value);
            }}
          >
            {tab.tab}
          </div>
        ))}
      </div>
      <div>
        <TabsContext.Provider value={contextValue}>
          {children}
        </TabsContext.Provider>
      </div>
    </div>
  );
}

interface IPane extends IBaseComponent {
  value: string;
  tab: string;
}

Tabs.Pane = function Pane({ value, children, ...rest }: IPane) {
  const context = useContext(TabsContext);
  return context?.activeValue === value && <div {...rest}>{children}</div>;
};

function parseTabsFromChildren(
  children: JSX.Element | JSX.Element[]
): { tab: string; value: string; node: React.ReactNode }[] {
  return Array.from((children ?? []) as any)
    .filter((one) => React.isValidElement(one))
    .map((node: any) => {
      const { tab, value } = node.props;
      return {
        node,
        tab,
        value,
      };
    });
}

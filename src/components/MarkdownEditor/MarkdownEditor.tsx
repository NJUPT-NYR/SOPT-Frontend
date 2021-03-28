import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { IBaseComponent } from "../base";
import {
  ImFontSize,
  ImBold,
  ImItalic,
  ImUnderline,
  ImStrikethrough,
  ImListNumbered,
  ImList2,
  ImQuotesRight,
  ImPagebreak,
  ImEmbed,
  ImEmbed2,
  ImTable2,
  ImImage,
  ImLink,
  ImBin2,
  ImUndo2,
  ImRedo2,
} from "react-icons/im";
import {
  charsFindIndex,
  SizedHistoryState,
  stringAppendNextLine,
  stringReplace,
} from "@/utils/tools";
import classNames from "classnames";

interface IMarkdownEditor extends IBaseComponent {
  value: string;
  onChange: (event: { text: string }) => void;
  renderHTML: (text: string) => React.ReactNode;
}

export default function MarkdownEditor({
  onChange,
  renderHTML,
  value,
  ...rest
}: IMarkdownEditor) {
  const commitChange = useCallback(
    (text) => {
      onChange({ text });
      historyState.append(text);
    },
    [onChange]
  );

  const handleTextareaChange = useCallback(
    (event) => {
      commitChange(event.target.value);
    },
    [commitChange]
  );

  const historyState = useMemo(() => new SizedHistoryState(10, value), []);

  const textareaRef = useRef(null);

  useEffect(() => {
    const handleHistoryStateChange = () => {
      onChange({ text: historyState.value });
    };
    historyState.subscribe(handleHistoryStateChange);
    return () => {
      historyState.unSubscribe(handleHistoryStateChange);
    };
  });

  return (
    <div
      className="border-220-220-220 border-2 rounded-sm flex flex-col"
      style={{ width: "500px" }}
      {...rest}
    >
      <div
        style={{ height: "40px" }}
        className="w-full bg-243-243-243 border-b-2 border-220-220-220 flex items-center pl-1 "
      >
        <IconContainer>
          <ImFontSize />
        </IconContainer>
        <IconContainer
          onClick={() => {
            const { selectionStart, selectionEnd } = textareaRef.current ?? {};
            const nextValue = stringReplace({
              str: value,
              selectionStart,
              selectionEnd,
              startReplacement: "**",
              endReplacement: "**",
            });
            commitChange(nextValue);
          }}
        >
          <ImBold />
        </IconContainer>
        <IconContainer
          onClick={() => {
            const { selectionStart, selectionEnd } = textareaRef.current ?? {};
            const nextValue = stringReplace({
              str: value,
              selectionStart,
              selectionEnd,
              startReplacement: "*",
              endReplacement: "*",
            });
            commitChange(nextValue);
          }}
        >
          <ImItalic />
        </IconContainer>
        {/* <IconContainer>
          <ImUnderline />
        </IconContainer> */}
        <IconContainer
          onClick={() => {
            const { selectionStart, selectionEnd } = textareaRef.current ?? {};
            const nextValue = stringReplace({
              str: value,
              selectionStart,
              selectionEnd,
              startReplacement: "~~",
              endReplacement: "~~",
            });
            commitChange(nextValue);
          }}
        >
          <ImStrikethrough />
        </IconContainer>
        <IconContainer
          onClick={() => {
            const { selectionStart } = textareaRef.current ?? {};
            const nextValue = stringAppendNextLine({
              str: value,
              selectionStart,
              replacement: "\n\n* ",
            });
            commitChange(nextValue);
          }}
        >
          <ImList2 />
        </IconContainer>
        <IconContainer
          onClick={() => {
            const { selectionStart } = textareaRef.current ?? {};
            const nextValue = stringAppendNextLine({
              str: value,
              selectionStart,
              replacement: "\n\n1. ",
            });
            commitChange(nextValue);
          }}
        >
          <ImListNumbered />
        </IconContainer>
        <IconContainer
          onClick={() => {
            const { selectionStart, selectionEnd } = textareaRef.current ?? {};
            const nextValue = stringReplace({
              str: value,
              selectionStart,
              selectionEnd,
              startReplacement: "`",
              endReplacement: "`",
            });
            commitChange(nextValue);
          }}
        >
          <ImQuotesRight />
        </IconContainer>
        <IconContainer
          onClick={() => {
            const { selectionStart } = textareaRef.current ?? {};
            const nextValue = stringAppendNextLine({
              str: value,
              selectionStart,
              replacement: "\n\n--- ",
            });
            commitChange(nextValue);
          }}
        >
          <ImPagebreak />
        </IconContainer>
        <IconContainer>
          <ImEmbed />
        </IconContainer>
        <IconContainer>
          <ImEmbed2 />
        </IconContainer>
        <IconContainer>
          <ImTable2 />
        </IconContainer>
        <IconContainer
          onClick={() => {
            const { selectionStart } = textareaRef.current ?? {};
            const nextValue = stringAppendNextLine({
              str: value,
              selectionStart,
              replacement: "\n\n![]() ",
            });
            commitChange(nextValue);
          }}
        >
          <ImImage />
        </IconContainer>
        <IconContainer
          onClick={() => {
            const { selectionStart } = textareaRef.current ?? {};
            const nextValue = stringAppendNextLine({
              str: value,
              selectionStart,
              replacement: "\n\n[]() ",
            });
            commitChange(nextValue);
          }}
        >
          <ImLink />
        </IconContainer>
        <IconContainer
          onClick={() => {
            historyState.clear();
          }}
        >
          <ImBin2 />
        </IconContainer>
        <IconContainer
          disable={!historyState.hasPrev}
          onClick={historyState.movePrev.bind(historyState)}
        >
          <ImUndo2 />
        </IconContainer>
        <IconContainer
          disable={!historyState.hasNext}
          onClick={historyState.moveNext.bind(historyState)}
        >
          <ImRedo2 />
        </IconContainer>
      </div>
      <div className="grid grid-cols-2 grid-rows-1 flex-1 overflow-hidden ">
        <textarea
          style={{ boxShadow: "none !important" }}
          className=" focus:border-220-220-220 border-t-0 border-l-0 border-b-0   focus:shadow-none shadow-none resize-none h-full break-all border-220-220-220 "
          value={value ?? ""}
          onChange={handleTextareaChange}
          ref={textareaRef}
        ></textarea>
        <div className="p-2 h-full overflow-scroll break-all ">
          {renderHTML(value)}
        </div>
      </div>
    </div>
  );
}

interface IIconContainer extends IBaseComponent {
  disable?: boolean;
}

function IconContainer({
  children,
  onClick,
  disable,
  ...rest
}: IIconContainer) {
  const handleClick = useCallback(
    (event) => {
      !disable && onClick?.(event);
    },
    [disable, onClick]
  );
  return (
    <div
      className={classNames(
        "ml-1 p-2 rounded-md  bg-243-243-243 w-max transition-all",
        disable
          ? "text-gray-200 cursor-not-allowed "
          : "cursor-pointer text-105-105-105 hover:text-243-243-243 hover:bg-105-105-105"
      )}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </div>
  );
}

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { BsTypeH1, BsTypeH2, BsTypeH3 } from "react-icons/bs";
import {
  SizedHistoryState,
  stringAppendNextLine,
  stringAppendThisLine,
  stringAppendAroundSelection,
} from "@/utils/tools";
import classNames from "classnames";
import { useShortcut } from "@/utils/hooks";

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
  const { register, revokeAll } = useShortcut();
  const historyState = useMemo(() => new SizedHistoryState(10, value), []);
  const commitChange = useCallback(
    (text) => {
      onChange({ text });
      historyState.append(text);
    },
    [onChange, historyState]
  );

  const handleTextareaChange = useCallback(
    (event) => {
      commitChange(event.target.value);
    },
    [commitChange]
  );

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

  const handleH1 = useCallback(() => {
    const { selectionStart, value } = textareaRef.current ?? {};
    const nextValue = stringAppendThisLine({
      str: value,
      selectionStart,
      replacement: "# ",
    });
    commitChange(nextValue);
  }, [textareaRef, stringAppendThisLine, commitChange]);

  const handleH2 = useCallback(() => {
    const { selectionStart, value } = textareaRef.current ?? {};
    const nextValue = stringAppendThisLine({
      str: value,
      selectionStart,
      replacement: "## ",
    });
    commitChange(nextValue);
  }, [textareaRef, stringAppendThisLine, commitChange]);

  const handleH3 = useCallback(() => {
    const { selectionStart, value } = textareaRef.current ?? {};
    const nextValue = stringAppendThisLine({
      str: value,
      selectionStart,
      replacement: "### ",
    });
    commitChange(nextValue);
  }, [textareaRef, stringAppendThisLine, commitChange]);

  const handleBold = useCallback(() => {
    const { selectionStart, selectionEnd, value } = textareaRef.current ?? {};
    const nextValue = stringAppendAroundSelection({
      str: value,
      selectionStart,
      selectionEnd,
      startReplacement: "**",
      endReplacement: "**",
    });
    commitChange(nextValue);
  }, [textareaRef, stringAppendAroundSelection, commitChange]);

  const handleItalic = useCallback(() => {
    const { selectionStart, selectionEnd, value } = textareaRef.current ?? {};
    const nextValue = stringAppendAroundSelection({
      str: value,
      selectionStart,
      selectionEnd,
      startReplacement: "*",
      endReplacement: "*",
    });
    commitChange(nextValue);
  }, [textareaRef, stringAppendAroundSelection, commitChange]);

  const handleStrikethrough = useCallback(() => {
    const { selectionStart, selectionEnd, value } = textareaRef.current ?? {};
    const nextValue = stringAppendAroundSelection({
      str: value,
      selectionStart,
      selectionEnd,
      startReplacement: "~~",
      endReplacement: "~~",
    });
    commitChange(nextValue);
  }, [textareaRef, stringAppendAroundSelection, commitChange]);

  const handleUnnumberedList = useCallback(() => {
    const { selectionStart, value } = textareaRef.current ?? {};
    const nextValue = stringAppendNextLine({
      str: value,
      selectionStart,
      replacement: "\n\n* [line text]",
    });
    commitChange(nextValue);
  }, [textareaRef, stringAppendNextLine, commitChange]);

  const handleNumberedList = useCallback(() => {
    const { selectionStart, value } = textareaRef.current ?? {};
    const nextValue = stringAppendNextLine({
      str: value,
      selectionStart,
      replacement: "\n\n1. [line text]",
    });
    commitChange(nextValue);
  }, [textareaRef, stringAppendNextLine, commitChange]);

  const handleQuote = useCallback(() => {
    const { selectionStart, selectionEnd, value } = textareaRef.current ?? {};
    const nextValue = stringAppendAroundSelection({
      str: value,
      selectionStart,
      selectionEnd,
      startReplacement: "`",
      endReplacement: "`",
    });
    commitChange(nextValue);
  }, [textareaRef, stringAppendAroundSelection, commitChange]);

  const handlePagebreak = useCallback(() => {
    const { selectionStart, value } = textareaRef.current ?? {};
    const nextValue = stringAppendNextLine({
      str: value,
      selectionStart,
      replacement: "\n\n--- ",
    });
    commitChange(nextValue);
  }, [textareaRef, stringAppendNextLine, commitChange]);

  const handleEmbed = useCallback(() => {
    const { selectionStart, value } = textareaRef.current ?? {};
    const nextValue = stringAppendThisLine({
      str: value,
      selectionStart,
      replacement: "> ",
    });
    commitChange(nextValue);
  }, [textareaRef, stringAppendThisLine, commitChange]);

  const handleCode = useCallback(() => {
    const { selectionStart, value } = textareaRef.current ?? {};
    const nextValue = stringAppendNextLine({
      str: value,
      selectionStart,
      replacement: "\n\n``` \n```\n",
    });
    commitChange(nextValue);
  }, [textareaRef, stringAppendNextLine, commitChange]);

  const handleTable = useCallback(
    (size) => {
      const [row, col] = size;
      const { selectionStart, value } = textareaRef.current ?? {};
      const tableText = generateTableText(col, row);
      const nextValue = stringAppendNextLine({
        str: value,
        selectionStart,
        replacement: tableText,
      });
      commitChange(nextValue);
    },
    [textareaRef, stringAppendNextLine, generateTableText, commitChange]
  );

  const handleImage = useCallback(() => {
    const { selectionStart, value } = textareaRef.current ?? {};
    const nextValue = stringAppendNextLine({
      str: value,
      selectionStart,
      replacement: "\n\n![]() ",
    });
    commitChange(nextValue);
  }, [textareaRef, stringAppendNextLine, commitChange]);

  const handleLink = useCallback(() => {
    const { selectionStart, value } = textareaRef.current ?? {};
    const nextValue = stringAppendNextLine({
      str: value,
      selectionStart,
      replacement: "\n\n[]() ",
    });
    commitChange(nextValue);
  }, [textareaRef, stringAppendNextLine, commitChange]);

  useEffect(() => {
    register({ key: "1", metaKey: true, callback: handleH1 });
    register({ key: "2", metaKey: true, callback: handleH2 });
    register({ key: "3", metaKey: true, callback: handleH3 });
    register({ key: "b", metaKey: true, callback: handleBold });
    register({ key: "i", metaKey: true, callback: handleItalic });
    register({ key: "`", ctrlKey: true, callback: handleEmbed });
    register({
      key: "~",
      ctrlKey: true,
      shiftKey: true,
      callback: handleStrikethrough,
    });
    register({ key: "k", metaKey: true, callback: handleLink });
    register({ key: "i", ctrlKey: true, metaKey: true, callback: handleImage });
    register({ key: "z", metaKey: true, callback: historyState.movePrev });
    register({
      key: "z",
      metaKey: true,
      shiftKey: true,
      callback: historyState.moveNext,
    });

    return () => {
      revokeAll();
    };
  }, [
    handleH1,
    handleH2,
    handleH3,
    handleBold,
    handleItalic,
    handleEmbed,
    handleStrikethrough,
    handleLink,
    handleImage,
    historyState,
  ]);

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
        <IconContainer
          hoverChildren={
            <div className=" bg-243-243-243 text-105-105-105 cursor-pointer">
              <div
                className="py-2 px-4 hover:text-243-243-243 hover:bg-105-105-105"
                onClick={handleH1}
                title="command + 1"
              >
                <BsTypeH1 />
              </div>
              <div
                className="py-2 px-4  hover:text-243-243-243 hover:bg-105-105-105"
                onClick={handleH2}
                title="commmand + 2"
              >
                <BsTypeH2 />
              </div>
              <div
                className="py-2 px-4  hover:text-243-243-243 hover:bg-105-105-105"
                onClick={handleH3}
                title="command + 3"
              >
                <BsTypeH3 />
              </div>
            </div>
          }
        >
          <ImFontSize />
        </IconContainer>
        <IconContainer onClick={handleBold} title="command + B">
          <ImBold />
        </IconContainer>
        <IconContainer onClick={handleItalic} title="command + I">
          <ImItalic />
        </IconContainer>
        <IconContainer onClick={handleStrikethrough} title="ctrl + shift + `">
          <ImStrikethrough />
        </IconContainer>
        <IconContainer onClick={handleUnnumberedList}>
          <ImList2 />
        </IconContainer>
        <IconContainer onClick={handleNumberedList}>
          <ImListNumbered />
        </IconContainer>
        <IconContainer onClick={handleQuote}>
          <ImQuotesRight />
        </IconContainer>
        <IconContainer onClick={handlePagebreak}>
          <ImPagebreak />
        </IconContainer>
        <IconContainer onClick={handleEmbed} title="ctrl + `">
          <ImEmbed />
        </IconContainer>
        <IconContainer onClick={handleCode}>
          <ImEmbed2 />
        </IconContainer>
        <IconContainer
          hoverChildren={
            <div className="bg-243-243-243 text-105-105-105 px-4 py-1">
              <TableSizeSelector
                maxRows={4}
                maxColumns={5}
                onCommitSize={handleTable}
              />
            </div>
          }
        >
          <ImTable2 />
        </IconContainer>
        <IconContainer onClick={handleImage} title="command + ctrl + i">
          <ImImage />
        </IconContainer>
        <IconContainer onClick={handleLink} title="command + k">
          <ImLink />
        </IconContainer>
        <IconContainer onClick={historyState.clear}>
          <ImBin2 />
        </IconContainer>
        <IconContainer
          disable={!historyState.hasPrev}
          onClick={historyState.movePrev}
          title="command + z"
        >
          <ImUndo2 />
        </IconContainer>
        <IconContainer
          disable={!historyState.hasNext}
          onClick={historyState.moveNext}
          title="command + shfit + z"
        >
          <ImRedo2 />
        </IconContainer>
      </div>
      <div className="grid grid-cols-2 grid-rows-1 flex-1 overflow-hidden ">
        <textarea
          style={{ boxShadow: "none !important" }}
          className=" focus:border-220-220-220 border-t-0 border-l-0 border-b-0 focus:shadow-none shadow-none resize-none h-full break-all border-220-220-220 "
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
  hoverChildren?: React.ReactNode;
  innerRef?: any;
  title?: string;
}

function IconContainer({
  children,
  onClick,
  disable,
  hoverChildren,
  innerRef,
  ...rest
}: IIconContainer) {
  const handleClick = useCallback(
    (event) => {
      !disable && onClick?.(event);
    },
    [disable, onClick]
  );
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHover(true);
  }, [setIsHover]);

  const hanldeMouseLeave = useCallback(() => {
    setIsHover(false);
  }, [setIsHover]);

  return (
    <div
      className={classNames(
        "ml-1 p-2 rounded-md  bg-243-243-243 w-max transition-all relative ",
        disable
          ? "text-gray-200 cursor-not-allowed "
          : "cursor-pointer text-105-105-105 hover:text-243-243-243 hover:bg-105-105-105  active:text-243-243-243 active:bg-105-105-105"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={hanldeMouseLeave}
      onClick={handleClick}
      ref={innerRef}
      {...rest}
    >
      <div>{children}</div>
      {hoverChildren && (
        <div
          className={classNames(
            "absolute left-0 top-8 bg-white shadow-sm rounded-sm z-20 overflow-hidden ",
            !isHover && "hidden"
          )}
        >
          {hoverChildren}
        </div>
      )}
    </div>
  );
}

interface ITableSizeSelector extends IBaseComponent {
  onCommitSize: (size: [number, number]) => void;
  maxRows: number;
  maxColumns: number;
}

function TableSizeSelector({
  maxRows,
  maxColumns,
  onCommitSize,
}: ITableSizeSelector) {
  const [size, setSize] = useState<[number, number]>([0, 0]);
  return (
    <div>
      <div
        className="grid gap-x-1 gap-y-1"
        style={{
          gridTemplateColumns: `repeat(${maxColumns}, 1fr)`,
          gridTemplateRows: `repeat(${maxRows}, 1fr)`,
        }}
        onMouseLeave={() => {
          setSize([0, 0]);
        }}
      >
        {Array.from({ length: maxColumns * maxRows }).map((_val, index) => {
          const currentRow = ~~(index / maxColumns) + 1;
          const currentCol = (index % maxColumns) + 1;
          return (
            <div
              className={classNames(
                "w-4 h-4  p-1 cursor-pointer ",
                size[0] >= currentRow && size[1] >= currentCol
                  ? "bg-gray-500"
                  : "bg-gray-300"
              )}
              data-index={index}
              data-row={currentRow}
              data-col={currentCol}
              key={index}
              onMouseOver={(event) => {
                let { row, col } = (event.currentTarget as any).dataset ?? {};
                row = parseInt(row);
                col = parseInt(col);
                if (Number.isInteger(row) && Number.isInteger(col)) {
                  setSize([row, col]);
                }
              }}
              onClick={() => {
                onCommitSize(size);
              }}
            ></div>
          );
        })}
      </div>
      <div className="text-center mt-1">{size[0] + " x " + size[1]}</div>
    </div>
  );
}

function generateTableText(col: number, row: number): string {
  let result = "\n";
  row = Math.max(row, 2);
  const generateLine = (col: number, content?: string) =>
    "| " + ((content ?? "   ") + "|").repeat(col) + "\n";
  result += generateLine(col, " header ");
  result += generateLine(col, " ---- ");
  for (let i = 0; i < row - 1; i++) {
    result += generateLine(col, " data ");
  }
  return result;
}

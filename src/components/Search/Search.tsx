import React from "react";
import { GoSearch } from "react-icons/go";
import { IBaseComponent } from "../base";

interface ISearchProps extends IBaseComponent {
  keyword?: string;
  onInput?: (event) => void;
  onSearch?: (nextKeyword) => void;
}

interface ISearchState {
  inputContent: string;
}

export default class Search extends React.Component<
  ISearchProps,
  ISearchState
> {
  state = {
    inputContent: this.props.keyword ?? "",
  };
  handleInput = (event) => {
    this.setState({
      inputContent: event.target.value,
    });
    this.props?.onInput?.(event);
  };
  handleSearch = () => {
    this.props?.onSearch?.(this.state.inputContent);
  };
  render() {
    const { inputContent } = this.state;
    return (
      <div className={"relative flex items-center " + this.props.className}>
        <input
          className="py-2 px-3 text-grey-darkest focus:outline-none rounded-md w-96 border-gray-800 border-2 "
          value={inputContent}
          onChange={this.handleInput}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              this.handleSearch();
            }
          }}
        />
        <button
          className="ml-2 focus:outline-none hover:bg-gray-200 rounded-md px-5 py-2 "
          onClick={this.handleSearch}
        >
          <GoSearch className="text-3xl" />
        </button>
      </div>
    );
  }
}

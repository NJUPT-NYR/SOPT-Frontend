import React from "react";
import { Page } from "@/utils/decorator";
import { BasicServerPage } from "@/utils";
import type { Context } from "koa";
import { navigateTo, Scaffold } from "@/components";
import { GoSearch } from "react-icons/go";
import { ksGif } from "@/assets";

interface ISearchProps {
  keyword: string;
  result: string;
}

interface ISearchState {
  searchKeyword: string;
}

@Page("/search")
export default class Search extends BasicServerPage<
  ISearchProps,
  ISearchState
> {
  state = {
    searchKeyword: this.props.keyword ?? "",
  };
  static getInitPageProps(ctx: Context) {
    if (ctx.query.keyword) {
      const keyword = ctx.query.keyword;
      const result = `You're keyword is ${keyword}`;
      return Promise.resolve({ keyword, result });
    } else {
      return Promise.resolve({
        keyword: null,
        result: null,
      });
    }
  }
  handleInput = (event) => {
    this.setState({ searchKeyword: event.target.value });
  };
  handleSearch = () => {
    if (this.state.searchKeyword?.length) {
      navigateTo(`/search?keyword=${String(this.state.searchKeyword)}`);
    }
  };
  render() {
    const { searchKeyword } = this.state;
    const { keyword, result } = this.props;

    return (
      <Scaffold title={keyword ? `${keyword}|Search Page` : "Search Page"}>
        <div className="container mx-auto flex flex-col items-center pt-32 ">
          <div className="flex flex-col items-center">
            <div className="text-black font-semibold text-4xl pb-3">Search</div>
            <div className="flex items-center">
              <input
                className="border py-2 px-3 text-grey-darkest focus:outline-none rounded-md w-96 "
                value={searchKeyword}
                onChange={this.handleInput}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    this.handleSearch();
                  }
                }}
              />
              <button
                className="ml-2 focus:outline-none "
                onClick={this.handleSearch}
              >
                <GoSearch className="text-3xl" />
              </button>
            </div>
          </div>
          {result && (
            <div className="mt-16 flex flex-col items-center">
              <div>Result is as follows.</div>
              {keyword === "/ks" ? (
                <img className="rounded-sm mt-2" src={ksGif} />
              ) : (
                <div>{result}</div>
              )}
            </div>
          )}
        </div>
      </Scaffold>
    );
  }
}

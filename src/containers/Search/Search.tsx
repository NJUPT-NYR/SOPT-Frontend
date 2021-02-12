import React from "react";
import { Page } from "@/utils/decorator";
import { BasicServerPage } from "@/utils";
import type { Context } from "koa";
import { navigateTo, Scaffold } from "@/components";

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
    searchKeyword: "",
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
    navigateTo(`/search?keyword=${String(this.state.searchKeyword)}`);
  };
  render() {
    const { searchKeyword } = this.state;
    const { keyword, result } = this.props;

    return (
      <Scaffold title={`${keyword}|Search Page`}>
        <div>
          <input
            value={searchKeyword}
            onChange={this.handleInput}
            placeholder="请输入关键字"
          />
          <button onClick={this.handleSearch}>搜索</button>
        </div>
        {keyword && (
          <div>
            <div>search page</div>
            <div>keyword: {keyword}</div>
            <div>result: {result}</div>
          </div>
        )}
      </Scaffold>
    );
  }
}

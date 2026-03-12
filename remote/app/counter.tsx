"use client";

import { Component } from "react";

type CounterState = {
  count: number;
};

export default class Counter extends Component<Record<string, never>, CounterState> {
  state: CounterState = {
    count: 0,
  };

  render() {
    return (
      <button
        style={{
          border: "2px solid rgb(246, 179, 82)",
          marginTop: "10px",
          backgroundColor: "rgb(246, 179, 82)",
          borderRadius: ".25rem",
          fontWeight: "700",
          padding: ".3rem .75rem",
          fontSize: "14px",
          color: "rgb(24, 24, 24)",
          cursor: "pointer",
        }}
        onClick={() => this.setState(({ count }) => ({ count: count + 1 }))}
      >
        Remote counter: {this.state.count}
      </button>
    );
  }
}

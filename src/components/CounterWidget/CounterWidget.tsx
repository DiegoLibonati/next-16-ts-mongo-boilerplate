"use client";

import type { JSX } from "react";

import { CounterProvider } from "@/contexts/CounterContext/CounterProvider";

import { useCounterContext } from "@/hooks/useCounterContext";

const Counter = (): JSX.Element => {
  const { counterState, addCounter, subtractCounter } = useCounterContext();

  return (
    <div className="counter-widget">
      <div className="counter">
        <button
          type="button"
          className="counter__btn"
          aria-label="Decrement"
          onClick={() => {
            subtractCounter(1);
          }}
        >
          −
        </button>
        <span className="counter__number">{counterState.counter}</span>
        <button
          type="button"
          className="counter__btn"
          aria-label="Increment"
          onClick={() => {
            addCounter(1);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

const CounterWidget = (): JSX.Element => {
  return (
    <CounterProvider>
      <Counter></Counter>
    </CounterProvider>
  );
};

export default CounterWidget;

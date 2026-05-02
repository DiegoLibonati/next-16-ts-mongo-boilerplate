"use client";

import { useState } from "react";

import type { JSX } from "react";
import type { CounterState } from "@/types/states";
import type { CounterProviderProps } from "@/types/props";

import { CounterContext } from "@/contexts/CounterContext/CounterContext";

export const CounterProvider = ({ children }: CounterProviderProps): JSX.Element => {
  const [counterState, setCounterState] = useState<CounterState>({
    counter: 0,
  });

  const addCounter = (value = 1): void => {
    setCounterState((state) => ({ ...state, counter: state.counter + value }));
  };

  const subtractCounter = (value = 1): void => {
    setCounterState((state) => ({ ...state, counter: state.counter - value }));
  };

  return (
    <CounterContext.Provider
      value={{
        counterState: counterState,
        addCounter: addCounter,
        subtractCounter: subtractCounter,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};

"use client";

import { createContext, useEffect, useState } from "react";

type TimerContextType = {
  time: string;
  msg: string;
  ticking: boolean;
  setTicking: () => void;
  setNextState: () => void;

  focus: string;
  short: string;
  long: string;
}

type Config = {
  focus: { time: string, msg: string },
  short: { time: string, msg: string },
  long: { time: string, msg: string },
};

type Timer = {
  state: "focus" | "short" | "long",
  time: string,
  msg: string,
  count: number,
  ticking: boolean
};

const defaultContext: TimerContextType = {
  time: "",
  msg: "",
  ticking: false,
  setTicking: () => {},
  setNextState: () => {},

  focus: "",
  short: "",
  long: "",
};

const TimerContext = createContext<TimerContextType>(defaultContext);

const isClient = typeof window !== "undefined"

const DEFAULT_FOCUS = "25:00"
const DEFAULT_SHORT = "05:00"
const DEFAULT_LONG = "15:00"

const getFocus = () => {
  if (isClient) return localStorage.getItem("focus") || DEFAULT_FOCUS
  else return DEFAULT_FOCUS
}

const getShort = () => {
  if (isClient) return localStorage.getItem("short") || DEFAULT_SHORT
  else return DEFAULT_SHORT
}

const getLong = () => {
  if (isClient) return localStorage.getItem("long") || DEFAULT_LONG
  else return DEFAULT_LONG
}

const passASecond = (time: String) => {
  const [min, sec] = time.split(":");
  const timeInSec = (parseInt(min) * 60) + parseInt(sec)
  const passASecond = timeInSec - 1;
  const newMin = Math.floor(passASecond / 60);
  const newSec = passASecond % 60;
  return `${newMin.toString().padStart(2, "0")}:${newSec.toString().padStart(2, "0")}`
}

const nextTimer = (timer: Timer, config: Config): Timer => {
  if (timer.state !== "focus") return {
    state: "focus",
    time: config["focus"].time,
    msg: config["focus"].msg,
    count: timer.count,
    ticking: false,
  }

  if (timer.count % 4 === 0) return {
    state: "long",
    time: config["long"].time,
    msg: config["long"].msg,
    count: timer.count + 1,
    ticking: false,
  }
  return {
    state: "short",
    time: config["short"].time,
    msg: config["short"].msg,
    count: timer.count + 1,
    ticking: false,
  }
}

const TimeProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  let [config, SetConfig] = useState<Config>({
    focus: { time: getFocus(), msg: "Focus" },
    short: { time: getShort(), msg: "Short" },
    long: { time: getLong(), msg: "Long" },
  });
  let [timer, SetTimer] = useState<Timer>({
    state: "focus",
    time: config.focus.time,
    msg: config.focus.msg,
    count: 0,
    ticking: false,
  });

  const setTicking = () => {
    SetTimer({
      ...timer,
      ticking: !timer.ticking,
    })
  }

  const setNextState = () => {
    SetTimer(nextTimer(timer, config))
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (timer.ticking) SetTimer({  ...timer, time: passASecond(timer.time) })
      if (timer.time === "00:00") SetTimer(nextTimer(timer, config))
    }, 1e3);
    return () => clearTimeout(timeout);
  }, [config, timer]);

  return (
  <TimerContext.Provider
    value={{
      time: timer.time,
      msg: timer.msg,
      ticking: timer.ticking,
      setTicking,
      setNextState
      ,

      focus: config.focus.time,
      short: config.short.time,
      long: config.long.time,
    }}
  >
    {children}
  </TimerContext.Provider>
  )
}

export type { TimerContextType };
export { TimeProvider, TimerContext }

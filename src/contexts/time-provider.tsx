"use client";

import { createContext, useEffect, useMemo, useState } from "react";

type TimerContextType = {
  time: string;
  msg: string;
  ticking: boolean;
  setTicking: () => void;
  setNextState: () => void;

  focus: string;
  setFocus: (time: string) => void;
  short: string;
  setShort: (time: string) => void;
  long: string;
  setLong: (time: string) => void;
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
  setFocus: (time: string) => {},
  short: "",
  setShort: (time: string) => {},
  long: "",
  setLong: (time: string) => {},
};

const TimerContext = createContext<TimerContextType>(defaultContext);

const isClient = typeof window !== "undefined"

const DEFAULT_FOCUS = "25:00"
const DEFAULT_SHORT = "05:00"
const DEFAULT_LONG = "15:00"

const verifyTime = (time: string): boolean => {
  if (!time.split("").includes(":")) return false;
  const [min, sec] = time.split(":");
  if (min.length !== 2) return false
  if (sec.length !== 2) return false
  if (parseInt(sec) > 59) return false
  return true
}

const getFocus = () => {
  if (isClient) return localStorage.getItem("focus") || DEFAULT_FOCUS
  else return DEFAULT_FOCUS
}

const setFocusLocal = (time: string) => {
  if (isClient) localStorage.setItem("focus", time)
}

const getShort = () => {
  if (isClient) return localStorage.getItem("short") || DEFAULT_SHORT
  else return DEFAULT_SHORT
}

const setShortLocal = (time: string) => {
  if (isClient) localStorage.setItem("short", time)
}

const getLong = () => {
  if (isClient) return localStorage.getItem("long") || DEFAULT_LONG
  else return DEFAULT_LONG
}

const setLongLocal = (time: string) => {
  if (isClient) localStorage.setItem("long", time)
}

const passASecond = (time: String) => {
  const [min, sec] = time.split(":");
  const timeInSec = (parseInt(min) * 60) + parseInt(sec)
  const newTimeInSec = timeInSec - 1;
  const newMin = Math.floor(newTimeInSec / 60);
  const newSec = newTimeInSec % 60;
  return `${newMin.toString().padStart(2, "0")}:${newSec.toString().padStart(2, "0")}`
}

const newFocus = (config: Config, count: number) => ({
  state: "focus" as const,
  time: config["focus"].time,
  msg: config["focus"].msg,
  count: count,
  ticking: false,
})

const newShort = (config: Config, count: number) => ({
  state: "short" as const,
  time: config["short"].time,
  msg: config["short"].msg,
  count: count,
  ticking: false,
})

const newLong = (config: Config, count: number) => ({
  state: "long" as const,
  time: config["long"].time,
  msg: config["long"].msg,
  count: count,
  ticking: false,
})

const nextTimer = (timer: Timer, config: Config): Timer => {
  if (timer.state !== "focus") return newFocus(config, timer.count)
  else if (timer.count % 4 !== 0) return newShort(config, timer.count + 1)
  else return newLong(config, timer.count + 1)
}

const TimeProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {

  let config = useMemo(() => ({
    focus: { time: getFocus(), msg: "Focus" },
    short: { time: getShort(), msg: "Short" },
    long: { time: getLong(), msg: "Long" },
  }), []);
  let [timer, setTimer] = useState<Timer>(newFocus(config, 1));

  const audio = useMemo(() => {
    if (typeof window !== "undefined") return new Audio("/assets/audios/alarm-clock.mp3");
  }, []);
  if (audio) audio.loop = false;

  const setTicking = () => {
    setTimer({ ...timer, ticking: !timer.ticking })
  }

  const setNextState = () => {
    const newTimer = nextTimer(timer, config)
    console.log(newTimer);
    setTimer(newTimer)
  }

  const renewState = () =>  {
    switch (timer.state) {
      case "focus": {
        setTimer(newFocus(config, timer.count))
        break;
      }
      case "short": {
        setTimer(newShort(config, timer.count))
        break;
      }
      case "long": {
        setTimer(newLong(config, timer.count))
        break;
      }
    }
  }

  const setFocus = (time: string) => {
    if (verifyTime(time)) {
      setFocusLocal(time);
      config.focus.time = time;
      if (!timer.ticking) renewState();
    }
  }

  const setShort = (time: string) => {
    if (verifyTime(time)) {
      setShortLocal(time)
      config.short.time = time;
      if (!timer.ticking) renewState();
    }
  }

  const setLong = (time: string) => {
    if (verifyTime(time)) {
      setLongLocal(time)
      config.long.time = time;
      if (!timer.ticking) renewState();
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (timer.ticking) setTimer({  ...timer, time: passASecond(timer.time) })
      if (timer.time === "00:00") {
        audio?.play();
        setTimer(nextTimer(timer, config))
      }
    }, 1e3);
    return () => clearTimeout(timeout);
  }, [config, timer, audio]);

  return (
  <TimerContext.Provider
    value={{
      time: timer.time,
      msg: timer.msg,
      ticking: timer.ticking,
      setTicking,
      setNextState,

      focus: config.focus.time,
      setFocus,
      short: config.short.time,
      setShort,
      long: config.long.time,
      setLong,
    }}
  >
    {children}
  </TimerContext.Provider>
  )
}

export type { TimerContextType };
export { TimeProvider, TimerContext }

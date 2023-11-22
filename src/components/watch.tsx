"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import localFont from "next/font/local"
import { Atkinson_Hyperlegible } from "next/font/google";
import { TimerContext } from "@/contexts/time-provider"

const atiknson = Atkinson_Hyperlegible({ subsets: ['latin'], weight: "700" });

const alarmClockFont = localFont({
  src: "../../public/assets/fonts/alarm-font.ttf",
  display: "swap"
})

export function WatchCard() {
  const { time, msg, ticking, setTicking } = React.useContext(TimerContext);

  return (
    <Card className="w-[350px]">
      <CardHeader>
      </CardHeader>
      <CardContent>
        <div className={cn(
          alarmClockFont.className,
          "w-full flex justify-center text-[64px] select-none"
        )}>
          {time}
        </div>
        <div className={cn(atiknson.className,"w-full flex justify-center text-[36px] select-none")}>
          {msg}
        </div>
      </CardContent>
      <CardFooter className="flex justify-evenly">
        <Button onClick={(e) => setTicking()}>{ ticking ? "Pause" : "Resume" }</Button>
        <Button>Next</Button>
      </CardFooter>
    </Card>
  )
}

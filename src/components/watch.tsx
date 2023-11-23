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
  const { time, msg, ticking, setTicking, setNextState } = React.useContext(TimerContext);

  return (
    <Card className="w-[525px]">
      <CardHeader>
      </CardHeader>
      <CardContent>
        <div className={cn(
          alarmClockFont.className,
          "w-full flex justify-center text-[96px] select-none"
        )}>
          {time}
        </div>
        <div className={cn(atiknson.className,"w-full flex justify-center text-[48px] select-none")}>
          {msg}
        </div>
      </CardContent>
      <CardFooter className="flex justify-evenly mt-4">
        <Button onClick={setTicking} className="w-[96px]">
          { ticking ? "Pause" : "Resume" }
        </Button>
        <Button onClick={setNextState} className="w-[96px]">
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

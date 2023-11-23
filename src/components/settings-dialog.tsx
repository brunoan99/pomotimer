"use client";

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "./theme-toggle"
import { Settings } from 'lucide-react';
import { TimerContext } from "@/contexts/time-provider";
import "@/styles/settings-dialog.css"

const delay = (ms: number) => {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

const onlyDigits = (e: React.KeyboardEvent<HTMLInputElement>
) => {
  let value = e.key;
  let bypass = ["ArrowLeft", "ArrowRight", "Backspace", "Delete", ":", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Tab"];
  if (bypass.includes(value)) return
  else e.preventDefault()
}

const changeElement = (element: HTMLElement, success: boolean, chars: number) => {
  if (!success) {
    if (chars > 5) {
      element?.classList.add('on-error');
      (async () => {
        await delay(404);
        element?.classList.remove('on-error');
      })();
    }
    element?.classList.add('error');
  } else {
    element?.classList.remove('error');
  }
}

export function SettingsDialog() {
  const { focus, setFocus, short, setShort, long, setLong } = React.useContext(TimerContext);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <div className="flex flex-row justify-center align-middle items-center">
            <Settings size="20px" className="lg:mr-2"/>
            <div className="text-[16px] hidden lg:block">
              Settings
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Settings
          </DialogTitle>
          <DialogDescription>
            Make changes to your settings here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Pomodoro
            </Label>
            <Input
              id="focus-input"
              defaultValue={focus}
              className="col-span-3"
              onChange={(e) => {
                let success = setFocus(e.target.value);
                let element = document.getElementById("focus-input");
                if (element) changeElement(element, success, e.target.value.length);
              }}
              onKeyDown={onlyDigits}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Short Break
            </Label>
            <Input
              id="short-input"
              defaultValue={short}
              className="col-span-3"
              onChange={(e) => {
                let success = setShort(e.target.value);
                let element = document.getElementById("short-input");
                if (element) changeElement(element, success, e.target.value.length);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Long Break
            </Label>
            <Input
              id="long-input"
              defaultValue={long}
              className="col-span-3"
              onChange={(e) => {
                let success = setLong(e.target.value);
                let element = document.getElementById("long-input");
                if (element) changeElement(element, success, e.target.value.length);
              }}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Theme
            </Label>
            <div className="flex flex-row-reverse w-100%">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

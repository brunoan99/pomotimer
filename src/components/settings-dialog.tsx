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

export function DialogDemo() {
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
              id="focus"
              defaultValue="25:00"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Short Break
            </Label>
            <Input
              id="short"
              defaultValue="5:00"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Long Break
            </Label>
            <Input
              id="long"
              defaultValue="15:00"
              className="col-span-3"
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

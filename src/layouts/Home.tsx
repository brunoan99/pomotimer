import { DialogDemo } from "@/components/settings-dialog"
import { Atkinson_Hyperlegible } from "next/font/google";
import { cn } from "@/lib/utils";
import { WatchCard } from "@/components/watch";

const atiknson = Atkinson_Hyperlegible({ subsets: ['latin'], weight: "700" });

const Home = () => (
<div className="flex flex-col">
  <div className="flex flex-row w-screen p-8 justify-between items-baseline">
    <h1 className={cn(atiknson.className, "text-[36px] select-none")}>PomoTimer</h1>
    <DialogDemo />
  </div>
  <div className="w-full flex justify-center p-8 mt-[10vh]">
    <WatchCard />
  </div>
</div>
)

export { Home }

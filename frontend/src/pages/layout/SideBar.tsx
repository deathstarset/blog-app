import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SideBarProps {
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SideBar = ({ setSideBarOpen }: SideBarProps) => {
  const closeSideBar = () => {
    setSideBarOpen(false);
  };
  return (
    <div className="bg-white w-3/4 h-full z-20 absolute top-0">
      <div className="flex items-center justify-between h-[10vh] px-3">
        <h1 className="text-xl font-bold">Dev</h1>
        <Button variant={"outline"} onClick={closeSideBar}>
          <X />
        </Button>
      </div>
    </div>
  );
};

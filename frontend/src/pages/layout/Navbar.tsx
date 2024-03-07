import { Button } from "@/components/ui/button";
import { AlignLeft } from "lucide-react";
import { Search } from "lucide-react";

interface NavBarProps {
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Navbar = ({ setSideBarOpen }: NavBarProps) => {
  const openSideBar = () => {
    setSideBarOpen(true);
  };
  return (
    <div className="flex items-center justify-between h-[10vh] w-full px-3 bg-white">
      <AlignLeft size={30} onClick={openSideBar} />
      <h1 className="text-xl font-semibold">Dev</h1>
      <Button variant={"outline"}>
        <Search />
      </Button>
      <Button variant={"outline"}>Create Account</Button>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { AlignLeft } from "lucide-react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

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
      <Link to="/" className="text-xl font-semibold">
        Dev
      </Link>
      <Button variant={"outline"}>
        <Search />
      </Button>
      <Link to="signup">
        <Button variant={"outline"}>Create Account</Button>
      </Link>
    </div>
  );
};

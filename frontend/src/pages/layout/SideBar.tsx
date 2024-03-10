import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Instagram, Facebook, Twitch, Twitter } from "lucide-react";

const sideBarLinks = ["Home", "Categories", "About", "Contact"];
const sideBarOther = ["Code of Conduct", "Privacy Policy", "Terms of use"];
const socialMediaLinks = [<Instagram />, <Facebook />, <Twitch />, <Twitter />];
interface SideBarProps {
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideBar = ({ setSideBarOpen }: SideBarProps) => {
  const closeSideBar = () => {
    setSideBarOpen(false);
  };
  return (
    <div className="bg-white w-3/4 h-full z-20 absolute top-0 px-3">
      <div className="flex items-center justify-between h-[10vh]">
        <h1 className="text-xl font-bold">Dev</h1>
        <Button variant={"outline"} onClick={closeSideBar}>
          <X />
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {sideBarLinks.map((link, index) => {
          return <a key={index}>{link}</a>;
        })}
        <Accordion type="single" collapsible className="">
          <AccordionItem value="item-1" className="border-0">
            <AccordionTrigger className="hover:no-underline p-0 pb-2 font-bold">
              Other
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-base">
              {sideBarOther.map((link, index) => {
                return (
                  <a key={index} className="p-0">
                    {link}
                  </a>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex flex-col gap-3">
          <h3>Social Media</h3>
          <div className="flex items-center gap-3">
            {socialMediaLinks.map((link, index) => {
              return <div key={index}>{link}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

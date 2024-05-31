"use client";
import { useState, useRef, useEffect } from 'react';
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useOnClickOutside } from 'usehooks-ts';
import NavigationControlBar from "@/app/(chat)/_components/navigation/ControlBar";
import NavigationFriendsBar from "@/app/(chat)/_components/navigation/FriendsBar";
import { usePathname } from 'next/navigation';
const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div className="relative">
      <div className="">
        <HamburgerMenuIcon className="w-6 h-6 text-text-primary" onClick={toggleMenu} />
      </div>
      <div className={`fixed top-0 left-0 h-full w-[437px] bg-white shadow z-50 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} duration-700`} ref={ref}>
       <div className=' w-full h-full flex items-center'>
            <NavigationControlBar />
            <NavigationFriendsBar width={437} />

       </div>
      </div>
    </div>
  );
};

export default MobileNavigation;

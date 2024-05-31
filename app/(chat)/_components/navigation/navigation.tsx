"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useMediaQuery, useResizeObserver } from "usehooks-ts";
import { DoubleArrowLeftIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useRef, useState, useEffect } from "react";
import NavigationControlBar from "./ControlBar";
import NavigationFriendsBar from "./FriendsBar";

const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const ref = useRef<HTMLDivElement>(null);
  const { width = 0 } = useResizeObserver({ ref });

  const isResizing = useRef(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    isMobile ? collapse() : resetWidth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) collapse();
  }, [pathname, isMobile]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizing.current) return;
    let newWidth = event.clientX;
    newWidth = Math.max(188, Math.min(newWidth, 437));
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.left = `${newWidth}px`;
      navbarRef.current.style.width = `calc(100% - ${newWidth}px)`;
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);
      const width = isMobile ? "100%" : "188px";
      sidebarRef.current.style.width = width;
      navbarRef.current.style.width = `calc(100% - ${width})`;
      navbarRef.current.style.left = width;
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.width = "100%";
      navbarRef.current.style.left = "0";
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const extend = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);
      sidebarRef.current.style.width = "437px";
      navbarRef.current.style.width = `calc(100% - 437px)`;
      navbarRef.current.style.left = "437px";
      setTimeout(() => setIsResetting(false), 300);
    }
  }

  return (
    <div ref={ref} className="overflow-y-auto">
    
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full overflow-y-auto border-r border-[#EBEBEB] relative flex flex-col w-[188px]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          className={cn("h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-200 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100 m-2"
          )}
          onClick={collapse}
        >
          <DoubleArrowLeftIcon className="w-6 h-6" />
        </div>
        <div className="flex w-full h-full">
          <NavigationControlBar />
          <NavigationFriendsBar width={width} extend={extend} />
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className={cn(
            "opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0",
          )}
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 left-60 w-[calc(100%-188px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full mt-7" onClick={resetWidth}>
          {isCollapsed && (
            <HamburgerMenuIcon className="w-6 h-6 text-muted-foreground" />
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navigation;

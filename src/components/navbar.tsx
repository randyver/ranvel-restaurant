"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";

const navLink: {
  name: string;
  path: string;
}[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About Us",
    path: "/about-us",
  },
  {
    name: "Menu",
    path: "/menu",
  },
  {
    name: "History",
    path: "/history",
  },
  {
    name: "Cart",
    path: "/cart",
  },
  {
    name: "Profile",
    path: "/profile",
  },
];

export default function NavBar({
  isNavBarActive,
  setIsNavBarActive,
}: {
  isNavBarActive: boolean;
  setIsNavBarActive: Dispatch<SetStateAction<boolean>>;
}) {
  const currentPath = usePathname();
  const { data: session } = useSession();

  return (
    <nav
      className="sticky left-0 right-0 top-0 z-[50] flex w-full flex-col bg-orange-200"
      id="navbar"
    >
      <div className="flex h-24 flex-row items-center justify-between px-7 xl:px-14">
        <div className="relative flex lg:align-middle">
          <Link href={"/"}>
            <Image
              className="static h-16 w-auto object-contain xl:h-20"
              src={"/ranvel-logo.png"}
              alt="Logo"
              width={400}
              height={400}
            />
          </Link>
        </div>
        <Button
          aria-label="menu"
          variant="ghost"
          size="icon"
          className="bg-transparent hover:bg-transparent lg:hidden"
          onClick={() => setIsNavBarActive(true)}
        >
          <Menu className="h-full w-full" />
        </Button>
        <div
          className={cn(
            "absolute left-0 top-0 h-screen w-screen overflow-hidden",
            isNavBarActive ? "bg-black/50" : "pointer-events-none",
            "lg:static lg:ml-auto lg:h-auto lg:w-auto"
          )}
          onClick={() => setIsNavBarActive(false)}
        >
          <div
            className={cn(
              "pointer-events-auto absolute right-0 top-0 flex h-full min-w-[215px] translate-x-full flex-col gap-5 transition-transform",
              isNavBarActive ? "translate-x-0" : "",
              "transition-transform",
              "lg:relative lg:min-w-0 lg:translate-x-0 lg:gap-0"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -z-50 h-full w-full overflow-hidden lg:hidden">
              <div className="absolute h-full w-full bg-orange-300" />
              <div className="absolute -z-10 h-full w-full bg-black" />
            </div>

            <Button
              aria-label="menu-close"
              variant="ghost"
              size="icon"
              className="ml-auto mr-4 mt-7 bg-transparent hover:bg-transparent lg:hidden"
              onClick={() => setIsNavBarActive(false)}
            >
              <X className="h-full w-full" />
            </Button>

            <ul className="m-8 flex flex-col gap-6 lg:m-0 lg:flex-row lg:items-center lg:gap-8 xl:gap-12 xl:text-lg">
              {navLink.map(({ name, path: url }) => {
                const isActive =
                  currentPath === url ||
                  (url !== "/" && currentPath.startsWith(url));
                return (
                  <li key={name} className="group relative">
                    <Link
                      href={url}
                      className={`font-medium transition-all duration-300 ease-in-out ${
                        isActive ? "font-bold text-orange-600" : "after:w-0"
                      } after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-orange-600 after:transition-all after:duration-300 after:ease-in-out group-hover:after:left-0 group-hover:after:w-full`}
                    >
                      {name}
                    </Link>
                  </li>
                );
              })}
              <li className="">
                {session ? (
                  <Button
                    size={"lg"}
                    className="px-7 text-base"
                    onClick={() => signOut()}
                  >
                    Log Out
                  </Button>
                ) : (
                  <Link className="w-fit self-center" href="/login">
                    <Button size={"lg"} className="px-8 text-base">
                      Log In
                    </Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

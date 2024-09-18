"use client";

import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

function Header({ user, profileInfo }) {
  const menuItems = [
    { label: "Home", path: "/", show: true },

    { label: "Login", path: "/sign-in", show: !user },
    { label: "Register", path: "/sign-up", show: !user },
    {
      label: "Activity",
      path: "/activity",
      show: profileInfo?.role === "candidate",
    },
    { label: "Jobs", path: "/jobs", show: user },
    { label: "Membership", path: "/membership", show: user },
    { label: "Account", path: "/account", show: user },
  ];

  return (
    <div>
      <header className="flex h-16 w-full shrink-0 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden">
              <AlignJustify className="h-6 w-6" />
              <span className="sr-only">Toggle navigation Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-white" side="left">
            <Link className="mr-6 hidden lg:flex " href={"#"}>
              <h3 className="text-3xl font-bold">JOBSCO</h3>
            </Link>
            <div className="grid gap-2 py-6">
              {menuItems.map((item) =>
                item.show ? (
                  <Link
                    className="group inline-flex w-full items-center py-2 text-lg font-semibold"
                    href={item.path}
                    onClick={() => sessionStorage.removeItem("filterParams")}
                    key={item.label}
                  >
                    {item.label}
                  </Link>
                ) : null
              )}
              <UserButton afterSwitchSessionUrl="/" />
            </div>
          </SheetContent>
        </Sheet>

        <Link
          className="hidden lg:flex mr-6 text-2xl font-bold italic text-red-600"
          href={"/"}
        >
          JOBSCO
        </Link>
        <nav className="ml-auto hidden lg:flex gap-6">
          {menuItems.map((item) =>
            item.show ? (
              <Link
                href={item.path}
                key={item.label}
                className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium"
              >
                {item.label}
              </Link>
            ) : null
          )}
          <UserButton afterSwitchSessionUrl="/" />
        </nav>
      </header>
    </div>
  );
}

export default Header;

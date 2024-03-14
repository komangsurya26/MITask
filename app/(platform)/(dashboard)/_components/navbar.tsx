"use client"

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";
import { FormPopover } from "@/components/forms/form-popover";

export const Navbar = () => {
    return (
      <nav className="fixed z-50 px-4 top-0 w-full h-14 border-b shadow-sm bg-white flex items-center">
        <MobileSidebar />
        <div className="flex items-center gap-x-4">
          <div className="hidden md:flex">
            <Logo />
          </div>

          {/* desktop navbar */}
          <FormPopover align="start" side="bottom" sideOffset={18}>
            <Button
              variant={"primary"}
              size={"sm"}
              className="rounded-sm hidden md:block h-auto py-1.5 px-2"
            >
              Buat Rencana
            </Button>
          </FormPopover>

          {/* mobile navbar */}
          <FormPopover>
            <Button
              variant={"primary"}
              size={"sm"}
              className="rounded-sm block md:hidden"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </FormPopover>
        </div>

        <div className="ml-auto flex items-center gap-x-2">
          <OrganizationSwitcher
            hidePersonal
            afterCreateOrganizationUrl={"/organization/:id"}
            afterLeaveOrganizationUrl="/select-org"
            afterSelectOrganizationUrl={"/organization/:id"}
            appearance={{
              elements: {
                rootBox: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              },
            }}
          />
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: {
                  height: 30,
                  width: 30,
                },
              },
            }}
          />
        </div>
      </nav>
    );
}
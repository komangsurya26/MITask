"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import { NavItem, Organization } from "./nav-item";

interface SidebarProps {
  storageKey: string;
}


export const Sidebar = ({ storageKey = "t-sidebar-mobile-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !expanded[id] }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]"/>
          <Skeleton className="h-10 w-10"/>
        </div>
        <div className="space-y-5">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="mb-1 font-medium text-xs flex items-center">
        <span className="pl-2 font-semibold text-lg">Ruang Kerja</span>
        <Button
          asChild
          type="button"
          size={"icon"}
          variant={"ghost"}
          className="ml-auto"
        >
          <Link href={"/select-org"}>
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={organization.id === activeOrganization?.id}
            isExpanded={expanded[organization.id]}
            onExpand={onExpand}
            organization={organization as Organization}
          />
        ))}
      </Accordion>
    </>
  );
};



"use client"

import { Button } from "@/components/ui/button";
import Youtube from "@/public/youtube.svg";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
      <div className="md:max-w-screen-xl mx-auto flex items-center w-full justify-end">
        <div className="sm:space-x-4 md:block md:w-auto flex items-center w-full">
          <Button size={"sm"} variant={"ghost"}>
            <Link href="/">Developed By Komang Surya</Link>
          </Button>
          <Button size={"sm"} variant={"ghost"}>
            <Link
              className="flex items-center gap-x-2"
              href="https://www.youtube.com/watch?v=pRybm9lXW2c&t=30214s"
            >
              <p>Reference</p>
              <p className="hidden sm:block">By Antonio</p>
              <Image src={Youtube} alt="youtube"></Image>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

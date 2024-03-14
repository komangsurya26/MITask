import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import logo from '@/public/logo.svg'


const headingFont = localFont({
    src: "../../public/fonts/font.woff2",
})

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src={logo} width={30} height={30} alt="logo" />
        <p
          className={cn("text-lg text-neutral-700 pb-1", headingFont.className)}
        >
          MITask
        </p>
      </div>
    </Link>
  );
};

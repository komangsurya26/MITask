import Link from "next/link";
import localFont from "next/font/local";
import { NotebookText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

const textFont = Poppins({
  weight: ["100", "200", "300", "400", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          "flex items-center justify-center flex-col",
          headingFont.className
        )}
      >
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <NotebookText className="h-6 w-6 mr-2" />
          aplikasi task manajer
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          MITask membantu anda
        </h1>
        <div className="text-3xl md:text-6xl text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
          lebih efisien
        </div>
      </div>

      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
          textFont.className
        )}
      >
        MITask adalah aplikasi manajemen tugas yang inovatif, dirancang untuk
        membantu Anda dan tim Anda mencapai tingkat efisiensi yang lebih tinggi
        dalam pekerjaan sehari-hari.
      </div>

      <Button className="mt-8">
        <Link href="/sign-up">UJI COBA GRATIS</Link>
      </Button>
    </div>
  );
};
export default MarketingPage;
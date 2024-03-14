import { ClerkLoading } from "@clerk/nextjs";
import loading from '@/public/loading.svg'
import Image from "next/image";

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-center">
      <ClerkLoading>
        <Image className="w-5 h-5 mr-2" src={loading} alt="loading" />
        <p>Loading...</p>
      </ClerkLoading>
      <div>{children}</div>
    </div>
  );
};

export default ClerkLayout;

import { Navbar } from "./_components/navbar";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default DashBoardLayout;

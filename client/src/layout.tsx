import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full max-h-screen h-screen overflow-auto flex flex-col md:flex-row">
      <div className="w-full min-h-48 md:h-full md:max-w-xl animate-gradient absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_100%_100%_at_20%_0%,#000_65%,transparent_100%)]" />
      {children}
    </div>
  );
};

export default Layout;


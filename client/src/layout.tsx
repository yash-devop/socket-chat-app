import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full max-h-screen h-screen overflow-auto flex flex-col md:flex-row">
      <div className="w-full min-h-48 md:h-full md:max-w-xl animate-gradient" />
      {children}
    </div>
  );
};

export default Layout;

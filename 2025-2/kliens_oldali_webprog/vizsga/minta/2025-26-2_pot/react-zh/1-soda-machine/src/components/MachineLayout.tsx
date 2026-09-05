import type { ReactNode } from "react";

type MachineLayoutProps = {
  children: ReactNode;
};

function MachineLayout({ children }: MachineLayoutProps) {
  return (
    <div className="page">
      <div className="vending-machine">
        <header className="vending-top">
          <h1>Zöldségautomata</h1>
        </header>

        <div className="vending-screen">
          Vegyél sok-sok finom zöldséget!
        </div>

        {children}

        <div className="vending-feet" aria-hidden="true">
          <span className="vending-foot" />
          <span className="vending-foot" />
        </div>
      </div>
    </div>
  );
}

export default MachineLayout;

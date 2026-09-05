// src/components/KioskLayout.tsx
import type { ReactNode } from "react";

interface KioskLayoutProps {
  title: string;
  screen: ReactNode;
  bodyClassName?: string;
  children: ReactNode;
}

const KioskLayout = ({
  title,
  screen,
  bodyClassName = "",
  children,
}: KioskLayoutProps) => {
  return (
    <section className="page">
      <div className="padel-kiosk">
        <div className="padel-kiosk-top">
          <h1>{title}</h1>
        </div>

        <div className="padel-kiosk-screen">{screen}</div>

        <div className={`padel-kiosk-body ${bodyClassName}`.trim()}>
          {children}
        </div>

        <div className="padel-kiosk-feet">
          <span className="padel-kiosk-foot" />
          <span className="padel-kiosk-foot" />
        </div>
      </div>
    </section>
  );
};

export default KioskLayout;

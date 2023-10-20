import React, { useState } from "react";
import Link from "next/link";
import { clsxm } from "@/utils/clsxm";
import { PersonIcon } from "@/components/svgs/PersonIcon";
import { MenuIcon } from "@/components/svgs/MenuIcon";
import { LogOutIcon } from "@/components/svgs/LogOut";
import { Logo } from "@/components/svgs/Logo";
import { HomeIcon } from "@/components/svgs/HomeIcon";
import { CloseIcon } from "@/components/svgs/CloseIcon";
import { useRouter } from "next/router";
import { useLogout } from "@/services/useApi";

interface Routes {
  label: string;
  icon?: React.ReactNode;
  route?: string;
  onClick?: () => void;
}

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const { mutateAsync: logOut } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const [triggerClose, setTriggerClose] = useState(false);

  const openSidebar = () => setIsOpen(true);

  const closeSidebar = () => {
    setTriggerClose(true);
    setTimeout(() => {
      setIsOpen(false);
      setTriggerClose(false);
    }, 300);
  };

  const handleLogOut = async () => {
    const { error } = await logOut();
    if (!error) {
      router.replace("/");
    }
  };

  const routes: Routes[] = [
    {
      label: "Home",
      route: "/budget",
      icon: <HomeIcon color="white" />,
    },
    {
      label: "Profile",
      route: "/profile",
      icon: <PersonIcon color="white" />,
    },
    {
      label: "Log out",
      onClick: handleLogOut,
      icon: <LogOutIcon color="white" />,
    },
  ];

  return (
    <>
      <button onClick={openSidebar} className="p-2">
        <MenuIcon />
      </button>
      {isOpen ? (
        <>
          <div
            onClick={closeSidebar}
            className={clsxm(
              "fixed inset-0 z-10 h-full bg-black/60 animate__animated animate__fadeIn",
              { animate__fadeOut: triggerClose }
            )}
          />
          <aside
            className={clsxm(
              "fixed inset-0 left-1/4 z-10 h-full bg-blue-500 py-4 flex flex-col gap-4 animate__animated animate__slideInRight animate__faster lg:left-2/3",
              { animate__slideOutRight: triggerClose }
            )}
          >
            <button className="absolute top-4 left-4" onClick={closeSidebar}>
              <CloseIcon color="white" height="32px" width="32px" />
            </button>
            <div className="w-full flex justify-center">
              <Logo height="120px" />
            </div>
            <nav className="grid gap-2">
              {routes.map(({ label, route, icon, onClick }, index) =>
                route ? (
                  <Link
                    key={index}
                    href={route}
                    className="flex gap-4 w-full p-4 text-white font-semibold hover:bg-blue-600"
                  >
                    {icon} <span>{label}</span>
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={onClick}
                    className="flex gap-4 w-full p-4 text-white font-semibold hover:bg-blue-600"
                  >
                    {icon} <span>{label}</span>
                  </button>
                )
              )}
            </nav>
          </aside>
        </>
      ) : null}
    </>
  );
};

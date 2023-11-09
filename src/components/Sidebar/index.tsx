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
import { useLogout } from "@/hooks/useApi";

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
              "animate__animated animate__fadeIn fixed inset-0 z-10 h-full bg-black/60",
              { animate__fadeOut: triggerClose }
            )}
          />
          <aside
            className={clsxm(
              "animate__animated animate__slideInRight animate__faster fixed inset-0 left-1/4 z-10 flex h-full flex-col gap-4 bg-blue-500 py-4 lg:left-2/3",
              { animate__slideOutRight: triggerClose }
            )}
          >
            <button className="absolute left-4 top-4" onClick={closeSidebar}>
              <CloseIcon color="white" height="32px" width="32px" />
            </button>
            <div className="flex w-full justify-center">
              <Logo height="120px" />
            </div>
            <nav className="grid gap-2">
              {routes.map(({ label, route, icon, onClick }, index) =>
                route ? (
                  <Link
                    key={index}
                    href={route}
                    className="flex w-full gap-4 p-4 font-semibold text-white hover:bg-blue-600"
                  >
                    {icon} <span>{label}</span>
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={onClick}
                    className="flex w-full gap-4 p-4 font-semibold text-white hover:bg-blue-600"
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

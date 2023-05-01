import React from "react";
import { useRouter } from "next/router";
import { clsxm } from "@/utils/clsxm";

interface Props {
  title: string;
  showBack?: boolean;
  alignText?: "left" | "center" | "right";
}

export const Header: React.FC<Props> = ({
  title,
  showBack,
  alignText = "left",
}) => {
  const router = useRouter();
  return (
    <header className="flex w-full gap-2 items-center pb-4">
      {showBack ? (
        <button onClick={() => router.back()} className="flex items-center p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 96 960 960"
            width="24"
          >
            <path d="M435 868 171 604q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l264-264q11-11 27.5-11.5T491 284q12 11 12.5 27.5T492 340L296 536h447q17 0 28.5 11.5T783 576q0 17-11.5 28.5T743 616H296l196 196q11 11 11.5 28T492 868q-11 12-28 12t-29-12Z" />
          </svg>
        </button>
      ) : null}
      <h1
        className={clsxm(
          "text-2xl leading-none font-semibold flex-grow",
          `text-${alignText}`
        )}
      >
        {title}
      </h1>
    </header>
  );
};

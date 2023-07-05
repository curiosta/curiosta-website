import { useSignal } from "@preact/signals";
import Button from "./Button";
import type { FunctionComponent } from "preact";

type TOpenMaking = {
  title: string;
};

const OpenMakingNav: FunctionComponent<TOpenMaking> = ({ title }) => {
  const isOpenMakingNav = useSignal<boolean>(false);

  const openMakingPages = [
    {
      title: "Intro",
      link: "/open-making",
    },
    {
      title: "Our Model",
      link: "/open-making/our-model",
    },
    {
      title: "Manufacturers",
      link: "/open-making/manufacturers",
    },
    {
      title: "Build",
      link: "/open-making/build",
    },
    {
      title: "Collaboration",
      link: "/open-making/collaboration",
    },
  ];

  const activeTitle = openMakingPages.find(
    (page) => page.title.toLowerCase() === title.toLowerCase()
  )?.title;

  return (
    <nav class="flex justify-center  bg-gray-50 p-0 sm:p-4">
      <ul
        role="list"
        class={`flex  gap-x-8 mx-4 overflow-x-auto sm:overflow-hidden p-4 sm:p-0`}
      >
        {openMakingPages.map((page) => (
          <li
            className={`whitespace-nowrap ${
              page.title === activeTitle
                ? "font-semibold  border-b border-gray-400"
                : ""
            }`}
          >
            <a
              href={page.link}
              class="text-base leading-6 text-gray-600 hover:text-gray-900"
            >
              {page.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default OpenMakingNav;

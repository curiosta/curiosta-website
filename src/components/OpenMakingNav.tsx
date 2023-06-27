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
    <nav class="sm:flex justify-center bg-gray-50 sm:p-4 ">
      <Button
        type="button"
        variant="icon"
        className={"!w-full sm:hidden !px-4 !justify-start"}
        onClick={() => (isOpenMakingNav.value = !isOpenMakingNav.value)}
      >
        {!isOpenMakingNav.value ? (
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            ></path>
          </svg>
        ) : (
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        )}
      </Button>
      <ul
        role="list"
        class={`sm:flex flex-wrap gap-x-8 p-2 sm:p-0  ${
          isOpenMakingNav.value ? "block" : "hidden"
        } `}
      >
        {openMakingPages.map((page) => (
          <li
            className={`px-4 py-2 sm:p-0 ${
              page.title === activeTitle
                ? "font-semibold bg-white sm:bg-transparent sm:border-b sm:border-gray-400"
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

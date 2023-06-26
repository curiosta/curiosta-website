import { useSignal } from "@preact/signals";
import Button from "@components/Button";

const TermsNav = () => {
  const openTermsNav = useSignal<boolean>(false);

  const termsPages = [
    {
      title: "Terms of use",
      link: "/terms",
    },
    {
      title: "Privacy Policy",
      link: "/terms/privacy",
    },
    {
      title: "Shipping policy",
      link: "/terms/shipping-policy",
    },

    {
      title: "Return policy",
      link: "/terms/return-policy",
    },
  ];

  const activeLink = window.location.pathname;

  return (
    <nav>
      <Button
        type="button"
        variant="icon"
        className={"!w-full lg:hidden !justify-start"}
        onClick={() => (openTermsNav.value = !openTermsNav.value)}
      >
        {!openTermsNav.value ? (
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
        class={`space-y-3 lg:block p-4 transition-all ${
          openTermsNav.value ? "block" : "hidden"
        }`}
      >
        {termsPages.map((page) => (
          <li
            class={`${
              page.link === activeLink ? "bg-white font-semibold" : ""
            } px-4 py-2`}
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

export default TermsNav;

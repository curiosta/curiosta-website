const TermsNav = () => {
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
    <nav class="p-4">
      <ul role="list" class="space-y-3">
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

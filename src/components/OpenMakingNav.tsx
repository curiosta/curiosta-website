const OpenMakingNav = () => {
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

  return (
    <nav class="p-4 flex justify-center bg-gray-50 ">
      <ul role="list" class="flex flex-wrap gap-x-8">
        {openMakingPages.map((page) => (
          <li>
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

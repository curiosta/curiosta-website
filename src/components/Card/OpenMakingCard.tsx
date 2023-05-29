import Typography from "@components/Typography";

interface Props {
  page: { title: string; description: string; image: string; link: string };
}

const OpenMakingCard = ({ page }: Props) => {
  return (
    <div class="relative w-full pb-4 ring-1 ring-inset ring-gray-900/10">
      <img
        src={page.image}
        alt={"maker"}
        class="aspect-[16/9] w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
      />

      <div class="max-w-xl px-4">
        <div class="group">
          <Typography
            tag="h3"
            variant="primary"
            size="subheading/medium"
            className="mt-3 leading-6 group-hover:text-gray-600"
          >
            <a href={page.link}>
              <span class="absolute inset-0" />
              {page.title}
            </a>
          </Typography>
          <Typography
            size="body2/normal"
            variant="secondary"
            className="line-clamp-3  leading-6"
          >
            {page.description}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default OpenMakingCard;

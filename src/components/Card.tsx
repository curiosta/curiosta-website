interface Props {
  title: string;
  shortDescription: string;
  imageSrc: string;
  id: string;
  variants: {
    id: string;
    title: string;
    prices: {
      currency_code: string;
      amount: number;
    }[];
  }[];
}

const Card = ({ id, imageSrc, title, shortDescription, variants }: Props) => {
  return (
    <div class="card">
      <div class="group relative">
        <div class="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
          <img
            src={imageSrc}
            alt={title}
            class="h-full w-full object-cover object-center"
          />
        </div>
        <h3 class="mt-4 text-sm text-gray-700">
          <a href={`/products/${id}`}>
            <span class="absolute inset-0"></span>
            {title}
          </a>
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          {shortDescription.slice(0, 30) + "..."}
        </p>
        <p class="mt-1 text-sm font-medium text-gray-900">
          ${variants[0].prices[1].amount}
        </p>
      </div>
    </div>
  );
};

export default Card;

import Typography from "@components/Typography";
import Tooltip from "./Tooltip";

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
        <Typography size="body2/medium" variant="secondary" className="mt-4 ">
          <a href={`/products/${id}`}>
            <span class="absolute inset-0"></span>
            {title}
          </a>
        </Typography>
        <Typography size="body2/normal" variant="secondary" className="mt-1 ">
          {shortDescription.slice(0, 30) + "..."}
        </Typography>
        <Typography size="body2/medium" variant="primary" className="mt-1 ">
          ${variants[0].prices[1].amount / 100}
        </Typography>
      </div>
    </div>
  );
};

export default Card;

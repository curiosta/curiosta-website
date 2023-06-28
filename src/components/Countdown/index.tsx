import Typography from "@components/Typography";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

const index = () => {
  const counter = useSignal<number>(5);

  function startCountdown() {
    const interval = setInterval(() => {
      counter.value--;
      if (counter.value <= 0) {
        clearInterval(interval);
        location.href = "/orders";
      }
    }, 1000);
  }

  useEffect(() => {
    startCountdown();
  }, []);

  return (
    <Typography variant="secondary" className="mt-4">
      Redirecting you to orders page in {counter.value} seconds
    </Typography>
  );
};

export default index;

import cart from "@api/cart";
import Button from "@components/Button";
import Typography from "@components/Typography";
import { useSignalEffect } from "@preact/signals";
import priceToCurrency from "@utils/priceToCurrency";
import { generateUPIQr } from "@utils/upiQrGenerator";
import { useRef, useState } from "preact/hooks";

const UpiQr = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [totalAmount, setTotalAmount] = useState(0);
  useSignalEffect(() => {
    const total = cart.store.value?.total;
    if (total && total > 1) {
      setTotalAmount(total);
    }
    const orderId = cart.orderStore.value?.data.id;
    if (total && orderId && canvasRef.current) {
      generateUPIQr(total / 100, orderId, canvasRef.current);
    }
  });
  return (
    <div className={`flex flex-col justify-center items-center h-full w-full`}>
      <Typography size="h5/semi-bold" className="text-gray-800 sm:text-3xl">
        Scan and Pay with UPI
      </Typography>
      <canvas class="border-gray-800 border-4 my-4" ref={canvasRef} />

      <Typography size="h6/normal">
        Your total order is of{" "}
        {totalAmount ? priceToCurrency(totalAmount) : "N/A"}
      </Typography>

      <Typography size="body1/normal" variant="primary" className="text-center">
        You'll receive a cofirmation email within 48 hours of the payment.
      </Typography>
      <Button
        link={`/orders/${cart.orderStore.value?.data.id}`}
        className="!w-fit my-4"
      >
        Check your order
      </Button>
    </div>
  );
};

export default UpiQr;

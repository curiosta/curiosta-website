import qrcodegen from "nayuki-qr-code-generator";
const QRC = qrcodegen.QrCode;
const errCorLvl = QRC.Ecc.MEDIUM;

// Draws the given QR Code, with the given module scale and border modules, onto the given HTML
// canvas element. The canvas's width and height is resized to (qr.size + border * 2) * scale.
// The drawn image is purely dark and light, and fully opaque.
// The scale must be a positive integer and the border must be a non-negative integer.
function drawCanvas(
  qr: qrcodegen.QrCode,
  scale: number,
  border: number,
  lightColor: string,
  darkColor: string,
  canvas: HTMLCanvasElement
): void {
  if (scale <= 0 || border < 0) throw new RangeError("Value out of range");
  const width: number = (qr.size + border * 2) * scale;
  canvas.width = width;
  canvas.height = width;
  let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  for (let y = -border; y < qr.size + border; y++) {
    for (let x = -border; x < qr.size + border; x++) {
      ctx.fillStyle = qr.getModule(x, y) ? darkColor : lightColor;
      ctx.fillRect((x + border) * scale, (y + border) * scale, scale, scale);
    }
  }
}

const UPI_ID = "paytmqrqhl5t55owi@paytm";
const Payee_Name = "Curiosta";
export const generateUPIQr = (
  amount: number,
  orderId: string,
  canvas: HTMLCanvasElement
) => {
  const UPI_Link = `upi://pay?pa=${UPI_ID}&pn=${Payee_Name}&am=${amount}&tid=${orderId}&tn=curiosta-order`;
  const qr0 = QRC.encodeText(UPI_Link, errCorLvl);
  drawCanvas(qr0, 5, 2, "#ffffff", "#000000", canvas);
};

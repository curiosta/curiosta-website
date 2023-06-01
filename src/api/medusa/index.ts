import Medusa from "@medusajs/medusa-js";

if (!import.meta.env.PUBLIC_BASE_URL) {
  throw new Error("Couldn't find medusa's url!")
}

const medusa = new Medusa({
  baseUrl: import.meta.env.PUBLIC_BASE_URL,
  maxRetries: 3,
});

export default medusa;

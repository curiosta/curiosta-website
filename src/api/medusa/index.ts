import Medusa from '@medusajs/medusa-js';

const medusa = new Medusa({
  baseUrl: import.meta.env.PUBLIC_BASE_URL,
  maxRetries: 3,
});

export default medusa;
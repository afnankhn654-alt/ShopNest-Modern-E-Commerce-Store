
export const PAYMENT_CONFIG = {
  STRIPE: {
    SECRET_KEY: process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_key",
    PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY || "pk_test_placeholder_key"
  },
  PAYPAL: {
    CLIENT_ID: process.env.PAYPAL_CLIENT_ID || "sb-client-id-placeholder",
    SECRET: process.env.PAYPAL_SECRET || "sb-secret-placeholder"
  },
  JAZZCASH: {
    MERCHANT_ID: process.env.JAZZCASH_MERCHANT_ID || "jc_merchant_placeholder",
    PASSWORD: process.env.JAZZCASH_PASSWORD || "jc_password_placeholder",
    INTEGRITY_SALT: process.env.JAZZCASH_INTEGERITY_SALT || "jc_salt_placeholder"
  },
  EASYPAISA: {
    API_KEY: process.env.EASYPAY_API_KEY || "ep_api_key_placeholder",
    STORE_ID: process.env.EASYPAY_STORE_ID || "ep_store_id_placeholder"
  }
};

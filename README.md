# Mercado Pago - Integration

Testing different integration types with Mercado Pago:

- [Redirect user to Mercado Pago page](https://www.mercadopago.cl/developers/es/guides/payments/web-payment-checkout/customizations/)
- [Checkout Mercado Pago](https://www.mercadopago.cl/developers/es/guides/payments/web-payment-checkout/introduction/)
- [Open modal with Mercado Pago form](https://www.mercadopago.cl/developers/es/guides/payments/web-tokenize-checkout/introduction/)

## Setting environment

### Generate certificates for testing

Use [mkcert](https://github.com/FiloSottile/mkcert) for generate auto sign certificates for local testing purposes

```bash
mkcert domain.com
```

### Edit `/etc/hosts`

```
127.0.0.1 domain.com
```

### Configure environment and install dependencies

```bash
# Copy and complete
cp .env.dist .env

yarn install
```

## Running

```bash
# In development
yarn run dev

# In production
yarn run start
```

## References

- [Credentials](https://www.mercadopago.com/mlc/account/credentials)
- [Credit cards for testing](https://www.mercadopago.cl/developers/es/guides/payments/web-payment-checkout/test-integration/)

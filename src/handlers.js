/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import mercadoPago from 'mercadopago';

import logger from './logger';
import { MP_PUBLIC_KEY, MP_ACCESS_TOKEN, APP_URL, PORT } from './config';

mercadoPago.configure({
  access_token: MP_ACCESS_TOKEN,
});

async function home(_req, res) {
  const { body } = await mercadoPago.preferences.create({
    payer: {
      name: 'Some',
      surname: 'Some',
      email: 'some@gmail.com',

      phone: {
        area_code: '569',
        number: 555555555,
      },

      identification: {
        type: 'RUT',
        number: '11.111.111-1',
      },

      address: {
        street_name: 'Some Ave',
        street_number: 1004,
        zip_code: '9293722',
      },
    },

    payment_methods: {
      excluded_payment_methods: [
        // { id: 'master' },
        { id: 'webpay' },
        // { id: 'servipag' },
        { id: 'debmaster' },
        { id: 'debvisa' },
      ],
      excluded_payment_types: [
        { id: 'ticket' },
        { id: 'atm' },
        { id: 'debit_card' },
        // 'credit_card',
        { id: 'prepaid_card' },
      ],
      default_payment_method_id: 'master',
      installments: 3,
      default_installments: 3,
    },

    items: [
      {
        id: '1234',
        title: 'Cajita 23 Productos',
        description: 'Cajita con 23 exquisitos productos para deleitar tu paladar',
        category_id: 'others',
        quantity: 1,
        currency_id: 'CLP',
        unit_price: 10000,
      },
      {
        id: '1235',
        title: 'Cajita 33 Productos',
        description: 'Cajita con 23 exquisitos productos para deleitar tu paladar',
        category_id: 'others',
        quantity: 2,
        currency_id: 'CLP',
        unit_price: 20000,
      },
      {
        id: '1236',
        title: 'Cajita 43 Productos',
        description: 'Cajita con 23 exquisitos productos para deleitar tu paladar',
        category_id: 'others',
        quantity: 3,
        currency_id: 'CLP',
        unit_price: 30000,
      },
    ],

    external_reference: 'JG00001',

    back_urls: {
      success: `${APP_URL}:${PORT}/payment-result/success`,
      failure: `${APP_URL}:${PORT}/payment-result/failure`,
      pending: `${APP_URL}:${PORT}/payment-result/pending`,
    },
    auto_return: 'all', // 'approved',

    // binary_mode: true, // Set true for allow only success/rejected, not pending

    // notification_url: 'https://requestinspector.com/inspect/01ec5e77s4pya429kydsw7q8qf',
  });

  logger.debug(body);

  const { id, init_point } = body;
  const publicKey = MP_PUBLIC_KEY;
  const paymentProcessUrl = `${APP_URL}:${PORT}/payment-process`;
  const tokenizePaymentProcessUrl = `${APP_URL}:${PORT}/tokenize-payment-process`;

  res.render('pages/index.html', {
    id,
    init_point,
    publicKey,
    paymentProcessUrl,
    tokenizePaymentProcessUrl,
  });
}

function paymentProcess(req, res) {
  const { params, query, body } = req;

  logger.debug({ params, query, body });

  res.render('pages/result.html');
}

async function tokenizePaymentProcess(req, res) {
  const { params, query, body } = req;

  logger.debug({ params, query, body });

  const { token, installments, issuer_id, payment_method_id } = body;

  const data = await mercadoPago.payment.save({
    transaction_amount: 10000,
    token,
    description: 'Synergistic Wooden Bench',
    installments: parseInt(installments, 10),
    payment_method_id,
    issuer_id,
    payer: {
      email: 'some@gmail.com',
    },
  });

  logger.debug({ data });

  res.render('pages/result.html');
}

/**
 * Process and log errors
 */
function errorHandler(err, _req, res, _next) {
  logger.error(err.message, { err });

  res.send({ message: err.message });
}

export { home, paymentProcess, tokenizePaymentProcess, errorHandler };

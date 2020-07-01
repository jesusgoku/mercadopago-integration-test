import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import * as handlers from './handlers';

const routes = Router();

routes.get('/', asyncHandler(handlers.home));
routes.all('/payment-process/:status', handlers.paymentProcess);
routes.all('/payment-process', handlers.paymentProcess);
routes.all('/tokenize-payment-process', asyncHandler(handlers.tokenizePaymentProcess));

routes.use(handlers.errorHandler);

export default routes;

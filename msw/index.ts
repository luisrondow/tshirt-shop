import { http, HttpResponse } from 'msw'

import shirtsMock from './mocks/shirts.json'
import shippingMethodsMock from './mocks/shipping-methods.json'

export default defineNuxtMswOption(() => {
  const baseURL = 'http://localhost:3000'

  const handlers = [
    http.get((import.meta.server ? baseURL : '') + '/api/shirts', () => {
      return HttpResponse.json(shirtsMock)
    }),
    http.get((import.meta.server ? baseURL : '') + '/api/shipping-methods', ({ request }) => {
      const url = new URL(request.url)

      const itemsQuantity = url.searchParams.get('quantity')

      if (!itemsQuantity) {
        return new HttpResponse(null, { status: 400, statusText: 'Missing quantity parameter' })
      }

      if (parseInt(itemsQuantity) < 1) {
        return new HttpResponse(null, { status: 400, statusText: 'Quantity must be greater than 0' })
      }

      const filteredShippingMethods = shippingMethodsMock.filter(
        (method) =>
          Number(method.min) <= parseInt(itemsQuantity) && (method.max ?? Infinity) >= parseInt(itemsQuantity),
      )

      return HttpResponse.json(filteredShippingMethods)
    }),
  ]
  return {
    baseURL, // Required when using `$fetch` or `useFetch` with no `baseURL` and relative path
    handlers,
    workerOptions: {
      // ... pass options to worker.start()
    },
    serverOptions: {
      // ... pass options to server.listen()
    },
  }
})
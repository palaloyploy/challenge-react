import fetch from 'isomorphic-fetch';

export const getCharities = () => {
  return fetch('http://localhost:3001/charities').then(function (resp) {
    return resp.json();
  });
};

export const getPayments = () => {
  return fetch('http://localhost:3001/payments').then(function (resp) {
    return resp.json();
  });
};

export const postPayment = (payload) => {
  return fetch('http://localhost:3001/payments', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      charitiesId: payload.id,
      amount: payload.amount,
      currency: payload.currency,
    }),
  }).then((resp) => resp.json());
};

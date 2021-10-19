const formatMoney = money =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
    .format(money)
    .replace(/\D00$/, '');

export default formatMoney;

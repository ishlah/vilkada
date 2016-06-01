import numeral from 'numeral';

// Dougnut chart colors
export const colors = [
  '#b2182b',
  '#d6604d',
  '#f4a582',
  '#fddbc7',
  '#f7f7f7',
  '#d1e5f0',
  '#92c5de',
  '#4393c3',
  '#2166ac'
];

// load a language
numeral.language('id', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: 'rb',
    million: 'jt',
    billion: 'ml',
    trillion: 'tr'
  },
  ordinal : function (number) {
    return number === 1 ? 'er' : 'ke-';
  },
  currency: {
    symbol: 'Rp'
  }
});

// switch between langu.ges
numeral.language('id');
export default numeral;
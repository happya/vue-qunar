// eslint-disable-next-line
/* eslint-disable */
let defaultCity = '上海';
try {
  if (localStorage.city) {
    defaultCity = localStorage.city;
  }
} catch (error) {}

export default {
  city: defaultCity,
};

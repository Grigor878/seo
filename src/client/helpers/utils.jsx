import { languages } from "../services/i18next/data";

// Email Validator
export function isValidEmail(mail) {
  return /\S+@\S+\.\S+/.test(mail);
}
// random number
export function random(num) {
  return Math.floor(Math.random() * num);
}

// current year
export function getCurrentYear() {
  return new Date().getFullYear();
}

// debounce
export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

//
export function isMainPage(pathname) {
  const languagePattern = new RegExp(`^/(${languages.join("|")})$`);
  return languagePattern.test(pathname);
}
const cards = document.querySelector(".cards");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-button");
const phoneDetailsCard = document.getElementById("phone-details");

const searchResult = document.getElementById("search-results");
const searchError = document.getElementById("search-error");

const PHONE_API = `https://openapi.programming-hero.com/api/phones?search`;
const DETAIL_API = `https://openapi.programming-hero.com/api/phone`;

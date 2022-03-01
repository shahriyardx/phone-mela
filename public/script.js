const cards = document.querySelector(".cards");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-button");
const phoneDetailsCard = document.getElementById("phone-details");

const searchResult = document.getElementById("search-results");
const searchError = document.getElementById("search-error");

const PHONE_API = `https://openapi.programming-hero.com/api/phones?search`;
const DETAIL_API = `https://openapi.programming-hero.com/api/phone`;


// Add click event handler to search button
searchButton.addEventListener("click", () => {
  const searchText = searchInput.value.trim();
  const inputError = document.getElementById("input-error");
  
  if (!searchText) {
    return (inputError.textContent = "Please enter a search term");
  }

  inputError.textContent = "";

  fetch(`${PHONE_API}=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      searchResult.classList.remove("hidden");
      cards.textContent = "";

      if (!data.status) {
        return searchError.classList.remove("hidden");
      } else {
        searchError.classList.add("hidden");
      }

      const allPhones = data.data;
      const showPhones = allPhones.slice(0, 20);

      showCards(showPhones);
    });
});

// Shows cards into the DOM/UI
const showCards = (phones) => {
  let html = "";
  phones.forEach((phone) => {
    html += `
          <div class="card">
            <div class="image">
              <img src="${phone.image}" alt="">
            </div>

            <div class="info">
              <h2>${phone.phone_name}</h2>
              <h3>${phone.brand}</h3>
              <button onclick="showDetails(event, '${phone.slug}')">Details</button>
            </div>
          </div>
          `;
  });

  cards.innerHTML = html;
};

// Closes details popup
const closeDetails = () => {
  phoneDetailsCard.classList.add("hidden");
  document.querySelector("body").classList.remove("overflow-y-hidden");
  document.querySelector("body").classList.add("overflow-y-scroll");
};

// Show details function -> invoked from the details button of each card
const showDetails = (event, id) => {
  event.target.innerHTML = '<i class="bx bx-loader-alt animate-spin"></i>'

  fetch(`${DETAIL_API}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const phoneData = data.data;
      phoneDetailsCard.querySelector("#details-image").src = phoneData.image;
      phoneDetailsCard.querySelector("#details-name").textContent =
        phoneData.name;
      if (phoneData.releaseDate) {
        phoneDetailsCard.querySelector("#details-status").textContent =
          phoneData.releaseDate;
      } else {
        phoneDetailsCard.querySelector("#details-status").textContent =
          "Unreleased";
      }

      const mainFeaturesTable =
        phoneDetailsCard.querySelector("#main-features");
      const otherFeaturesTable =
        phoneDetailsCard.querySelector("#other-features");

      mainFeaturesTable.textContent = "";
      otherFeaturesTable.textContent = "";

      addRow(mainFeaturesTable, "Brand", phoneData.brand);
      addRow(mainFeaturesTable, "Storage", phoneData.mainFeatures.storage);
      addRow(
        mainFeaturesTable,
        "Display Size",
        phoneData.mainFeatures.displaySize
      );
      addRow(mainFeaturesTable, "Chipset", phoneData.mainFeatures.chipSet);
      addRow(mainFeaturesTable, "Memory", phoneData.mainFeatures.memory);

      addRow(
        otherFeaturesTable,
        "Sensors",
        phoneData.mainFeatures.sensors.join(", ")
      );

      for (const key in phoneData.others) {
        addRow(otherFeaturesTable, key, phoneData.others[key]);
      }

      phoneDetailsCard.classList.remove("hidden");
      event.target.innerHTML = 'Details';
      document.querySelector('body').classList.add('overflow-y-hidden');
      document.querySelector("body").classList.remove("overflow-y-scroll");
    });
};

// Add row to the table
const addRow = (table, title, value) => {
  table.innerHTML += `
  <tr class="text-left">
    <th class="pr-3">${title}</th>
    <td id="details-chipset">${value}</td>
  </tr>
  `;
};
showItem();
function formatTime() {
  const nowDate = new Date().toLocaleTimeString("en-us", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = nowDate.split(",")[0].split(" ");
  const time = nowDate.split(",")[1];

  return `${date[1]} ${date[0]},${time}`;
}

document
  .querySelector("#ewallet-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const type = document.querySelector(".add__type").value;
    const input = document.querySelector(".add__description").value;
    const value = document.querySelector(".add__value").value;
    if (input.length > 0 && value.length > 0) {
      addItem(type, input, value);
      resetForm();
    }
  });
function addItem(type, input, value) {
  const time = formatTime();
  const newHtml = ` <div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${input}</p>
      </div>
      <div class="item-time">
        <p>${time}</p>
      </div>
    </div>
    <div class="item-amount ${
      type === "+" ? "income-amount" : "expense-amount"
    }">
      <p>${type}$${value}</p>
    </div>
  </div> `;
  const collection = document.querySelector(".collection");
  collection.insertAdjacentHTML("afterbegin", newHtml);
  addItemToLs(type, input, value, time);
  showIncome();
  showExpense();
  showTotalBalnce();
}

function showItem() {
  let items = getItemFromLs();
  const collection = document.querySelector(".collection");
  for (let item of items) {
    const newHtml = ` <div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${item.input}</p>
      </div>
      <div class="item-time">
        <p>${item.time}</p>
      </div>
    </div>
    <div class="item-amount ${
      item.type === "+" ? "income-amount" : "expense-amount"
    }">
      <p>${item.type}$${item.value}</p>
    </div>
  </div> `;
    collection.insertAdjacentHTML("afterbegin", newHtml);
  }
}
function resetForm() {
 document.querySelector(".add__type").value = "+";
   document.querySelector(".add__description").value = "";
  document.querySelector(".add__value").value = "";
}
function getItemFromLs() {
  let items = localStorage.getItem("items");
  if (items) {
    items = JSON.parse(items);
  } else {
    items = [];
  }
  return items;
}
function addItemToLs(type, input, value, time) {
  let items = getItemFromLs();
  items.push({type, input, value, time});
  localStorage.setItem("items", JSON.stringify(items));
}
function showIncome() {
  let items = getItemFromLs();
  let totalInc = 0;
  for (let item of items) {
    if (item.type === "+") {
      totalInc += parseInt(item.value);
    }
  }
  document.querySelector(".income__amount p").innerText = `$${sep(totalInc)}`;
}
function showExpense() {
  let items = getItemFromLs();
  let totalExp = 0;
  for (let item of items) {
    if (item.type === "-") {
      totalExp += parseInt(item.value);
    }
  }
  document.querySelector(".expense__amount p").innerText = `$${sep(totalExp)}`;
}
function showTotalBalnce() {
  let items = getItemFromLs();
  let totalBalance = 0;
  for (let item of items) {
    if (item.type === "+") {
      totalBalance += parseInt(item.value);
    } else {
      totalBalance -= parseInt(item.value);
    }
  }
  document.querySelector(".balance__amount p").innerText = sep(totalBalance);
}
function sep(amount){
    amount = parseInt(amount);
    return amount.toLocaleString();
}

const RAPIDAPI_API_URL = "https://currency13.p.rapidapi.com/convert/10/USD/INR";
const RAPIDAPI_REQUEST_HEADERS = {
  "x-rapidapi-host": "currency13.p.rapidapi.com",
  "x-rapidapi-key": "347de049e3mshfe646769cc5de2fp155c85jsn9f80e0fada2a",
  useQueryString: true
};

const select = document.querySelectorAll("select");
const input_amount = document.querySelector("#in_amount");
const output_amount = document.querySelector("#out_amount");
const exchange = document.querySelector("#converter");
let html = "";

async function currency() {
  const res = await fetch(RAPIDAPI_API_URL);
  const data = await res.json();
  const arrKeys = Object.keys(data.rates);
  const rates = data.rates;

  arrKeys.map(item => {
    return (html += `<option value=${item}>${item}</option>`);
  });

  for (let i = 0; i < select.length; i++) {
    select[i].innerHTML = html;
  }

  function convert(i, j) {
    input_amount.value =
      (output_amount.value * rates[select[i].value]) / rates[select[j].value];
  }

  input_amount.addEventListener("input", () => convert());
  select[0].addEventListener("change", () => convert());
  select[1].addEventListener("change", () => convert());
}

output_amount.addEventListener("click", () => convert());

currency();

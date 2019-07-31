const localStorageKey = "flexicalc_data"
const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

var getTime = (milli, lunch_duration) => {
  let time = new Date(milli);
  const lunch_dur = parseInt(lunch_duration, 10);
  time.setMinutes(time.getMinutes() - lunch_dur);
  const hours = time.getUTCHours();
  const minutes = time.getUTCMinutes();
  const minutes_string = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes_string;
}
function calculate_weekly_totals() {
  let totalH = 0;
  let totalM = 0;
  for (const day_str of days) {
    const result = document.getElementById("day_" + day_str + "_result");

    if (result.textContent && result.textContent !== "") {
      let h_m_split = result.textContent.split(":");
      totalH += parseInt(h_m_split[0], 10);
      totalM += parseInt(h_m_split[1], 10);
    }
  }


  // If the minutes exceed 60
  if (totalM >= 60) {
    // Divide minutes by 60 and add result to hours
    totalH += Math.floor(totalM / 60);
    // Add remainder of totalM / 60 to minutes
    totalM = totalM % 60;
  }

  const minutes_string = totalM < 10 ? "0" + totalM : totalM;
  document.getElementById("result_total").textContent = totalH + ":" + minutes_string;
  // if minutes are under 10 then append 0 at the front
  document.getElementById("result_minus_expected_total").textContent = (totalH - 37) + ":" + minutes_string;
}
function cache_all_fields() {
  let days_data = {};
  for (const day of days) {
    const inp = document.getElementById("day_" + day + "_in");
    const out = document.getElementById("day_" + day + "_out");
    const lunch = document.getElementById("day_" + day + "_lunch_duration");
    days_data[day] = { "in": inp.value, "out": out.value, "lunch_duration": lunch.value };
  }

  window.localStorage.setItem(localStorageKey, JSON.stringify(days_data));

}
function make_diff(day_str, cache = true) {
  const inp = document.getElementById("day_" + day_str + "_in");
  const out = document.getElementById("day_" + day_str + "_out");
  const lunch = document.getElementById("day_" + day_str + "_lunch_duration");
  const result = document.getElementById("day_" + day_str + "_result");

  result.textContent = getTime(new Date("November 02, 2017 " + out.value) - new Date("November 02, 2017 " + inp.value), lunch.value);
  calculate_weekly_totals();
  if (cache) {
    cache_all_fields();
  }
}

function loadFromCache() {
  const days_data = JSON.parse(window.localStorage.getItem(localStorageKey));
  if (days_data) {
    for (const day of days) {
      const data = days_data[day];

      for (const field of Object.keys(data)) {
        const value = data[field];
        const f = document.getElementById("day_" + day + "_" + field);
        f.value = value;
      }
      make_diff(day, false);
    }
  }
}
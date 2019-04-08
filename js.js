var getTime = (milli) => {
  let time = new Date(milli);
  time.setMinutes(time.getMinutes() - 30);
  let hours = time.getUTCHours();
  let minutes = time.getUTCMinutes();
  return hours + ":" + minutes;
}
function add_all() {
  let days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
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

  document.getElementById("result_total").textContent = totalH + ":" + totalM;
  document.getElementById("result_minus_expected_total").textContent = (totalH - 37) + ":" + totalM;

}
function make_diff(day_str) {
  const inp = document.getElementById("day_" + day_str + "_in");
  const out = document.getElementById("day_" + day_str + "_out");
  const result = document.getElementById("day_" + day_str + "_result");

  result.textContent = getTime(new Date("November 02, 2017 " + out.value) - new Date("November 02, 2017 " + inp.value));
  add_all();
}
const team_1_code = document.getElementById("team-1-code");
const team_2_code = document.getElementById("team-2-code");
const team_1_name = document.getElementById("team-1-name");
const team_2_name = document.getElementById("team-2-name");
const team_1_score = document.getElementById("team-1-score");
const team_2_score = document.getElementById("team-2-score");
const team_1_logo = document.getElementById("team-1-logo");
const team_2_logo = document.getElementById("team-2-logo");
const team_1_overs = document.getElementById("team-1-overs");
const team_2_overs = document.getElementById("team-2-overs");
const team_1_wickets = document.getElementById("team-1-wickets");
const team_2_wickets = document.getElementById("team-2-wickets");
const date = document.getElementById("date");
const venue = document.getElementById("venue");
const statusMessage = document.getElementById("status");
const headline = document.getElementById("headline");
const match_status = document.getElementById("match_status");
const next = document.getElementById("next");
let currentIndex = 0;
let iplData = {};

const apiLink =
  "https://api.cricapi.com/v1/currentMatches?apikey=6cbb071f-433f-4db0-82f4-1832b9f137b3&offset=0";

const setValues = (values) => {
  headline.innerHTML = values.name;
  team_1_code.innerHTML = values.teamInfo[0].shortname;
  team_2_code.innerHTML = values.teamInfo[1].shortname;
  team_1_name.innerHTML = values.teamInfo[0].name;
  team_2_name.innerHTML = values.teamInfo[1].name;
  team_1_score.innerHTML = values.score[0].r;
  team_2_score.innerHTML = values.score[1].r;
  team_1_logo.src = values.teamInfo[0].img.replace("48", "128");
  team_2_logo.src = values.teamInfo[1].img.replace("48", "128");
  team_1_overs.innerHTML = values.score[0].o;
  team_2_overs.innerHTML = values.score[1].o;
  team_1_wickets.innerHTML = values.score[0].w;
  team_2_wickets.innerHTML = values.score[1].w;
  date.innerHTML = values.dateTimeGMT; // convert to date
  venue.innerHTML = values.venue;
  statusMessage.innerHTML = values.status;
  if (values.matchStarted && !values.matchEnded) {
    match_status.style.backgroundColor = "green";
  } else {
    match_status.style.backgroundColor = "red";
  }
};

const getMatchData = async () => {
  fetch(apiLink)
    .then((response) => response.json())
    .then((data) => {
      values = data;
      iplData = values.data;
      setValues(iplData[0]);
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch request
      console.error("Error:", error);
    });
};

getMatchData();

next.addEventListener("click", () => {
  console.log("next clicked");
  currentIndex++;
  if (currentIndex >= iplData.length) {
    currentIndex = 0;
  }
  setValues(iplData[currentIndex]);
});

const setDefaultValues = () => {
  team_1_code.innerHTML = "IND";
};

console.log("Hello from background.js");

setDefaultValues();

import renderHeader from "../../fragments/header/header.js"

export default async () => {
  renderHeader("nav-votes");
  const main = document.querySelector(".main");

  const votesPageResponse = await fetch("./fragments/votes/votes.html");
  const votesHtml = await votesPageResponse.text();

  main.innerHTML = votesHtml;

  const getCandidatesResponse = await fetch(`${window.apiUrl}/api/candidate`);
  const candidates = await getCandidatesResponse.json();

  const getPartiesResponse = await fetch(`${window.apiUrl}/api/party`);
  const parties = await getPartiesResponse.json();

  const data = [];
  const backgroundColor = [];
  const borderColor = [];
  //Math.floor(Math.random() * 101);
  parties.forEach(party => {
    let votes = 0;
    candidates.forEach(candidate => {
      if(candidate.partyId == party.partyId) {
        votes += candidate.votes;
      }
    });
    data.push(votes);
    const color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, `;
    backgroundColor.push(color + "0.2)");
    backgroundColor.push(color + "1)");
  });

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: parties.map(party => party.name),
      datasets: [{
        label: '# of Votes',
        data: data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
};
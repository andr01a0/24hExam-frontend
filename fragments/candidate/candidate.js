import renderHeader from "../../fragments/header/header.js"

export default async () => {
  renderHeader("nav-candidate");
  const main = document.querySelector(".main");

  const candidatePageResponse = await fetch("./fragments/candidate/candidate.html");
  const candidateHtml = await candidatePageResponse.text();

  main.innerHTML = candidateHtml;

  const getPartiesResponse = await fetch(`${window.apiUrl}/api/party`);
  const parties = await getPartiesResponse.json();

  const select = document.querySelector("select");
  parties.forEach(party => {
    const opt = document.createElement('option');
    opt.value = party.partyId;
    opt.innerHTML = party.name;
    select.appendChild(opt)
  });

  function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    const formData = new FormData(e.target);

    const candidateObject = {
      "firstName": formData.get("firstName"),
      "lastName": formData.get("lastName"),
      "partyId": formData.get("partyId"),
      "votes": formData.get("votes")
    };

    fetch(`${window.apiUrl}/api/party/${formData.get("partyId")}/candidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(candidateObject)
    }).then(response => response.json()).then(response => {
      if(response.message != undefined) {
        alert(response.message);
        return;
      }
    });
    
    window.router.navigate("#/");
  }

  const form = document.querySelector('form');
  form.addEventListener("submit", processForm);

};
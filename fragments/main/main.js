import renderHeader from "../../fragments/header/header.js"

export default async () => {
  renderHeader("nav-home");
  const main = document.querySelector(".main");

  const mainPageResponse = await fetch("./fragments/main/main.html");
  const mainHtml = await mainPageResponse.text();

  const getCandidatesResponse = await fetch(`${window.apiUrl}/api/candidate`);
  const candidates = await getCandidatesResponse.json();

  main.innerHTML = mainHtml;

  $("#jsGrid").jsGrid({
    height: 'auto',
    width: "100%",
  
    sorting: true,
    paging: true,
    pageSize: 8,
    pageButtonCount: 5,
    editing: true,
    autoload: true,

    data: candidates,
  
    controller: {
      updateItem: function(item) {
        fetch(`${window.apiUrl}/api/party/${item.partyId}/candidate`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        }).then(response => response.json()).then(response => {
          if(response.message != undefined)
            alert(response.message);
        });
        return;
      },
      deleteItem: function(item) {
        fetch(`${window.apiUrl}/api/party/${item.partyId}/candidate/${item.candidateId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => response.json()).then(response => {
          if(response.message != undefined)
            alert(response.message);
        });
        return;
      }
  },
  
    fields: [
      { name: "firstName", title: 'First Name',type: "text"},
      { name: "lastName", title: 'Last Name', type: "text"},
      { name: "partyName", title: 'Party', type: "text"},
      { type: "control", editButton: 'yes', deleteButton: 'yes'}
    ]
  });
};
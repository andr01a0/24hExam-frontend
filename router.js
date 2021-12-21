import renderMain from "./fragments/main/main.js";
import renderCandidate from "./fragments/candidate/candidate.js"
import renderVotes from "./fragments/votes/votes.js"

export default function () {
  window.router = new Navigo("/", { hash: true });
  window.router.updatePageLinks();

  router
    .on({
      "/": () => {
        renderMain();
      },
      candidate: () => {
        renderCandidate();
      },
      votes: () => {
        renderVotes();
      }
    })
    .resolve();
}
import renderHeader from "../../fragments/header/header.js"

export default async () => {
    renderHeader("nav-votes");
    const main = document.querySelector(".main");

    const votesPageResponse = await fetch("./fragments/votes/votes.html");
    const votesHtml = await votesPageResponse.text();

    main.innerHTML = votesHtml;

};
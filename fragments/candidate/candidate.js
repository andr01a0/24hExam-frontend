import renderHeader from "../../fragments/header/header.js"

export default async () => {
    renderHeader("nav-candidate");
    const main = document.querySelector(".main");

    const candidatePageResponse = await fetch("./fragments/candidate/candidate.html");
    const candidateHtml = await candidatePageResponse.text();

    main.innerHTML = candidateHtml;

};
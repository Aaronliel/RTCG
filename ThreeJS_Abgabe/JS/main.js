import { RTCG } from "../src/rtcg-app/RTCG.js";

function main() {
    const container = document.querySelector("#scene-container");
    const my_RTCG = new RTCG(container);
    my_RTCG.start();
}

main();
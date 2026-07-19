(() => {
  "use strict";

  document.documentElement.classList.add("js");

  const state = document.querySelector(".build-state");
  if (state) {
    state.title = "This repository contains the reviewed public build only.";
  }
})();

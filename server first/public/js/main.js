// const backdrop = document.querySelector(".backdrop");
const sideDrawer = document.querySelector(".mobile-nav");
const menuToggle = document.querySelector("#side-menu-toggle");

function backdropClickHandler() {
  document.querySelector(".backdrop").style.display = "none";
  sideDrawer.classList.remove("open");
}

function menuToggleClickHandler() {
  document.querySelector(".backdrop").style.display = "block";
  sideDrawer.classList.add("open");
}
window.onload = () => {
  document
    .querySelector(".backdrop")
    .addEventListener("click", backdropClickHandler);
  menuToggle.addEventListener("click", menuToggleClickHandler);
};

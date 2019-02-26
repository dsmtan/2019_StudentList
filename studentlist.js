"use strict";
let JSONdata;

const template = document.querySelector("#studentTemplate").content;
const main = document.querySelector("main");
const nav = document.querySelector("nav");

const allBtn = document.querySelector("#allfilter");
const gryfBtn = document.querySelector("#gryffindor");
const huffBtn = document.querySelector("#hufflepuff");
const raveBtn = document.querySelector("#ravenclaw");
const slytBtn = document.querySelector("#slytherin");

let studentArray = [];
let houseArray = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
let studentHouse;

window.addEventListener("DOMContentLoaded", init);

function init() {
  loadJSON();

  allBtn.addEventListener("click", function() {
    filterList("");
  });

  gryfBtn.addEventListener("click", function() {
    filterList("Gryffindor");
  });
  huffBtn.addEventListener("click", function() {
    filterList("Hufflepuff");
  });
  raveBtn.addEventListener("click", function() {
    filterList("Ravenclaw");
  });
  slytBtn.addEventListener("click", function() {
    filterList("Slytherin");
  });
}

function loadJSON() {
  fetch("https://petlatkea.dk/2019/hogwarts/students.json")
    .then(res => res.json())
    .then(myJSON => {
      JSONdata = myJSON;
      console.log(JSONdata);
    });
}

//create a filtered array for clicked house
function filterList(query) {
  let filteredArray = JSONdata.filter(function(student) {
    return student.house.indexOf(query) > -1;
  });
  displayList(filteredArray);
}

//display students from selected house
function displayList(newArray) {
  //clear main
  main.innerHTML = "";

  newArray.forEach(student => {
    let fullName = student.fullname.trim();
    studentHouse = student.house;

    //split first and last names in 2 columns
    let indexOfFirst = fullName.indexOf(" ");
    let firstName = fullName.substring(0, indexOfFirst);
    let lastName = fullName.substring(fullName.lastIndexOf(" ") + 1);

    //fill template + append
    const copy = template.cloneNode(true);
    copy.querySelector("#firstname").textContent = firstName;
    copy.querySelector("#lastname").textContent = lastName;

    main.appendChild(copy);
  });

  console.log(newArray);
  // hiding irrelevant sections - still need to fix
}

//modal stuff not done
// function showDetails(gameinfo) {
//   modal.querySelector("h3").textContent = gameinfo.title.rendered;
//   modal.querySelector("img").src =
//     gameinfo._embedded[
//       "wp:featuredmedia"
//     ][0].media_details.sizes.medium.source_url;

//   modal.classList.remove("hide");
// }

// modal.addEventListener("click", () => modal.classList.add("hide"));
// modal
//   .querySelector("#btnclose")
//   .addEventListener("click", () => modal.classList.add("hide"));

// TODO: Create scaffolding functions for the rest!

function clickSortByFirst() {}

function sortListByFirst() {}

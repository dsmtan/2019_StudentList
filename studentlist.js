"use strict";

const template = document.querySelector("#studentTemplate").content;
const main = document.querySelector("main");
const nav = document.querySelector("nav");

const allBtn = document.querySelector("#allfilter");

let studentArray = [];
let houseArray = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
let studentHouse;
let filteredArray;

window.addEventListener("DOMContentLoaded", init);

function init() {
  fetch("https://petlatkea.dk/2019/hogwarts/students.json")
    .then(res => res.json())
    .then(buildList);
  // TODO: Load JSON, create clones, build list, add event listeners, show modal, find images, and other stuff ...
}

function buildList(jsonList) {
  jsonList.forEach(student => {
    studentArray.push(student);
  });

  console.log(studentArray);

  buildFilters();
}

allBtn.addEventListener("click", () => displayList(studentArray));

function buildFilters() {
  houseArray.forEach(house => {
    const newSection = document.createElement("section");
    const newLink = document.createElement("a");

    newSection.id = house;
    newLink.href = "#";
    newLink.textContent = house;
    newLink.addEventListener("click", () => filterList(house));

    nav.appendChild(newLink);
    main.appendChild(newSection);

    // console.log(newSection.id);
  });
}

function filterList(query) {
  let newArray = studentArray.filter(function(student) {
    return student.house.indexOf(query) > -1;
  });

  console.log(newArray);

  displayList(newArray);
}

function displayList(newArray) {
  newArray.forEach(student => {
    let fullName = student.fullname.trim();
    studentHouse = student.house;

    let indexOfFirst = fullName.indexOf(" ");
    let firstName = fullName.substring(0, indexOfFirst);
    let lastName = fullName.substring(fullName.lastIndexOf(" ") + 1);

    console.log(studentHouse);

    const parent = document.querySelector("#" + student.house);
    const copy = template.cloneNode(true);
    copy.querySelector("#firstname").textContent = firstName;
    copy.querySelector("#lastname").textContent = lastName;
    parent.appendChild(copy);
  });

  let section = document.querySelectorAll("section");

  if (newArray !== studentArray) {
    section.forEach(section => {
      if (section.id == studentHouse) {
        section.classList.remove("hide");
      } else {
        section.classList.add("hide");
      }
    });
  }
  console.log("displayList");
}

// TODO: Create scaffolding functions for the rest!

function clickSortByFirst() {}

function sortListByFirst() {}

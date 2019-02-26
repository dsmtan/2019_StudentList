"use strict";

const template = document.querySelector("#studentTemplate").content;
const main = document.querySelector("main");
const nav = document.querySelector("nav");

const allBtn = document.querySelector("#allfilter");
let allSection;

let studentArray = [];
let houseArray = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
let studentHouse;

window.addEventListener("DOMContentLoaded", init);

function init() {
  fetch("https://petlatkea.dk/2019/hogwarts/students.json")
    .then(res => res.json())
    .then(buildList);
}

function buildList(jsonList) {
  //create global array from fetched json
  jsonList.forEach(student => {
    studentArray.push(student);
  });

  buildFilters();
  displayList(studentArray);
}

function buildFilters() {
  //create filterlinks for every house + add eventlistener
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

//create a filtered array for clicked house
function filterList(query) {
  let filteredArray = studentArray.filter(function(student) {
    return student.house.indexOf(query) > -1;
  });
  displayList(filteredArray);
}

//display students from selected house
function displayList(newArray) {
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

    const parent = document.querySelector("#" + student.house);
    parent.appendChild(copy);
  });

  // hiding irrelevant sections - still need to fix

  let eachSection = document.querySelectorAll("section");
  if (newArray == studentArray) {
    eachSection.forEach(section => {
      section.classList.remove("hide");
    });
  } else {
    eachSection.forEach(section => {
      section.classList.add("hide");
      if (section.id == studentHouse) {
        section.classList.remove("hide");
      } else {
        section.classList.add("hide");
      }
    });
  }

  console.log(newArray);
}

// TODO: Create scaffolding functions for the rest!

function clickSortByFirst() {}

function sortListByFirst() {}

"use strict";
let JSONdata;
let studentArray = [];
let filteredArray;

const Student = {
  firstname: "--first-name--",
  lastname: "--last-name--",
  house: "--house--",
  image: "--imgsrc--",
  fromJSON(jsonObject) {
    let fullName = jsonObject.fullname.trim();
    let indexOfFirst = fullName.indexOf(" ");
    this.firstname = fullName.substring(0, indexOfFirst);
    this.lastname = fullName.substring(fullName.lastIndexOf(" ") + 1);
    this.house = jsonObject.house;
    this.image = `images/${this.lastname}_${this.firstname.charAt(
      0
    )}.png`.toLowerCase();
  }
};

const template = document.querySelector("#studentTemplate").content;
const main = document.querySelector("main");

const allBtn = document.querySelector("#allfilter");
const gryfBtn = document.querySelector("#gryffindor");
const huffBtn = document.querySelector("#hufflepuff");
const raveBtn = document.querySelector("#ravenclaw");
const slytBtn = document.querySelector("#slytherin");

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
      prepareObjects();
    });
}

function prepareObjects() {
  JSONdata.forEach(jsonObject => {
    //create new object
    const student = Object.create(Student);
    student.fromJSON(jsonObject);

    //store in global array
    studentArray.push(student);
  });
  console.log(studentArray);
}

//create a filtered array for clicked house
function filterList(query) {
  filteredArray = studentArray.filter(function(student) {
    return student.house.indexOf(query) > -1;
  });
  sortList(filteredArray);
}

function sortList(filteredArray) {
  //sorting code

  let sortedArray = filteredArray;
  displayList(sortedArray);
}

//display students
function displayList(newArray) {
  //clear main
  main.innerHTML = "";

  newArray.forEach(student => {
    //fill template + append
    const copy = template.cloneNode(true);
    copy.querySelector("#firstname").textContent = student.firstname;
    copy.querySelector("#lastname").textContent = student.lastname;

    console.log(student.image);

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

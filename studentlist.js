"use strict";
let JSONdata;
let studentArray = [];
let filteredArray;

const Student = {
  fullname: "--fullname--",
  firstname: "--first-name--",
  lastname: "--last-name--",
  house: "--house--",
  image: "--imgsrc--",
  housecrest: "--housecrest--",
  fromJSON(jsonObject) {
    let fullName = jsonObject.fullname.trim();
    let indexOfFirst = fullName.indexOf(" ");
    this.fullname = fullName;
    this.firstname = fullName.substring(0, indexOfFirst);
    this.lastname = fullName.substring(fullName.lastIndexOf(" ") + 1);
    this.house = jsonObject.house;
    this.image = `images/${this.lastname}_${this.firstname.charAt(
      0
    )}.png`.toLowerCase();
    this.housecrest = `images/${jsonObject.house}.png`.toLowerCase();
  }
};

const template = document.querySelector("#studentTemplate").content;
const main = document.querySelector("main");
let modal = document.querySelector("#modal");

const allBtn = document.querySelector("#allfilter");
const gryfBtn = document.querySelector("#gryffindor");
const huffBtn = document.querySelector("#hufflepuff");
const raveBtn = document.querySelector("#ravenclaw");
const slytBtn = document.querySelector("#slytherin");

let selectSort = document.querySelector("#selectSort");

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

  selectSort.addEventListener("input", function() {
    filterList("");
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

  filterList("");
}

//create a filtered array for clicked house
function filterList(query) {
  filteredArray = studentArray.filter(function(student) {
    return student.house.indexOf(query) > -1;
  });
  sortList(filteredArray);
}

function sortList(filteredStudents) {
  //sorting code
  if (selectSort.value === "firstSort") {
    filteredStudents.sort(sortByFirst);
  } else if (selectSort.value === "lastSort") {
    filteredStudents.sort(sortByLast);
  } else if (selectSort.value === "houseSort") {
    filteredStudents.sort(sortByHouse);
  } else {
    filteredStudents.sort(sortByFirst);
  }

  console.table(filteredStudents);

  displayList(filteredStudents);
}

// different sorting comparison functions

function sortByFirst(a, b) {
  if (a.firstname < b.firstname) {
    return -1;
  } else {
    return 1;
  }
}

function sortByLast(a, b) {
  if (a.lastname < b.lastname) {
    return -1;
  } else {
    return 1;
  }
}

function sortByHouse(a, b) {
  if (a.house < b.house) {
    return -1;
  } else {
    return 1;
  }
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
    copy.querySelector("#housename").textContent = student.house;
    copy.querySelector("article").id = `${student.firstname.charAt(0)}-${
      student.lastname
    }`.toLowerCase();

    copy.querySelector("article").addEventListener("click", function() {
      showDetails(student);
    });

    main.appendChild(copy);
  });

  // console.log(newArray);
}

//show modal when student clicks
let studentImage;

function showDetails(student) {
  modal.querySelector("h2").textContent = student.fullname;
  modal.querySelector("h4").textContent = `House of ${student.house}`;

  studentImage = modal.querySelector("#studentImage");

  if (student.house == "Gryffindor") {
    studentImage.classList.remove("hide");
    studentImage.src = student.image;
  }

  modal.querySelector("#houseCrest").src = student.housecrest;
  modal.classList.add(`${student.house}style`.toLowerCase());

  modal.classList.remove("hide");
}

//hide modal and reset class when closed
modal.addEventListener("click", function() {
  modal.className = "modal hide";
  studentImage.classList.add("hide");
});

modal.querySelector("#btnclose").addEventListener("click", function() {
  modal.className = "modal hide";
  studentImage.classList.add("hide");
});

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
    sortList(filteredArray);
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

  filterList(""); // default unfiltered
}

//create a filtered array for clicked house
function filterList(query) {
  filteredArray = studentArray.filter(function(student) {
    return student.house.indexOf(query) > -1;
  });
  sortList(filteredArray);
}

function sortList(filteredStudents) {
  //run function by selected sorting option
  if (selectSort.value === "firstSort") {
    filteredStudents.sort(sortByFirst);
  } else if (selectSort.value === "firstSortZ") {
    filteredStudents.sort(sortByFirstZ);
  } else if (selectSort.value === "lastSort") {
    filteredStudents.sort(sortByLast);
  } else if (selectSort.value === "lastSortZ") {
    filteredStudents.sort(sortByLastZ);
  } else if (selectSort.value === "houseSort") {
    filteredStudents.sort(sortByHouse);
  } else if (selectSort.value === "houseSortZ") {
    filteredStudents.sort(sortByHouseZ);
  } else {
    filteredStudents.sort(sortByFirst);
  }

  // console.table(filteredStudents);

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

function sortByFirstZ(a, b) {
  if (a.firstname > b.firstname) {
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

function sortByLastZ(a, b) {
  if (a.lastname > b.lastname) {
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

function sortByHouseZ(a, b) {
  if (a.house > b.house) {
    return -1;
  } else {
    return 1;
  }
}

let currentArray;

//display students in list
function displayList(newArray) {
  currentArray = newArray;

  //show total students in current list
  document.querySelector("#totalStudents>span").textContent =
    currentArray.length;

  //clear main
  main.innerHTML = "";

  newArray.forEach(student => {
    //fill template + append
    const copy = template.cloneNode(true);
    let article = copy.querySelector("article");
    copy.querySelector("#firstname").textContent = student.firstname;
    copy.querySelector("#lastname").textContent = student.lastname;
    copy.querySelector("#housename").textContent = student.house;
    article.id = `${student.firstname}_${student.lastname}`;

    article.draggable = "true";

    article.addEventListener("click", function() {
      showDetails(student);
    });

    main.appendChild(copy);
  });
}

//show modal when student clicks
let studentImage;

function showDetails(student) {
  document.querySelector("#overlay").classList.remove("hide");
  modal.querySelector("h2").textContent = student.fullname;
  modal.querySelector("h4").textContent = `House of ${student.house}`;

  studentImage = modal.querySelector("#studentImage");

  if (student.lastname == "Finch-Fletchly") {
    studentImage.src = "images/fletchley_j.png";
  } else if (student.firstname == "Padma") {
    studentImage.src = "images/patil_padma.png";
  } else {
    studentImage.src = student.image;
    studentImage.onerror = function() {
      studentImage.classList.add("hide");
    };
  }

  modal.querySelector("#houseCrest").src = student.housecrest;
  // add relative house styling
  modal.classList.add(`${student.house}style`.toLowerCase());
  modal.classList.remove("hide");
}

//hide modal and reset class when closed
modal.addEventListener("click", function() {
  modal.className = "modal hide";
  studentImage.classList.remove("hide");
  document.querySelector("#overlay").classList.add("hide");
});

modal.querySelector("#btnclose").addEventListener("click", function() {
  modal.className = "modal hide";
  studentImage.classList.remove("hide");
  document.querySelector("#overlay").classList.add("hide");
});

//expel student drag & drop

let dragged;
let counter = 0;

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {});

document.addEventListener("dragstart", function(event) {
  // store a ref. on the dragged elem
  dragged = event.target;
  // make it half transparent
  dragged.style.opacity = 0.5;
});

document.addEventListener("dragend", function(event) {
  // reset the transparency
  event.target.style.opacity = "";
});

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
  // prevent default to allow drop
  event.preventDefault();
});

document.addEventListener("dragenter", function(event) {
  // highlight potential drop target when the draggable element enters it
  if (event.target.className == "dropzone") {
    event.target.style.background = "rgba(236, 52, 52, 0.5)";
  }
});

document.addEventListener("dragleave", function(event) {
  // reset background of potential drop target when the draggable element leaves it
  if (event.target.className == "dropzone") {
    event.target.style.background = "";
  }
});

document.addEventListener("drop", function(event) {
  // prevent default action (open as link for some elements)
  event.preventDefault();

  if (event.target.className == "dropzone") {
    event.target.style.background = "";
    counter++;
    document.querySelector("#expelled span").textContent = counter;

    dragged.parentNode.removeChild(dragged);
    dragged.style.left = event.target.style.left;
    dragged.style.top = event.target.style.top;
    addExpelled(dragged);
  }
});

let expelledList = [];

function addExpelled(student) {
  // add dragged student to expelled list
  let indexOfFirst = student.id.indexOf("_");
  let exFirst = student.id.substring(0, indexOfFirst);
  let exLast = student.id.substring(student.id.lastIndexOf("_") + 1);
  let expelledStudent = `${exFirst} ${exLast}`;
  expelledList.push(expelledStudent);

  console.log(expelledList);

  let toBeRemoved = findExpelled(exFirst);
  removeExpelled(toBeRemoved);
}

function findExpelled(exfirstname) {
  //find expelled student by first name
  return currentArray.find(obj => obj.firstname === exfirstname);
}

function removeExpelled(firstName) {
  //remove the expelled student from current displayed list
  let position = currentArray.indexOf(firstName);
  currentArray.splice(position, 1);
  document.querySelector("#totalStudents>span").textContent =
    currentArray.length;
}

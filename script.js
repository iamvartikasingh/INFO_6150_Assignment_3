//Title constructor function that creates a Title object
function Title(t1) 
{ this.mytitle = t1;
}

Title.prototype.getName = function () 
{ 
return (this.mytitle);
}

var socialMedia = {
  facebook : 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};






var t = new Title("CONNECT WITH ME!");





// Start of my code


alert(
  "Name: Vartika Singh\nNUID: 002317924"
);

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}


let inpchk = document.querySelectorAll("input[type=checkbox]");

function handleCheckboxTgle(checkbox) {
  console.log(checkbox.checked);

  let Row = checkbox.parentElement.parentElement;

  console.log(Row);

  let delColmn = Row.querySelector(":nth-child(9)");
  removeAllChldNode(delColmn);

  let editColmn = Row.querySelector(":nth-child(10)");
  removeAllChldNode(editColmn);

  Row.bgColor = '';

  if (checkbox.checked) {
    Row.bgColor = 'yellow';
    delColmn.appendChild(newDelBtn(Row));
    editColmn.appendChild(createeditbutton(Row));

  }

  Visibilitytoggle();
}

function removeAllChldNode(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function defAlert(text) {
  setTimeout(() => {
    alert(text);
  }, 150);
}

function newDelBtn(tr) {
  let btn = document.createElement('input');

  btn.type = 'button';

  btn.value = 'Delete';
  const studentName = tr.querySelector("td:nth-child(2)").innerText;
  console.log(studentName); 
  btn.addEventListener('click', () => {
    tr.nextElementSibling.remove();
    tr.remove();
    Visibilitytoggle();
    defAlert(`${studentName} data deleted successfully`);
  })
  
  return btn;
}



function createeditbutton(row) {
  const button = document.createElement('input');
  button.type = 'button';
  button.value = 'Edit';
  button.addEventListener('click', () => {
      const studentName = row.querySelector("td:nth-child(2)").innerText;
      const teacherName = row.querySelector("td:nth-child(3)").innerText;
      const awardStatus = row.querySelector("td:nth-child(4)").innerText;
      const semester = row.querySelector("td:nth-child(5)").innerText;
      const type = row.querySelector("td:nth-child(6)").innerText;
      const budgetNumber = row.querySelector("td:nth-child(7)").innerText;
      const percentage = row.querySelector("td:nth-child(8)").innerText;
      showeditmodal(studentName, teacherName, awardStatus, semester, type, budgetNumber, percentage);
  });
  return button;
}

function showeditmodal(studentName, teacherName, awardStatus, semester, type, budgetNumber, percentage) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
      <div class="modal-content">
          <h3>Edit details of ${studentName}</h3>
          <p><strong>Teacher:</strong> ${teacherName}</p>
          <p><strong>Award Status:</strong> ${awardStatus}</p>
          <p><strong>Semester:</strong> ${semester}</p>
          <p><strong>Type:</strong> ${type}</p>
          <p><strong>Budget#:</strong> ${budgetNumber}</p>
          <p><strong>Percentage:</strong> ${percentage}</p>
          <button id="updateButton">Update</button>
          <button id="cancelButton">Cancel</button>
      </div>
  `;
  document.body.appendChild(modal);
  document.getElementById("updateButton").addEventListener('click', () => {
      defAlert(`${studentName} data updated successfully`);
      modal.remove();
  });
  document.getElementById("cancelButton").addEventListener('click', () => modal.remove());
}


function Visibilitytoggle() {
  let chkboxes = document.querySelectorAll("input[type=checkbox]");

  let checked = false;

  chkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      checked = true;
      }
    })

    document.querySelector("button#button").disabled = !checked;

    const deleteAndEditRows = document.querySelectorAll("#myTable td:nth-child(9),#myTable th:nth-child(9),#myTable td:nth-child(10),#myTable th:nth-child(10)");

    deleteAndEditRows.forEach(cell => {
      cell.classList.remove("display-cell");
      if (checked) {
        cell.classList.add("display-cell");
      }
  })

  console.log(`button disability is now ${!checked}`);
}

function tglDropDwn(img) {
  const drpdwn = img.parentElement.parentElement.nextElementSibling;
  console.log(drpdwn);

  if (drpdwn.classList.contains("dropDownTextArea")) {
    drpdwn.classList.remove("dropDownTextArea");
  }
  else {
    drpdwn.classList.add("dropDownTextArea");
  }
}

function InputFunctionality(input) {
  input.addEventListener('change', () => {
    handleCheckboxTgle(input);
  })

  const img = input.nextElementSibling.nextElementSibling.nextElementSibling;

  img.addEventListener('click', () => {
    tglDropDwn(img);
  })

  handleCheckboxTgle(input);
}

let cln = document.querySelectorAll("#myTable tbody tr");
let clnRow = cln[1].cloneNode(true);
let clnDetails = cln[2].cloneNode(true);

inpchk.forEach(input => {
  InputFunctionality(input);
})

function addNewStudent() {
  console.log(`adding new student`);

  let tbody = document.querySelector("#myTable tbody");

  newRow = clnRow.cloneNode(true);
  newDetails = clnDetails.cloneNode(true);

  const count = document.querySelectorAll("input[type=checkbox]").length + 1;

  const rows = newRow.querySelectorAll("td");

  rows[1].innerHTML = `Student ${count}`;
  rows[2].innerHTML = `Teacher ${count}`;
  rows[6].innerHTML = getRandom(count * 10000, count * 10000 + 9999);

  let checkbox = newRow.querySelector("input[type=checkbox]");
  InputFunctionality(checkbox);

  console.log(newRow);
  console.log(newDetails);

  tbody.appendChild(newRow);
  tbody.appendChild(newDetails);

  defAlert(`${rows[1].innerHTML} data updated successfully`);
}

let addNewButton = document.querySelector("button#add");

addNewButton.addEventListener('click', () => {
  try {
    addNewStudent();
    Visibilitytoggle();
  } catch (error) {
      alert(`Unable to add student: ${error}`);
    }
})


import Request from "./request"
import UI from "./ui"
import Notifier from "./notifier"

// Elements
const frmEmployee = document.querySelector("#employee-form")
const inpName = document.querySelector("#name")
const inpDepartment = document.querySelector("#department")
const inpTitle = document.querySelector("#title")
const inpSalary = document.querySelector("#salary")
const lstEmployee = document.querySelector("#employees")
const btnUpdate = document.querySelector("#update")
const btnSubmit = document.querySelector("#submit")
const fldNotifications = document.querySelector("#notifications")

// Get controller objects
const request = new Request("http://localhost:3000/employees")
const ui = new UI(lstEmployee, btnUpdate, inpName, inpDepartment, inpTitle, inpSalary, btnSubmit)
const notifier = new Notifier(fldNotifications)

// Initialize
let updateID = -1 // Nothing selected
let updateElement = null
btnUpdate.style.displey = "none"
ui.clearInputs()
eventListeners()

function eventListeners() {
  document.addEventListener("DOMContentLoaded", getAllEmployees)
  frmEmployee.addEventListener("submit", addEmployee)
  lstEmployee.addEventListener("click", handleButtons)
  btnUpdate.addEventListener("click", updateEmployee)
}
// Get and add all employees to UI
function getAllEmployees() {
  request.get()
    .then(
      employees => { ui.listAllEmployees(employees) }
    )
    .catch(err => {
      console.error(err)
      notifier.danger("An error occurred while reaching the server.")
    })
}
// Add new employee to list
function addEmployee(e) {
  e.preventDefault()

  // Get data
  const empName = inpName.value.trim()
  const empDepartment = inpDepartment.value.trim()
  const empTitle = inpTitle.value.trim()
  const empSalary = inpSalary.value.trim()

  // Check conditions
  if ([empName, empDepartment, empSalary, empTitle].includes("")) return notifier.warn("Please fill all the fields.")
  if (isNaN(empSalary)) return notifier.inform("Salary field must be an integer.")

  // if conditions are met, add
  request.post({
    name: empName,
    department: empDepartment,
    title: empTitle,
    salary: Number(empSalary)
  })
    .then(employee => {
      ui.addEmployee(employee)
      notifier.success(employee.name + " added successfully.")
    })
    .catch(err => {
      console.error(err)
      notifier.danger("An error occurred while reaching the server.")
    })
  ui.clearInputs()
}

// Handle update and delete buttons
function handleButtons(e) {
  if (e.target.id === "update-employee") {
    // Update
    toggleUpdateSubmitButtons(e.target)
  }
  else if (e.target.id === "delete-employee") {
    // Delete
    if (confirm("Do you confirm the deletion?")) deleteEmployee(e.target)
    else notifier.danger("The deletion denied.")
  }
}

// Delete selected employee
function deleteEmployee(target) {
  const id = target.parentElement.parentElement.getElementsByTagName("td")[0]
  request.delete(Number(id.textContent))
    .then(() => {
      ui.removeEmployee(target)
      notifier.success("Old employee deleted successfully.")
    })
    .catch(err => {
      console.error(err)
      notifier.danger("An error occurred while reaching the server.")
    })
}

// Prepare update UI
function toggleUpdateSubmitButtons(target) {
  console.log(target.parentElement.parentElement.getElementsByTagName("td")[0])
  const id = Number(target.parentElement.parentElement.getElementsByTagName("td")[0].textContent)
  request.get(id)
    .then(employee => {
      updateID = ui.toggleButtons(employee)
      updateElement = target
    })
    .catch(err => {
      console.error(err)
      notifier.danger("An error occurred while reaching the server.")
    })
}

// Update employee
function updateEmployee() {
  // Get data
  const empName = inpName.value.trim()
  const empDepartment = inpDepartment.value.trim()
  const empTitle = inpTitle.value.trim()
  const empSalary = inpSalary.value.trim()

  // Check conditions
  if (updateID < 0) return
  if ([empName, empDepartment, empSalary, empTitle].includes("")) return notifier.warn("Please fill all the fields.")
  if (isNaN(empSalary)) return notifier.inform("Salary field must be an integer.")

  request.put(updateID, {
    name: empName,
    department: empDepartment,
    title: empTitle,
    salary: Number(empSalary),
  }).then(updated => {
    ui.updateEmployee(updated, updateElement)
    ui.clearInputs()
    ui.hideUpdateButton()
    notifier.success("Successfully updated entry.")
  })
    .catch(err => {
      console.error(err)
      notifier.danger("An error occurred while reaching the server.")
    })
}
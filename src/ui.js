export default class UI {
  // Initialize object
  constructor(employee_list, update_button, input_name, input_department, input_title, input_salary, submit_button) {
    this.frmEmployee = employee_list
    this.inpName = input_name
    this.inpDepartment = input_department
    this.inpTitle = input_title
    this.inpSalary = input_salary
    this.lstEmployee = employee_list
    this.btnUpdate = update_button
    this.btnSubmit = submit_button
  }
  // Add all data to UI
  listAllEmployees(employees) {
    let result = ""
    employees.forEach(employee => {
      result += `
      <tr>       
        <td align="right">${employee.id}</td>
        <td>${employee.name}</td>
        <td>${employee.department}</td>
        <td>${employee.title}</td>
        <td align="right">${employee.salary}</td>
        <td><button id="update-employee" class="btn w-100 btn-primary">&olarr;</button></td> 
        <td><button id="delete-employee" class="btn w-100 btn-danger">&cross;</button></td>
      </tr>`
      this.lstEmployee.innerHTML = result
    })
  }
  // Clear all inputs
  clearInputs() {
    this.inpName.value = ""
    this.inpDepartment.value = ""
    this.inpTitle.value = ""
    this.inpSalary.value = ""
  }
  // Add one more employee to UI
  addEmployee(employee) {
    this.lstEmployee.innerHTML += `
    <tr>       
      <td align="right">${employee.id}</td>
      <td>${employee.name}</td>
      <td>${employee.department}</td>
      <td>${employee.title}</td>
      <td align="right">${employee.salary}</td>
      <td><button id="update-employee" class="btn w-100 btn-primary">&olarr;</button></td> 
      <td><button id="delete-employee" class="btn w-100 btn-danger">&cross;</button></td>
    </tr>`
  }
  // Delete employee from UI list
  removeEmployee(employee) {
    employee.parentElement.parentElement.remove()
  }
  insertUpdateInfo(employee) {
    this.inpName.value = employee.name
    this.inpDepartment.value = employee.department
    this.inpTitle.value = employee.title
    this.inpSalary.value = employee.salary
  }
  //Toggle buttons
  toggleButtons(employee) {
    if (employee.name !== this.inpName.value.trim()) {
      this.insertUpdateInfo(employee)
      this.btnUpdate.textContent = `Çalışanı (ID: ${employee.id}) Güncelle`
      this.btnUpdate.style.display = "block"
      this.btnSubmit.style.display = "none"
    }
    else {
      this.btnUpdate.textContent = "Çalışanı Güncelle"
      this.btnUpdate.style.display = "none"
      this.btnSubmit.style.display = "block"
      this.clearInputs()
    }
    return employee.id
  }
  // Hide update button and show add button
  hideUpdateButton() {
    this.btnSubmit.style.display = "block"
    this.btnUpdate.style.display = "none"
  }
  // Update existing employee on UI
  updateEmployee(employee, target) {
    const row = target.parentElement.parentElement
    row.cells[1].textContent = employee.name
    row.cells[2].textContent = employee.department
    row.cells[3].textContent = employee.title
    row.cells[4].textContent = employee.salary
  }
}

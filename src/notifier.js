export default class Notifier {
  constructor(notification_field) {
    this.fldNotifications = notification_field
  }

  // Template
  template(type, message) {
    return `
    <div class="d-flex align-items-center flex-row alert alert-${type} mt-2 mb-0 p-2 gap-2">
      <button onclick="this.parentElement.remove()" style="width:26px; height:26px; padding:0;" class="rounded-circle btn btn-${type}" role="button">X</button>
      <div>
        ${message}
      </div>
    </div>`
  }

  // Information notification
  notify(type, message) {
    if (this.fldNotifications.children.length > 4) {
      this.fldNotifications.children[4].remove()
      this.count--
    }
    this.count++
    this.fldNotifications.innerHTML = this.template(type, message) + this.fldNotifications.innerHTML
  }

  // Information
  success(message) { this.notify("success", message) }
  inform(message) { this.notify("primary", message) }
  warn(message) { this.notify("warning", message) }
  danger(message) { this.notify("danger", message) }
} 
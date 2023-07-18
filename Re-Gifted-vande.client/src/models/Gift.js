export class Gift {
  constructor(data) {
    this.id = data.id || ''
    this.tag = data.tag
    this.url = data.url
    this.opened = data.opened || false
    this.imgAlt = "https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  }
}
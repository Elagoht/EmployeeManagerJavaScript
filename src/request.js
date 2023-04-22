export default class Request {
    constructor(url) {
        this.url = url
    }
    // Get Request
    get = async (id = "") => {
        const response = await fetch(this.url + `/${id}`)
        return response.json()
    }
    // Post Request
    post = async (data) => {
        const response = await fetch(this.url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        return response.json()
    }
    // Put Request
    put = async (id, data) => {
        const response = await fetch(this.url + `/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        return response.json()
    }
    // Delete Request
    delete = async (id) => {
        await fetch(this.url + `/${id}`, {
            method: "DELETE",
        })
        return true
    }
}
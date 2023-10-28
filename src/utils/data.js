import axios from "axios"
import { DataManager, Query } from "@syncfusion/ej2-data"
import { CustomerAdaptor, ManagerAdaptor } from "./adaptors"

export class CustomerCrud {
    constructor() {
        // SERVICE_URL
        this.baseUrl = "http://localhost:8000/customers/"
    }

    // GET request
    async fetchCustomerData() {
        const dataManager = await new DataManager({
            adaptor: new CustomerAdaptor(),
            url: this.baseUrl
        }).executeQuery(new Query())
        dataManager.result = dataManager.actual.results
        dataManager.count = dataManager.actual.count

        console.log("Fetch customers data [GET] ", dataManager)

        return dataManager
    }

    // POST request
    async addCustomerData(data) {
        const postData = {
            address: data.address,
            contact_person: data.contact_person,
            phone_number: data.phone_number,
            kra_pin: data.kra_pin,
            user: {
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                email: data.user.email,
                username: `${data.user.first_name} ${data.user.last_name}`
            },
        }

        console.log("Post Data ", postData)

        const dataManager = new DataManager({
            adaptor: new CustomerAdaptor(),
            url: this.baseUrl
        })

        const insertedData = await dataManager.insert(postData)
        const query = new Query()
        const response = await dataManager.executeQuery(query)
        response.count = response.actual.count
        response.result = response.actual.results

        console.log("Add customer data [POST] ", response)

        return response
    }

    // PUT request
    async editCustomerData(data) {
        const putData = {
            address: data.address,
            contact_person: data.contact_person,
            phone_number: data.phone_number,
            kra_pin: data.kra_pin,
            user: {
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                email: data.user.email,
                username: `${data.user.first_name} ${data.user.last_name}`
            },
        }
        console.log("Put Data ", putData)

        const dataManager = new DataManager({
            adaptor: new CustomerAdaptor(),
            url: `${this.baseUrl}${data.customer_id}/`
        })
        
        console.log("dataManager ", dataManager)

        const updatedData = await dataManager.update("customer_id", putData);
        console.log("Updated Data ", updatedData)
        const query = new Query()
        
        const response = await dataManager.executeQuery(query)

        response.result = Array(response.actual)

        console.log("Update customer data [PUT] ", response)

        return response
    }

    // DELETE request
    async deleteCustomerData(customer_id) {
        console.log("Delete customer ID ", customer_id)
        const dataManager = new DataManager({
            adaptor: new CustomerAdaptor(),
            url: this.baseUrl.replace(/\/$/, ''),
        })
        try {
            await dataManager.remove("customer_id", customer_id);
            await dataManager.executeQuery(new Query())
        } catch (error) {
            console.error(error)
        }

    }

    //Searching
    async searchCustomerData(searchQueryParams) {
        const endpoint = this.baseUrl
        try {
            const response = await axios.get(endpoint, { params: searchQueryParams });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // filter
    async filterCustomerData(filterQueryParams) {
        const endpoint = this.baseUrl
        try {
            const response = await axios.get(endpoint, { params: filterQueryParams });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // sorting
    async SortCustomerData(sortQueryParams) {
        const endpoint = this.baseUrl
        try {
            const response = await axios.get(endpoint, { params: sortQueryParams });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}


export class ManagerCrud {
    constructor() {
        // SERVICE_URL
        this.baseUrl = "http://localhost:8000/managers/"
    }

    // GET request
    async fetchManagerData() {
        const dataManager = await new DataManager({
            adaptor: new ManagerAdaptor(),
            url: this.baseUrl
        }).executeQuery(new Query())
        dataManager.result = dataManager.actual.results
        dataManager.count = dataManager.actual.count

        console.log("Fetch Managers data [GET] ", dataManager)

        return dataManager
    }

    // POST request
    async addManagerData(data) {
        const postData = {
            phone_number: data.phone_number,
            user: {
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                email: data.user.email,
                username: `${data.user.first_name} ${data.user.last_name}`
            },
        }

        console.log("Manager Post Data ", postData)

        const dataManager = new DataManager({
            adaptor: new ManagerAdaptor(),
            url: this.baseUrl
        })

        const insertedData = await dataManager.insert(postData)
        const query = new Query()
        const response = await dataManager.executeQuery(query)
        response.count = response.actual.count
        response.result = response.actual.results

        console.log("Add Manager data [POST] ", response)

        return response
    }

    // PUT request
    async editManagerData(data) {
        const putData = {
            phone_number: data.phone_number,
            user: {
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                email: data.user.email,
                username: `${data.user.first_name} ${data.user.last_name}`
            },
        }
        console.log("Manager Put Data ", putData)

        const dataManager = new DataManager({
            adaptor: new ManagerAdaptor(),
            url: `${this.baseUrl}${data.manager_id}/`
        })
        
        console.log("dataManager ", dataManager)

        const updatedData = await dataManager.update("manager_id", putData);
        console.log("Updated Data ", updatedData)
        const query = new Query()
        
        const response = await dataManager.executeQuery(query)

        response.result = Array(response.actual)

        console.log("Update manager data [PUT] ", response)

        return response
    }

    // DELETE request
    async deleteManagerData(manager_id) {
        console.log("Delete manager ID ", manager_id)
        const dataManager = new DataManager({
            adaptor: new ManagerAdaptor(),
            url: this.baseUrl.replace(/\/$/, ''),
        })
        try {
            await dataManager.remove("manager_id", manager_id);
            await dataManager.executeQuery(new Query())
        } catch (error) {
            console.error(error)
        }

    }

    //Searching
    async searchManagerData(searchQueryParams) {
        const endpoint = this.baseUrl
        try {
            const response = await axios.get(endpoint, { params: searchQueryParams });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // filter
    async filterManagerData(filterQueryParams) {
        const endpoint = this.baseUrl
        try {
            const response = await axios.get(endpoint, { params: filterQueryParams });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // sorting
    async SortManagerData(sortQueryParams) {
        const endpoint = this.baseUrl
        try {
            const response = await axios.get(endpoint, { params: sortQueryParams });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
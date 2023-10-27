import axios from "axios"
import { DataManager, Query } from "@syncfusion/ej2-data"
import { CustomerAdaptor } from "./adaptors"

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

        const dataManager = new DataManager({
            adaptor: new CustomerAdaptor(),
            url: this.baseUrl
        })

        const insertedData = await dataManager.insert(postData)
        const query = new Query()
        const response = await dataManager.executeQuery(query)
        response.count = response.actual.count
        response.result = response.actual.results
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

        const dataManager = new DataManager({
            adaptor: new CustomerAdaptor(),
            url: `${this.baseUrl}${data.customer_id}/`
        })
        
        const updatedData = await dataManager.update("customer_id", putData);
        const query = new Query()
        const response = await dataManager.executeQuery(query)
        response.result = Array(response.actual)
        return response
    }

    // DELETE request
    async deleteCustomerData(customer_id) {
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
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // filter
    async filterCustomerData(filterQueryParams) {
        const endpoint = this.baseUrl
        try {
            const response = await axios.get(endpoint, { params: filterQueryParams });
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
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
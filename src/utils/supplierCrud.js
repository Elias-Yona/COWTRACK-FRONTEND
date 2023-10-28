import axios from "axios"
import { DataManager, Query } from "@syncfusion/ej2-data"
import { SupplierAdaptor } from "./adaptors"

export class SupplierCrud {
    constructor() {
        // SERVICE_URL
        this.baseUrl = "http://localhost:8000/suppliers/"
    }

    // GET request
    async fetchSupplierData() {
        const dataManager = await new DataManager({
            adaptor: new SupplierAdaptor(),
            url: this.baseUrl
        }).executeQuery(new Query())
        dataManager.result = dataManager.actual.results
        dataManager.count = dataManager.actual.count

        console.log("Fetch SupplierAdaptor data [GET] ", dataManager)

        return dataManager
    }

    // POST request
    async addSupplierData(data) {
        const postData = {
            phone_number: data.phone_number,
            kra_pin: data.kra_pin,
            notes: data.notes,
            contact_person: data.contact_person,
            user: {
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                email: data.user.email,
                username: `${data.user.first_name} ${data.user.last_name}`
            },
        }

        console.log("SupplierAdaptor Post Data ", postData)

        const dataManager = new DataManager({
            adaptor: new SupplierAdaptor(),
            url: this.baseUrl
        })

        const insertedData = await dataManager.insert(postData)
        const query = new Query()
        const response = await dataManager.executeQuery(query)
        response.count = response.actual.count
        response.result = response.actual.results

        console.log("Add SupplierAdaptor data [POST] ", response)

        return response
    }

    // PUT request
    async editSupplierData(data) {
        const putData = {
            phone_number: data.phone_number,
            kra_pin: data.kra_pin,
            notes: data.notes,
            contact_person: data.contact_person,
            user: {
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                email: data.user.email,
                username: `${data.user.first_name} ${data.user.last_name}`
            },
        }
        console.log("Supplier Put Data ", putData)

        const dataManager = new DataManager({
            adaptor: new SupplierAdaptor(),
            url: `${this.baseUrl}${data.supplier_id}/`
        })
        
        console.log("dataManager ", dataManager)

        const updatedData = await dataManager.update("supplier_id", putData);
        console.log("Updated Data ", updatedData)
        const query = new Query()
        
        const response = await dataManager.executeQuery(query)

        response.result = Array(response.actual)

        console.log("Update Supplier data [PUT] ", response)

        return response
    }

    // DELETE request
    async deleteSupplierData(supplier_id) {
        console.log("Delete Supplier ID ", supplier_id)
        const dataManager = new DataManager({
            adaptor: new SupplierAdaptor(),
            url: this.baseUrl.replace(/\/$/, ''),
        })
        try {
            await dataManager.remove("supplier_id", supplier_id);
            await dataManager.executeQuery(new Query())
        } catch (error) {
            console.error(error)
        }

    }

    //Searching
    async searchSupplierData(searchQueryParams) {
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
    async filterSupplierData(filterQueryParams) {
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
    async SortSupplierData(sortQueryParams) {
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
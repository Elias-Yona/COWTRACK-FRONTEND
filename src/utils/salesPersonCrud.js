import axios from "axios"
import { DataManager, Query } from "@syncfusion/ej2-data"
import { SalespersonAdaptor } from "./adaptors"

export class SalesPersonCrud {
    constructor() {
        // SERVICE_URL
        this.baseUrl = "http://localhost:8000/salespersons/"
    }

    // GET request
    async fetchSalesPersonData() {
        const dataManager = await new DataManager({
            adaptor: new SalespersonAdaptor(),
            url: this.baseUrl
        }).executeQuery(new Query())
        dataManager.result = dataManager.actual.results
        dataManager.count = dataManager.actual.count

        console.log("Fetch Salesperson data [GET] ", dataManager)

        return dataManager
    }

    // POST request
    async addSalesPersonData(data) {
        const postData = {
            phone_number: data.phone_number,
            user: {
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                email: data.user.email,
                username: data.user.username
            },
        }

        console.log("Salesperson Post Data ", postData)

        const dataManager = new DataManager({
            adaptor: new SalespersonAdaptor(),
            url: this.baseUrl
        })

        const insertedData = await dataManager.insert(postData)
        const query = new Query()
        const response = await dataManager.executeQuery(query)
        response.count = response.actual.count
        response.result = response.actual.results

        console.log("Add Salesperson data [POST] ", response)

        return response
    }

    // PUT request
    async editSalesPersonData(data) {
        const putData = {
            phone_number: data.phone_number,
            user: {
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                email: data.user.email,
                username: data.user.username
            },
        }
        console.log("Salesperson Put Data ", putData)

        const dataManager = new DataManager({
            adaptor: new SalespersonAdaptor(),
            url: `${this.baseUrl}${data.sales_person_id}/`
        })
        
        console.log("dataManager ", dataManager)

        const updatedData = await dataManager.update("sales_person_id", putData);
        console.log("Updated Data ", updatedData)
        const query = new Query()
        
        const response = await dataManager.executeQuery(query)

        response.result = Array(response.actual)

        console.log("Update Salesperson data [PUT] ", response)

        return response
    }

    // DELETE request
    async deleteSalesPersonData(salesperson_id) {
        console.log("Delete Salesperson ID ", salesperson_id)
        const dataManager = new DataManager({
            adaptor: new SalespersonAdaptor(),
            url: this.baseUrl.replace(/\/$/, ''),
        })
        try {
            await dataManager.remove("sales_person_id", salesperson_id);
            await dataManager.executeQuery(new Query())
        } catch (error) {
            console.error(error)
        }

    }

    //Searching
    async searchSalesPersonData(searchQueryParams) {
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
    async filterSalesPersonData(filterQueryParams) {
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
    async SortSalesPersonData(sortQueryParams) {
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
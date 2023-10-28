import axios from "axios"
import { DataManager, Query } from "@syncfusion/ej2-data"
import { SupervisorAdaptor } from "./adaptors"

export class SupervisorCrud {
    constructor() {
        // SERVICE_URL
        this.baseUrl = "http://localhost:8000/supervisors/"
    }

    // GET request
    async fetchSupervisorData() {
        const dataManager = await new DataManager({
            adaptor: new SupervisorAdaptor(),
            url: this.baseUrl
        }).executeQuery(new Query())
        dataManager.result = dataManager.actual.results
        dataManager.count = dataManager.actual.count

        console.log("Fetch Supervisor data [GET] ", dataManager)

        return dataManager
    }

    // POST request
    async addSupervisorData(data) {
        const postData = {
            phone_number: data.phone_number,
            user: {
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                email: data.user.email,
                username: data.user.username
            },
        }

        console.log("Supervisor Post Data ", postData)

        const dataManager = new DataManager({
            adaptor: new SupervisorAdaptor(),
            url: this.baseUrl
        })

        const insertedData = await dataManager.insert(postData)
        const query = new Query()
        const response = await dataManager.executeQuery(query)
        response.count = response.actual.count
        response.result = response.actual.results

        console.log("Add Supervisor data [POST] ", response)

        return response
    }

    // PUT request
    async editSupervisorData(data) {
        const putData = {
            phone_number: data.phone_number,
            user: {
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                email: data.user.email,
                username: data.user.username
            },
        }
        console.log("Supervisor Put Data ", putData)

        const dataManager = new DataManager({
            adaptor: new SupervisorAdaptor(),
            url: `${this.baseUrl}${data.supervisor_id}/`
        })
        
        console.log("dataManager ", dataManager)

        const updatedData = await dataManager.update("supervisor_id", putData);
        console.log("Updated Data ", updatedData)
        const query = new Query()
        
        const response = await dataManager.executeQuery(query)

        response.result = Array(response.actual)

        console.log("Update Supervisor data [PUT] ", response)

        return response
    }

    // DELETE request
    async deleteSupervisorData(supervisor_id) {
        console.log("Delete Supervisor ID ", supervisor_id)
        const dataManager = new DataManager({
            adaptor: new SupervisorAdaptor(),
            url: this.baseUrl.replace(/\/$/, ''),
        })
        try {
            await dataManager.remove("supervisor_id", supervisor_id);
            await dataManager.executeQuery(new Query())
        } catch (error) {
            console.error(error)
        }

    }

    //Searching
    async searchSupervisorData(searchQueryParams) {
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
    async filterSupervisorData(filterQueryParams) {
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
    async SortSupervisorData(sortQueryParams) {
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
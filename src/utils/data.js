import axios from 'axios'
import { flattenData } from "./helpers.js"


export  class CustomerCRUD {
    constructor() {
        this.baseUrl = 'http://localhost:8000/customers'
    }

    // GET 
    async fetchCustomersData() {
        try {
            const response = await axios.get(this.baseUrl);  
            const data = response.data
    
            const results = data.results
            const finalData = []
    
            for (let singleData of results) {
                const flattenedData = flattenData(singleData)
                const dataSchema = {
                    count: data.count,
                    next: data.next,
                    previous: data.previous,
                    ...flattenedData,
                }
                finalData.push(dataSchema)
            }
    
            return {count: finalData.length, data: finalData}
        } catch (error) {
            console.error('Error fetching data:', error); 
            throw error; // Re-throw the error to be handled by the caller if needed
        }
    }

    // POST
    async AddCustomersData(data) {
        try {
            const postData = {
                address: data.address,
                contact_person: data.contact_person,
                phone_number: data.phone_number,
                user: {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email
                }
            };

            const response = await axios.post(this.baseUrl, postData);  
            return response.data
        } catch (error) {
            console.error('Error fetching data:', error); 
            throw error; // Re-throw the error to be handled by the caller if needed
        }
    }
}

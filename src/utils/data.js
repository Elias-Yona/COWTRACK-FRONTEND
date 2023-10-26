import axios from "axios";
import { DataManager, Query } from '@syncfusion/ej2-data';
import { CustomerAdaptor } from "./adaptors"

import { flattenData } from "./helpers.js";

export class CustomerCRUD {
    constructor() {
        this.baseUrl = "http://localhost:8000/customers/";
    }

    async fetchCustomersData() {
        return new DataManager({ 
            adaptor: new CustomerAdaptor(),
            url: this.baseUrl,
         }).executeQuery(new Query()).then((e) => {
            const totalCount = e.actual.count; 
            const itemsPerPage = e.actual.results.length;
            e.count = Math.ceil(totalCount / itemsPerPage)
            e.result = e.result.results
            return e
         });
    }

    // POST
    async addCustomerData(data) {
        const postData = {
            address: data.address,
            contact_person: data.contact_person,
            phone_number: data.phone_number,
            kra_pin: data.kra_pin,
            user: {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                username: `${data.first_name} ${data.last_name}`
            },
        };
        const dataManager = new DataManager({
            adaptor: new CustomerAdaptor(),
            url: this.baseUrl
        });
        dataManager.insert(postData, null, null, null);
        return dataManager.executeQuery(new Query()).then((e) => {
            return e;
        });
    }

    // PUT
    async editCustomerData(data) {
        try {
            const postData = {
                address: data.address,
                contact_person: data.contact_person,
                phone_number: data.phone_number,
                kra_pin: data.kra_pin,
                user: {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    username: `${data.first_name} ${data.last_name}`
                },
            };

            const response = await axios.put(
                `${this.baseUrl}${data.customer_id}/`,
                JSON.stringify(postData),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            
            const results = response.data;
            const finalData = [];

            for (let singleData of results) {
                const flattenedData = flattenData(singleData);
                const dataSchema = {
                    count: data.count,
                    next: data.next,
                    previous: data.previous,
                    ...flattenedData,
                };
                finalData.push(dataSchema);
            }

            return { count: finalData.length, data: finalData };
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error; // Re-throw the error to be handled by the caller if needed
        }
    }

    // DELETE
    async deleteCustomerData(id) {
        try {
            const response = await axios.delete(`${this.baseUrl}${id}/`);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error; // Re-throw the error to be handled by the caller if needed
        }
    }
}

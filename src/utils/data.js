import axios from 'axios'

import { flattenData } from "./helpers.js"


export function fetchCustomersData() {
    const fetchData = async () => {
        let data;
        try {
            const response = await axios.get('http://localhost:8000/customers/');  
            data = response.data
        } catch (error) {
            console.error('Error fetching data:', error); 
        }

        let results = data.results
        let dataSchema = {
            count: data.count,
            next: data.next,
            previous: data.previous,
        }
        let finalData = []

        for (let singleData of results) {
            let flattenedData = flattenData(singleData)
            Object.assign(dataSchema, flattenedData)
            finalData.push(dataSchema)
        }

        return finalData
    };

    return fetchData();
}

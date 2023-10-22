import axios from 'axios'

import { flattenData } from "./helpers.js"


export function fetchCustomersData() {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/customers/');  
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

            return finalData

        } catch (error) {
            console.error('Error fetching data:', error); 
        } 
    };

    return fetchData();
}

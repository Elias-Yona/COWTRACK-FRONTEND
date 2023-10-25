import { WebApiAdaptor } from "@syncfusion/ej2-data"
import { setValue } from '@syncfusion/ej2-base';
import { flattenData } from "./helpers.js";

export class CustomerAdaptor extends WebApiAdaptor {
    processResponse(data, type, request, xhr, query, dm) {
        data = super.processResponse(data, type, request, xhr, query, dm);
        const keys = Object.keys(flattenData(data.results[0]));
        const flattenedData = data.results.map((item) => flattenData(item));
 
        let index = 0;

        data.results.forEach((item) => {
            keys.forEach((key) => {
                setValue(key, flattenedData[index][key], item);
            });
            setValue(
                "customer_image", 
                item.user.first_name ? `https://ui-avatars.com/api/?name=${item.user.first_name}+${item.user.last_name}` : "https://ui-avatars.com/api/?name=No Data",            
                item
            );    
            index++; 
        });
    
        return data;
      }
}
import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective,  ColumnDirective, Inject, Edit, Toolbar, Page, Search, Filter, Sort } from "@syncfusion/ej2-react-grids";
import { TailSpin } from "react-loader-spinner";

import { CustomerGrid } from "../utils/grids";
import { Header } from "../components";
import { CustomerCrud } from "../utils/data";

const Customers = () => {
    const [data, setData] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const customerData = new CustomerCrud()
    const toolbarOptions = ["Add", "Edit", "Delete", "Search"];
    const selectionsettings = { persistSelection: true };
    const editing = { allowDeleting: true, allowEditing: true, allowAdding: true, mode: "Dialog" };

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const result = await customerData.fetchCustomerData();
        setData(result.result);
        setIsLoading(false);
    }

    // Handling different actions on grid
    const handleDataAction = async (args) => {
        console.log("Args ", args)
        switch (args.requestType) {
            case 'add':
                // Handle the addition of a new record
                console.log("Add action ", args.data)
                setIsEdit(false)
                console.log("Edit state ", isEdit)
                break;
            case 'beginEdit':
                // Handle the addition of a new record
                console.log("Edit action ", args.data)
                setIsEdit(true)
                console.log("Edit state ", isEdit)
                break;
            case 'save':
                // Handle the saving of an edited record or addition of a new record
                if (isEdit) {
                    console.log("Edit Action ", args.data)
                    const updatedRecord = await customerData.editCustomerData(args.data);
                    const index = data.findIndex(record => record.customer_id === updatedRecord.result[0].customer_id);
                    const updatedData = [...data];
                    console.log("updated Data ", updatedData)
                    console.log("updated Data Index ", index)
                    updatedData.splice(index, 1, updatedRecord.result[0]);
                    setData(updatedData);
                } else {
                    console.log("Save Action ", args.data)
                    const insertedRecord = await customerData.addCustomerData(args.data);
                    const index = data.findIndex(record => record.customer_id === insertedRecord.result[0].customer_id);
                    const insertedData = [...data];
                    console.log(insertedRecord)
                    insertedData.splice(0, 1, insertedRecord.result[0]);
                    setData(insertedData);
                }
                break;
            case 'delete':
                // Handle the deletion of a record
                console.log("Delete action ", args.data)
                const customerId = args.data[0].customer_id
                customerData.deleteCustomerData(customerId);
                break;
            case 'searching':
                const searchString = args.searchString
                const searchQueryParams = {search: searchString}
                const searchResult = await customerData.searchCustomerData(searchQueryParams)
                setData(searchResult.results)
                console.log("Search string ", searchString)
                console.log("Search result ", searchResult)

                break;
            case 'filtering':
                const value = args.currentFilterObject.value
                const filterQueryParams = {}
                if (args.currentFilterObject.operator == "greaterthan") {
                    filterQueryParams.user__date_joined__gt = value
                } else if (args.currentFilterObject.operator == "lessthan") {
                    filterQueryParams.user__date_joined__lt = value
                }
                console.log("Filter string ", filterQueryParams)
                const filterResult = await customerData.filterCustomerData(filterQueryParams)
                console.log("Filter result ", filterResult)
                setData(filterResult.results)
                break;
            case 'sorting':
                const sortQueryParams = {}
                if (args.columnName == "user.last_name" && args.direction == 'Ascending') {
                    sortQueryParams.ordering = 'user__last_name'
                } else if (args.columnName == "user.last_name" && args.direction == 'Descending') {
                    sortQueryParams.ordering = '-user__last_name'
                } else if (args.columnName == "user.first_name" && args.direction == 'Descending') {
                    sortQueryParams.ordering = '-user__first_name'
                } else if (args.columnName == "user.last_name" && args.direction == 'Ascending') {
                    sortQueryParams.ordering = 'user__first_name'
                } else if (args.columnName == "user.date_joined" && args.direction == 'Ascending') {
                    sortQueryParams.ordering = 'user__date_joined'
                } else if (args.columnName == "user.date_joined" && args.direction == 'Decending') {
                    sortQueryParams.ordering = '-user__date_joined'
                }

                console.log("Sort string ", sortQueryParams)
                const sortResult = await customerData.SortCustomerData(sortQueryParams)
                console.log("Sort result ", sortResult)
                setData(sortResult.results)

                break;
            default:
                // Handle other data actions as needed
                break;
        }
    };

    function actionBegin(args) {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            for (var i = 0; i < this.columns.length; i++) {
                if (this.columns[i].headerText === "Name") {
                    this.columns[i].visible = false;
                }
                else if (this.columns[i].field === "user.first_name") {
                    this.columns[i].visible = true;
                }
                else if (this.columns[i].field === "user.last_name") {
                    this.columns[i].visible = true;
                }
                else if (this.columns[i].field === "user.email") {
                    this.columns[i].visible = true;
                }
                else if (this.columns[i].field === "customer_id") {
                    this.columns[i].visible = false;
                }
                else if (this.columns[i].field == "address") {
                    this.columns[i].visible = true;
                }
                else if (this.columns[i].field == "user.username") {
                    this.columns[i].visible = true;
                }
            }
        }
    }

    

    return (
        <div lassName="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Customers" />
            {isLoading ? (
                <div className="flex justify-center">
                    <TailSpin
                        height="50"
                        width="50"
                        color="blue"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            ) : (
            // <button onClick={fetchData}>Refresh Grid</button>
            <GridComponent 
                dataSource={data}
                toolbar={toolbarOptions}
                editSettings={editing}
                actionComplete={handleDataAction}
                enableImmutableMode={true}
                allowPaging={true}
                allowFiltering={true} 
                allowSorting={true}
                actionBegin={actionBegin}
                selectionSettings={selectionsettings}
            >
                <ColumnsDirective>
                    {new CustomerGrid().grid().map((item, index) => (
                        <ColumnDirective key={index} {...item} />
                    ))}
                </ColumnsDirective>
                <Inject
                    services={[
                        Toolbar,
                        Edit,
                        Page,
                        Search,
                        Filter,
                        Sort
                    ]}
                />
            </GridComponent>
            )}
        </div>
    )
}

export default Customers;
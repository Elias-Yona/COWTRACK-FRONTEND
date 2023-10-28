import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective,  ColumnDirective, Inject, Edit, Toolbar, Page, Search, Filter, Sort } from "@syncfusion/ej2-react-grids";


import { SupervisorGrid } from "../utils/grids";
import { Header } from "../components";
import { SupervisorCrud } from "../utils/supervisorCrud";

const Supervisors = () => {
    const [data, setData] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const supervisorData = new SupervisorCrud()
    const toolbarOptions = ["Add", "Edit", "Delete", "Search"];
    const selectionsettings = { persistSelection: true };
    const editing = { allowDeleting: true, allowEditing: true, allowAdding: true, mode: "Dialog" };

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const result = await supervisorData.fetchSupervisorData();
        setData(result.result);
    }

    // Handling different actions on grid
    async function handleDataAction(args) {
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
                console.log("Edit action ", args.rowData)
                setIsEdit(true)
                console.log("Edit state ", isEdit)
                break;
            case 'save':
                // Handle the saving of an edited record or addition of a new record
                if (args.action == "edit") {
                    console.log("Edit Action ", args.data)
                    const updatedRecord = await supervisorData.editSupervisorData(args.data);
                    const index = data.findIndex(record => record.supervisor_id === updatedRecord.result[0].supervisor_id);
                    const updatedData = [...data];
                    console.log("updated Data ", updatedData)
                    console.log("updated Data Index ", index)
                    updatedData.splice(index, 1, updatedRecord.result[0]);
                    setData(updatedData);
                } else {
                    console.log("Save Action ", args.data)
                    const insertedRecord = await supervisorData.addSupervisorData(args.data);
                    console.log("insertedRecord  ", insertedRecord)
                    const index = data.findIndex(record => record.supervisor_id === insertedRecord.result[0].supervisor_id);
                    const insertedData = [...data];
                    console.log(insertedRecord)
                    insertedData.splice(0, 1, insertedRecord.result[0]);
                    setData(insertedData);
                }
                break;
            case 'delete':
                // Handle the deletion of a record
                console.log("Delete action ", args.data)
                const supervisorId = await args.promise[0].supervisor_id
                supervisorData.deleteSupervisorData(supervisorId);
                break;
            case 'searching':
                const searchString = args.searchString
                const searchQueryParams = {search: searchString}
                const searchResult = await supervisorData.searchSupervisorData(searchQueryParams)
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
                const filterResult = await supervisorData.filterSupervisorData(filterQueryParams)
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
                const sortResult = await supervisorData.SortSupervisorData(sortQueryParams)
                console.log("Sort result ", sortResult)
                setData(sortResult.results)

                break;
            default:
                // Handle other data actions as needed
                break;
        }

        // fields
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            const cols = this.columns;
            for (const col of cols) {
                if (col.headerText === "Name") {
                    col.visible = true;
                }
                else if (col.field === "user.date_joined" ) {
                    col.visible = true;
                }
                else if (col.field === "user.first_name" ) {
                    col.visible = false;
                }
                else if (col.field === "user.last_name" ) {
                    col.visible = false;
                }
                else if (col.field === "user.email" ) {
                    col.visible = false;
                }
                else if (col.field === "supervisor_id" ) {
                    col.visible = true;
                }
            }
        }
    };

    function actionBegin(args) {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            const cols = this.columns;
            console.log("Edit Columns ", cols)
            for (const col of cols) {
                if (col.headerText === "Name") {
                    col.visible = false;
                }
                else if (col.field === "user.first_name" ) {
                    col.visible = true;
                }
                else if (col.field === "user.date_joined" ) {
                    col.visible = false;
                }
                else if (col.field === "user.last_name" ) {
                    col.visible = true;
                }
                else if (col.field === "user.email" ) {
                    col.visible = true;
                }
                else if (col.field === "supervisor_id" ) {
                    col.visible = false;
                }
            }
        }
    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Supervisors" />

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
                    {new SupervisorGrid().grid().map((item, index) => (
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
        </div>
    )
}

export default Supervisors;
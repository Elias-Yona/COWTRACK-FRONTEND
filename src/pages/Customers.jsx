import React, { useEffect, useState } from "react";
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Selection,
    Inject,
    Edit,
    Toolbar,
    Sort,
    Filter,
} from "@syncfusion/ej2-react-grids";
import { TailSpin } from "react-loader-spinner";

import { CustomerGrid } from "../utils/grids";
import { Header } from "../components";
import { CustomerCRUD } from "../utils/data";


const Customers = () => {
    const selectionsettings = { persistSelection: true };
    const toolbarOptions = ["Add", "Edit", "Delete"];
    const editing = { allowDeleting: true, allowEditing: true, allowAdding: true, mode: "Dialog" };
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const customerCRUD = new CustomerCRUD()

    useEffect(() => {
        const fetchData = async () => {
            const customersData = await customerCRUD.fetchCustomersData();
            const pageData = customersData.data.map((item) => ({
              ...item,
              customer_image: `https://ui-avatars.com/api/?name=${item.first_name}+${item.last_name}`,
            }));
            const customizedPageData = {result: pageData, count: customersData.count}

            setData(customizedPageData);
            setIsLoading(false);
        };

        if (data.length === 0) {
            setIsLoading(true);
            fetchData();
        } else {
            setIsLoading(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    function actionBegin(args) {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            for (var i = 0; i < this.columns.length; i++) {
                if (this.columns[i].headerText === "Name") {
                    this.columns[i].visible = false;
                }
                else if (this.columns[i].field === "first_name") {
                    this.columns[i].visible = true;
                }
                else if (this.columns[i].field === "last_name") {
                    this.columns[i].visible = true;
                }
                else if (this.columns[i].field === "email") {
                    this.columns[i].visible = true;
                }
                else if (this.columns[i].field === "customer_id") {
                    this.columns[i].visible = false;
                }
                else if (this.columns[i].field == "address") {
                    this.columns[i].visible = true;
                }
                else if (this.columns[i].field == "username") {
                    this.columns[i].visible = true;
                }
            }
        }
    }

    function actionComplete(args) {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            for (var i = 0; i < this.columns.length; i++) {
                if (this.columns[i].headerText == "Name") {
                    this.columns[i].visible = true;
                }
                else if (this.columns[i].field == "first_name") {
                    this.columns[i].visible = false;
                }
                else if (this.columns[i].field == "last_name") {
                    this.columns[i].visible = false;
                }
                else if (this.columns[i].field == "email") {
                    this.columns[i].visible = false;
                }
                else if (this.columns[i].field == "address") {
                    this.columns[i].visible = false;
                }
                else if (this.columns[i].field == "username") {
                    this.columns[i].visible = false;
                }
            }
        }
    }

    const dataSourceChanged = (state)  => {
        if (state.action === "add") {
            const response = customerCRUD.addCustomerData(state.data)
        } else if (state.action === "delete") {
            const response = customerCRUD.deleteCustomerData(state.data[0].customer_id)
        } else if (state.action === "edit") {
            const response = customerCRUD.editCustomerData(state.data)
        }
    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
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
                <GridComponent
                    dataSource={data}
                    enableHover={false}
                    allowPaging
                    pageSettings={{ pageCount: 1 }}
                    selectionSettings={selectionsettings}
                    toolbar={toolbarOptions}
                    editSettings={editing}
                    allowSorting
                    actionBegin={actionBegin}
                    actionComplete={actionComplete}
                    dataSourceChanged={dataSourceChanged}
                >
                    <ColumnsDirective>
                        {new CustomerGrid().grid().map((item, index) => (
                            <ColumnDirective key={index} {...item} />
                        ))}
                    </ColumnsDirective>
                    <Inject
                        services={[
                            Page,
                            Selection,
                            Toolbar,
                            Edit,
                            Sort,
                            Filter,
                        ]}
                    />
                </GridComponent>
            )}
        </div>
    );
};

export default Customers;

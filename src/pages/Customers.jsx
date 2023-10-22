import React, { useEffect, useState } from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { TailSpin } from  'react-loader-spinner'

import { customersGrid } from '../utils/grids';
import { Header } from '../components';
import { fetchCustomersData } from '../utils/data'


const Customers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const customersData = await fetchCustomersData(); // Await the fetch operation
      
      const pData = customersData.map((item) => ({
        CustomerID: item.customer_id,
        CustomerName: `${item.first_name} ${item.last_name}`,
        CustomerPhoneNumber: item.phone_number,
        CustomerEmail: item.email,
        CustomerDateJoined: new Date(item.date_joined).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
        CustomerImage: `https://ui-avatars.com/api/?name=${item.first_name}+${item.last_name}`
      }));
  
      setData(customersData);
      setPageData(pData);
      setIsLoading(false);
    };
  
    if (pageData.length === 0) {
      setIsLoading(true);
      fetchData();
    } else {
      setIsLoading(false);
    }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData]);
  
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
          dataSource={pageData}
          enableHover={false}
          allowPaging
          pageSettings={{ pageCount: 1 }}
          selectionSettings={selectionsettings}
          toolbar={toolbarOptions}
          editSettings={editing}
          allowSorting
        >
          <ColumnsDirective>
            {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
          </ColumnsDirective>
          <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
        </GridComponent>
      )}
    </div>
  )
}

export default Customers
import React, { useEffect, useState } from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';
import { fetchCustomersData } from '../utils/data'


const Customers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const [data, setData] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:8000/customers/');  
    //     setData(response.data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error); 
    //   }
    // };

    // fetchData();  
    setData(fetchCustomersData())
  }, []);

  console.log(data)
  //customersData = flattenData(data.results)
  
  console.log(data)
  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={data}
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
    </div>
  )
}

export default Customers
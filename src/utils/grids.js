const customerGridImage = (props) => (
    <div className="image flex gap-4">
        <img
            className="rounded-full w-10 h-10"
            src= {props.CustomerImage}
            alt="employee"
        />
        <div>
            <p>{props.CustomerName}</p>
            <p>{props.CustomerEmail}</p>
        </div>
    </div>
);

export const customersGrid = [
    { 
        type: 'checkbox', 
        width: '50' 
    },
    {
        headerText: "Name",
        width: "160",
        template: customerGridImage,
        textAlign: "Center",
    },
    {
        field: "CustomerPhoneNumber",
        headerText: "Phone Number",
        width: "150",
        textAlign: "Center",
    },
    {
        field: "CustomerDateJoined",
        headerText: "Joining Date",
        width: "150",
        textAlign: "Center",
    },
    {
        field: "CustomerID",
        headerText: "Customer ID",
        width: "120",
        textAlign: "Center",
        isPrimaryKey: true,
    },
];

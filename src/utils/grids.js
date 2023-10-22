import { MaskedTextBoxComponent } from "@syncfusion/ej2-react-inputs";


export class CustomerGrid {
    gridImage (props) {     
        return (
            <div className="image flex gap-4">
                <img
                    className="rounded-full w-10 h-10"
                    src= {props.customer_image}
                    alt="employee"
                />
                <div>
                    <p>
                        <span>{props.first_name}</span>
                        <span>&nbsp;</span>
                        <span>{props.last_name}</span>
                    </p>
                    <p>{props.email}</p>
                </div>
            </div>
        );
    }

    phoneNumberTemplate(args) {
        return (
            <MaskedTextBoxComponent 
                value={args.phone_number}
                mask="07XX XXX XXX"
                id="phone_number"
            />
        )
    }

    grid() {
        return  [
            { 
                type: 'checkbox', 
                width: '50' 
            },
            {
                headerText: "Name",
                width: "160",
                template: this.gridImage,
                textAlign: "Center",
            },
            {
                field: "phone_number",
                headerText: "Phone Number",
                width: "150",
                textAlign: "Left",
                editTemplate: this.phoneNumberTemplate,
            },
            {
                field: "date_joined",
                headerText: "Joining Date",
                width: "150",
                textAlign: "Left",
                format: "yMd",
                allowEditing: false
            },
            {
                field: "customer_id",
                headerText: "Customer ID",
                width: "120",
                textAlign: "Left",
                isPrimaryKey: true,
            },
        ];        
    }
}
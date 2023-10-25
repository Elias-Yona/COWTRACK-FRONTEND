import { MaskedTextBoxComponent } from "@syncfusion/ej2-react-inputs";


export class CustomerGrid {
    gridImage(props) {
        return (
            <div className="image flex gap-4">
                <img
                    className="rounded-full w-10 h-10"
                    src={props.customer_image}
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
            <div className="group">
                <label className="label group-hover:text-[#e3165b]">Phone Number</label>
                <MaskedTextBoxComponent
                    value={args.phone_number}
                    mask="0000-000-000"
                    id="phone_number"
                />
            </div>
        );
    }

    contactPersonTemplate(args) {
        return (
            <div className="group">
                <label className="label group-hover:text-[#e3165b]">Contact Person</label>
                <MaskedTextBoxComponent
                    value={args.contact_person}
                    mask="0000-000-000"
                    id="contact_person"
                />
            </div>
        );
    }

    grid() {
        // prettier-ignore
        return  [
            { type: 'checkbox', width: '50', },
            { headerText: "Name", width: "210", template: this.gridImage, textAlign: "Center", },
            { field: "phone_number", headerText: "Phone Number", width: "130", textAlign: "Center", editTemplate: this.phoneNumberTemplate,},
            { field: "date_joined", headerText: "Joining Date", width: "130", textAlign: "Center", format: "yMd", allowEditing: false },
            { field: "address", headerText: "Address", width: "120", textAlign: "Center", visible: false },
            { field: "contact_person", headerText: "Contact Person", width: "130", textAlign: "Center", editTemplate: this.contactPersonTemplate, },
            { field: "email", headerText: "Email", width: "120", textAlign: "Center", visible: false },
            { field: "username", headerText: "Username", width: "120", textAlign: "Center", visible: false, allowEditing: false },
            { field: "kra_pin", headerText: "kra_pin", width: "120", textAlign: "Center", },
            { field: "first_name", headerText: "First Name", width: "120", textAlign: "Center", visible: false },
            { field: "last_name", headerText: "Last Name", width: "120", textAlign: "Center", visible: false },
            { field: "customer_id", headerText: "Customer ID", width: "120", textAlign: "Center", isPrimaryKey: true, visible: false },    
        ];
    }
}

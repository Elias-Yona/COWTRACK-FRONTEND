import { MaskedTextBoxComponent } from "@syncfusion/ej2-react-inputs";

class SharedSettings {
    gridImage(props) {
        console.log("Grid image Props ", props)
        return (
            <div className="image flex gap-4">
                <img
                    className="rounded-full w-10 h-10"
                    src={props.image}
                    alt="employee"
                />
                <div>
                    <p>
                        <span>{props.user.first_name}</span>
                        <span>&nbsp;</span>
                        <span>{props.user.last_name}</span>
                    </p>
                    <p>{props.user.email}</p>
                </div>
            </div>
        );
    }

    phoneNumberTemplate(args) {
        console.log("Phone number template ", args)
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
}

export class CustomerGrid extends SharedSettings {

    contactPersonTemplate(args) {
        console.log("Contact person template ", args)
        return (
            <div className="group">
                <label className="label group-hover:text-[#e3165b]">Contact Person</label>
                <MaskedTextBoxComponent
                    value={args.contact_person}
                    mask="0000-000-000"
                    id="contact_person"
                    textAlign="Right"
                />
            </div>
        );
    }

    grid() {
        // prettier-ignore
        return  [
            { type: 'checkbox', width: '50', },
            { headerText: "Name", width: "150", template: this.gridImage, textAlign: "Center", allowFiltering: false, allowSorting: false, allowEditing: false},
            { field: "phone_number", headerText: "Phone Number", width: "130", textAlign: "Right", editTemplate: this.phoneNumberTemplate, allowFiltering: false, allowSorting: false},
            { field: "user.date_joined", headerText: "Joining Date", width: "130", textAlign: "Right", type: "date", format: "y-M-d", allowEditing: false, allowSorting: true},
            { field: "address", headerText: "Address", width: "120", textAlign: "Right", visible: false, allowFiltering: false, allowSorting: false},
            { field: "contact_person", headerText: "Contact Person", width: "130", textAlign: "Right", editTemplate: this.contactPersonTemplate, allowFiltering: false, allowSorting: false},
            { field: "user.email", headerText: "Email", width: "120", textAlign: "Right", visible: false, allowFiltering: false, allowSorting: false},
            { field: "user.username", headerText: "Username", width: "120", textAlign: "Right", visible: false, allowEditing: false, allowFiltering: false, allowSorting: false},
            { field: "kra_pin", headerText: "kra_pin", width: "120", textAlign: "Right", allowFiltering: false, allowSorting: false},
            { field: "user.first_name", headerText: "First Name", width: "120", textAlign: "Right", visible: false, allowFiltering: false},
            { field: "user.last_name", headerText: "Last Name", width: "120", textAlign: "Right", visible: false, allowFiltering: false},
            { field: "customer_id", headerText: "Customer ID", width: "120", textAlign: "Right", isPrimaryKey: true, visible: false, allowFiltering: false, allowSorting: false},    
        ];
    }
}


export class ManagerGrid extends SharedSettings {
    grid() {
        // prettier-ignore
        return  [
            { type: 'checkbox', width: '50', },
            { headerText: "Name", width: "150", template: this.gridImage, textAlign: "Center", allowFiltering: false, allowSorting: false, allowEditing: false},
            { field: "phone_number", headerText: "Phone Number", width: "130", textAlign: "Right", editTemplate: this.phoneNumberTemplate, allowFiltering: false, allowSorting: false},
            { field: "user.date_joined", headerText: "Joining Date", width: "130", textAlign: "Right", type: "date", format: "yMd", allowEditing: false, allowSorting: true},
            { field: "user.email", headerText: "Email", width: "120", textAlign: "Right", visible: false, allowFiltering: false, allowSorting: false},
            { field: "user.username", headerText: "Username", width: "120", textAlign: "Right", allowEditing: true, allowFiltering: false, allowSorting: false},
            { field: "user.first_name", headerText: "First Name", width: "120", textAlign: "Right", visible: false, allowFiltering: false},
            { field: "user.last_name", headerText: "Last Name", width: "120", textAlign: "Right", visible: false, allowFiltering: false},
            { field: "manager_id", headerText: "Manager ID", width: "120", textAlign: "Right", isPrimaryKey: true, visible: true, allowFiltering: false, allowSorting: false},    
        ];
    }
}

export class SalesPersonGrid extends SharedSettings {
    grid() {
        // prettier-ignore
        return  [
            { type: 'checkbox', width: '50', },
            { headerText: "Name", width: "150", template: this.gridImage, textAlign: "Center", allowFiltering: false, allowSorting: false, allowEditing: false},
            { field: "phone_number", headerText: "Phone Number", width: "130", textAlign: "Right", editTemplate: this.phoneNumberTemplate, allowFiltering: false, allowSorting: false},
            { field: "user.date_joined", headerText: "Joining Date", width: "130", textAlign: "Right", type: "date", format: "yMd", allowEditing: false, allowSorting: true},
            { field: "user.email", headerText: "Email", width: "120", textAlign: "Right", visible: false, allowFiltering: false, allowSorting: false},
            { field: "user.username", headerText: "Username", width: "120", textAlign: "Right", allowEditing: true, allowFiltering: false, allowSorting: false},
            { field: "user.first_name", headerText: "First Name", width: "120", textAlign: "Right", visible: false, allowFiltering: false},
            { field: "user.last_name", headerText: "Last Name", width: "120", textAlign: "Right", visible: false, allowFiltering: false},
            { field: "sales_person_id", headerText: "Sales Person ID", width: "120", textAlign: "Right", isPrimaryKey: true, visible: true, allowFiltering: false, allowSorting: false},    
        ];
    }
}

export class SupervisorGrid extends SharedSettings {
    grid() {
        // prettier-ignore
        return  [
            { type: 'checkbox', width: '50', },
            { headerText: "Name", width: "150", template: this.gridImage, textAlign: "Center", allowFiltering: false, allowSorting: false, allowEditing: false},
            { field: "phone_number", headerText: "Phone Number", width: "130", textAlign: "Right", editTemplate: this.phoneNumberTemplate, allowFiltering: false, allowSorting: false},
            { field: "user.date_joined", headerText: "Joining Date", width: "130", textAlign: "Right", type: "date", format: "yMd", allowEditing: false, allowSorting: true},
            { field: "user.email", headerText: "Email", width: "120", textAlign: "Right", visible: false, allowFiltering: false, allowSorting: false},
            { field: "user.username", headerText: "Username", width: "120", textAlign: "Right", allowEditing: true, allowFiltering: false, allowSorting: false},
            { field: "user.first_name", headerText: "First Name", width: "120", textAlign: "Right", visible: false, allowFiltering: false},
            { field: "user.last_name", headerText: "Last Name", width: "120", textAlign: "Right", visible: false, allowFiltering: false},
            { field: "supervisor_id", headerText: "Supervisor ID", width: "120", textAlign: "Right", isPrimaryKey: true, visible: true, allowFiltering: false, allowSorting: false},    
        ];
    }
}

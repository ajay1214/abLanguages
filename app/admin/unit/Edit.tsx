import {
  SimpleForm,       // Provides a simple layout for the form.
  Edit,             // Component for editing an existing record.
  TextInput,        // Input field for text data.
  required,         // Validation to make a field required.
  ReferenceInput,   // Input for referencing another resource (foreign key).
  NumberInput,      // Input field for numeric data.
} from "react-admin"; // Importing components from react-admin.

const UnitEdit = () => {
  return (
    // <Edit> component wraps the form for editing an existing unit.
    <Edit>
      {/* <SimpleForm> defines the structure of the form. */}
      <SimpleForm>
        {/* Text input for the "id" field with validation to make it required. */}
        <TextInput source="id" validate={[required()]} label="ID" />
        
        {/* Text input for the "title" field with required validation. */}
        <TextInput source="title" validate={[required()]} label="Title" />
        
        {/* Text input for the "description" field with required validation. */}
        <TextInput source="description" validate={[required()]} label="Description" />
        
        {/* Reference input for selecting a related "course" by its ID. */}
        <ReferenceInput source="courseId" reference="courses" />
        
        {/* Number input for specifying the "order" of the unit with required validation. */}
        <NumberInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Edit>
  );
};

export default UnitEdit;

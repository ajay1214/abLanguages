import {
  SimpleForm,       // Provides a simple layout for the form.
  Create,           // Component for creating a new record.
  TextInput,        // Input field for text data.
  required,         // Validation to make a field required.
  ReferenceInput,   // Input for referencing another resource (foreign key).
  NumberInput,      // Input field for numeric data.
} from "react-admin"; // Importing components from react-admin.

const LessonCreate = () => {
  return (
    // <Create> component wraps the form for creating a new lesson.
    <Create>
      {/* <SimpleForm> defines the structure of the form. */}
      <SimpleForm>
        {/* Text input for the "title" field with validation to make it required. */}
        <TextInput source="title" validate={[required()]} label="Title" />
        
        {/* Reference input for selecting a related "unit" by its ID. */}
        <ReferenceInput source="unitId" reference="units" />

        {/* Number input for specifying the "order" of the lesson with required validation. */}
        <NumberInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Create>
  );
};

export default LessonCreate;

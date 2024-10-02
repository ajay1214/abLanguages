import { SimpleForm, Create, TextInput, required } from "react-admin"; // Importing required components and validators.

const CourseCreate = () => {
  return (
    // <Create> component wraps the form for creating a new record.
    <Create>
      {/* <SimpleForm> provides a basic form layout. */}
      <SimpleForm>
        {/* Text input for "title" field with validation to make it required. */}
        <TextInput source="title" validate={[required()]} label="Title" />
        
        {/* Text input for "imgSrc" field with validation to make it required. */}
        <TextInput source="imgSrc" validate={[required()]} label="Image" />
      </SimpleForm>
    </Create>
  );
};

export default CourseCreate;

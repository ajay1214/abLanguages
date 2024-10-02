import { SimpleForm, Edit, TextInput, required } from "react-admin"; // Importing necessary components and validators.

const CourseEdit = () => {
  return (
    // <Edit> component wraps the form for editing an existing record.
    <Edit>
      {/* <SimpleForm> provides the basic form layout for editing. */}
      <SimpleForm>
        {/* Text input for "id" field with validation to make it required. */}
        <TextInput source="id" validate={[required()]} label="ID" />
        
        {/* Text input for "title" field with validation to make it required. */}
        <TextInput source="title" validate={[required()]} label="Title" />
        
        {/* Text input for "imgSrc" field with validation to make it required. */}
        <TextInput source="imgSrc" validate={[required()]} label="Image" />
      </SimpleForm>
    </Edit>
  );
};

export default CourseEdit;

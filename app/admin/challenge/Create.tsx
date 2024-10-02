import {
  SimpleForm, // SimpleForm component from react-admin for a simple layout
  Create, // Create component to handle creating new records
  TextInput, // TextInput for inputting text
  required, // Validator to make fields required
  SelectInput, // Dropdown selection input
  ReferenceInput, // For referencing related records
  NumberInput, // Input for numbers
} from "react-admin";

const ChallengeCreate = () => {
  return (
    <Create>
      <SimpleForm>
        {/* TextInput for entering the challenge question, required validator applied */}
        <TextInput source="question" validate={[required()]} label="Question" />

        {/* SelectInput for choosing the challenge type, required validator applied */}
        <SelectInput
          source="type"
          choices={[
            { id: "SELECT", name: "SELECT" }, // Choice for SELECT type
            { id: "ASSIST", name: "ASSIST" }, // Choice for ASSIST type
          ]}
          validate={[required()]}
        />

        {/* ReferenceInput for selecting a lesson associated with the challenge */}
        <ReferenceInput source="lessonId" reference="lessons" />

        {/* NumberInput to set the challenge order */}
        <NumberInput source="order" />
      </SimpleForm>
    </Create>
  );
};
export default ChallengeCreate;

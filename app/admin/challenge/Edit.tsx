import {
  SimpleForm, // SimpleForm component to create a form layout
  Edit, // Edit component to handle editing records
  TextInput, // TextInput for entering/editing text
  required, // Validator to make certain fields mandatory
  SelectInput, // Dropdown selection input
  ReferenceInput, // ReferenceInput for fetching related data
  NumberInput, // Input for numerical values
} from "react-admin";

const ChallengeEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        {/* TextInput for editing the challenge question, with a required validator */}
        <TextInput source="question" validate={[required()]} label="Question" />

        {/* SelectInput for editing the challenge type, with predefined choices and required validation */}
        <SelectInput
          source="type"
          choices={[
            { id: "SELECT", name: "SELECT" }, // SELECT type option
            { id: "ASSIST", name: "ASSIST" }, // ASSIST type option
          ]}
          validate={[required()]}
        />

        {/* ReferenceInput for associating the challenge with a lesson */}
        <ReferenceInput source="lessonId" reference="lessons" />

        {/* NumberInput for editing the challenge order */}
        <NumberInput source="order" />
      </SimpleForm>
    </Edit>
  );
};
export default ChallengeEdit;

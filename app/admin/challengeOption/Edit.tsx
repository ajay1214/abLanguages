import {
  SimpleForm, // Simple form for editing an existing record
  Edit, // Edit component to handle editing a resource
  TextInput, // Input field for text values
  required, // Validator to make a field required
  BooleanInput, // Input field for boolean (true/false) values
  ReferenceInput, // Input to select a reference from another resource
} from "react-admin";

const ChallengeOptionEdit = () => {
  return (
    <Edit>
      {/* SimpleForm for the challenge option editing */}
      <SimpleForm>
        {/* Text input for the option's text, with validation to make it required */}
        <TextInput source="text" validate={[required()]} label="Text" />

        {/* Boolean input to indicate if the option is the correct answer */}
        <BooleanInput source="correct" label="Correct option" />

        {/* ReferenceInput to select the associated challenge */}
        <ReferenceInput source="challengeId" reference="challenges" />

        {/* Optional text input for an image URL */}
        <TextInput source="imgSrc" label="Image URL" />

        {/* Optional text input for an audio URL */}
        <TextInput source="audioSrc" label="Audio URL" />
      </SimpleForm>
    </Edit>
  );
};
export default ChallengeOptionEdit;

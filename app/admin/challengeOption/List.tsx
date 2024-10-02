import {
  BooleanField,    // Field to display boolean values (true/false).
  Datagrid,        // Table layout for displaying lists of records.
  List,            // Wrapper to handle the overall list view.
  NumberField,     // Field to display number values.
  ReferenceField,  // Field to display a related record from a different resource (like foreign keys).
  TextField,       // Field to display string/text values.
} from "react-admin"; // Importing specific components from the react-admin library.

const ChallengeOptionList = () => {
  return (
    // <List> component is used to display a list of records from a resource (e.g., "challengeOptions").
    <List>
      {/* <Datagrid> lays out the records in a table format, allowing each row to be clickable (rowClick="edit") */}
      <Datagrid rowClick="edit">
        
        {/* Displays the "id" of the challenge option, which is a number */}
        <NumberField source="id" /> 

        {/* Displays the "text" field, which is a string (e.g., challenge option text) */}
        <TextField source="text" /> 

        {/* Displays whether the option is "correct" (true/false) */}
        <BooleanField source="correct" /> 

        {/* Displays the related "challengeId" field by referencing the "challenges" resource */}
        <ReferenceField source="challengeId" reference="challenges" />

        {/* Displays the image source URL as a string */}
        <TextField source="imgSrc" />

        {/* Displays the audio source URL as a string */}
        <TextField source="audioSrc" />
      </Datagrid>
    </List>
  );
};

export default ChallengeOptionList;

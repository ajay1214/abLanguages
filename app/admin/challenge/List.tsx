import {
  Datagrid, // Datagrid component to display a table of records
  List, // List component to handle displaying a list of records
  NumberField, // Field to display numerical values
  ReferenceField, // Field to display referenced data from another resource
  SelectField, // Dropdown field for displaying select choices
  TextField, // Field to display text values
} from "react-admin";

const ChallengeList = () => {
  return (
    <List>
      {/* Datagrid to display rows, each record will be clickable to open in edit mode */}
      <Datagrid rowClick="edit">
        {/* Display the challenge ID */}
        <TextField source="id" />
        
        {/* Display the challenge question */}
        <TextField source="question" />
        
        {/* Display the challenge type with predefined choices */}
        <SelectField
          source="type"
          choices={[
            { id: "SELECT", name: "SELECT" }, // SELECT type
            { id: "ASSIST", name: "ASSIST" }, // ASSIST type
          ]}
        />
        
        {/* Display the related lesson using ReferenceField */}
        <ReferenceField source="lessonId" reference="lessons" />
        
        {/* Display the order of the challenge */}
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};
export default ChallengeList;

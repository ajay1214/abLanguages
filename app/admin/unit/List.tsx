import {
  Datagrid,   // Component for displaying data in a table format
  List,       // Component that represents a list of records
  NumberField, // Displays a number field
  ReferenceField, // Displays a reference to another resource (in this case, courses)
  TextField,  // Displays a text field
} from "react-admin";

const UnitList = () => {
  return (
    <List>  // Starts the list view for the units
      <Datagrid rowClick="edit"> // Displays the data in a grid and allows clicking on rows to edit
        <TextField source="id" /> // Displays the ID of the unit
        <TextField source="title" /> // Displays the title of the unit
        <TextField source="description" /> // Displays the description of the unit
        <ReferenceField source="courseId" reference="courses" /> // Displays the related course based on courseId
        <NumberField source="order" /> // Displays the order number of the unit
      </Datagrid>
    </List>
  );
};
export default UnitList; // Exports the UnitList component for use in other parts of the application

import {
  Datagrid,         // Displays records in a table format.
  List,             // Component for listing records from a resource.
  NumberField,      // Field to display number values.
  ReferenceField,   // Field to display related records (foreign key).
  TextField,        // Field to display string/text values.
} from "react-admin"; // Importing components from react-admin.

const LessonList = () => {
  return (
    // <List> component to display a list of lessons.
    <List>
      {/* <Datagrid> lays out the records in a table format with rows clickable for editing (rowClick="edit"). */}
      <Datagrid rowClick="edit">
        {/* Displaying the "id" field as text. */}
        <TextField source="id" />
        
        {/* Displaying the "title" field as text. */}
        <TextField source="title" />
        
        {/* Displaying the related "unitId" by referencing the "units" resource. */}
        <ReferenceField source="unitId" reference="units" />
        
        {/* Displaying the "order" field as a number. */}
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};

export default LessonList;

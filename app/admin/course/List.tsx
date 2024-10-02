import { Datagrid, List, TextField } from "react-admin"; // Importing components from react-admin.

const CourseList = () => {
  return (
    // <List> component to display a list of records from a resource.
    <List>
      {/* <Datagrid> to display records in a table format with clickable rows (rowClick="edit"). */}
      <Datagrid rowClick="edit">
        {/* Displaying the "id" field as text. */}
        <TextField source="id" />

        {/* Displaying the "title" field as text. */}
        <TextField source="title" />

        {/* Displaying the "imgSrc" field as text. */}
        <TextField source="imgSrc" />
      </Datagrid>
    </List>
  );
};

export default CourseList;

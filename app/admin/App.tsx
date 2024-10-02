"use client"; // Indicates this file is a client component in Next.js

import { Admin, Resource } from "react-admin"; // Imports Admin and Resource components from react-admin

import simpleRestProvider from "ra-data-simple-rest"; // Imports a simple REST data provider for data management

// Imports various create, edit, and list components for different resources
import {
  ChallengeCreate,
  ChallengeEdit,
  ChallengeList,
  ChallengeOptionCreate,
  ChallengeOptionEdit,
  ChallengeOptionList,
  CourseCreate,
  CourseEdit,
  CourseList,
  LessonCreate,
  LessonEdit,
  LessonList,
  UnitCreate,
  UnitEdit,
  UnitList,
} from "."; // Importing all components from the current directory

const dataProvider = simpleRestProvider("/api"); // Creates a data provider that interacts with the API at /api

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>  // Admin component wraps around the resource definitions and provides context
      <Resource
        name="courses" // Specifies the name of the resource
        recordRepresentation="title" // Defines how the records should be represented (for dropdowns, etc.)
        create={CourseCreate} // Component for creating new courses
        list={CourseList} // Component for listing courses
        edit={CourseEdit} // Component for editing existing courses
      />

      <Resource
        name="units" // Resource for units
        recordRepresentation="title" // Represents units by their title
        create={UnitCreate} // Component for creating new units
        list={UnitList} // Component for listing units
        edit={UnitEdit} // Component for editing existing units
      />

      <Resource
        name="lessons" // Resource for lessons
        recordRepresentation="title" // Represents lessons by their title
        create={LessonCreate} // Component for creating new lessons
        list={LessonList} // Component for listing lessons
        edit={LessonEdit} // Component for editing existing lessons
      />

      <Resource
        name="challenges" // Resource for challenges
        recordRepresentation="question" // Represents challenges by their question text
        create={ChallengeCreate} // Component for creating new challenges
        list={ChallengeList} // Component for listing challenges
        edit={ChallengeEdit} // Component for editing existing challenges
      />

      <Resource
        name="challengeOptions" // Resource for challenge options
        recordRepresentation="text" // Represents challenge options by their text
        create={ChallengeOptionCreate} // Component for creating new challenge options
        list={ChallengeOptionList} // Component for listing challenge options
        edit={ChallengeOptionEdit} // Component for editing existing challenge options
        options={{ label: "Challenge options" }} // Additional options for the resource, like custom label
      />
    </Admin>
  );
};

export default App; // Exports the App component for use in other parts of the application

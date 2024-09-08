import { useState } from "react";
import NoProjectSelected from "./Components/NoProjectSelected";
import ProjectSideBar from "./Components/ProjectSideBar";
import NewProject from "./Components/NewProject";
import SelectedProject from "./Components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined, // null displays <NewProject>, undefined displays <NoProjectSelected>
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text,
        projectId: prevState.selectedProjectId,
        id: taskId
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      }
    });
  }

  function handleDeleteTask(taskid) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== taskid)
      }});
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    });
  }

  function handleStartAddProject() {
    // This is basically just to change the ID from 'undefined' to 'null'.
    // Undefined -> not adding a project (in that moment) and no project has been added ever.
    // Null -> adding a project.
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    });
  }

  function handleAddProject(projectData) {
    const projectId = Math.random();
    setProjectsState((prevState) => {
      // "projectData" has: {title, description, dueDate}
      const newProject = {
        ...projectData,
        id: projectId //good enough for this dummy project
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        //To delete a project from the array:
        //Return true to keep the item, and false to delete it:
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)

        // we do not need to include the Id as a parameter in the function because we can just get it from
        // the previous state of the app, because we are selecting it from the Sidebar. (Only the project selected from
        // the side bar can be deleted in that moment.)
      }
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content =
    <SelectedProject
      project={selectedProject}
      onDeleteProject={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    ></SelectedProject>;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}></NewProject>
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}></NoProjectSelected>
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectSideBar
          onStartAddProject={handleStartAddProject}
          projects={projectsState.projects}
          onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
        >
        </ProjectSideBar>
        {content}
      </main>
    </>
  );
}

export default App;

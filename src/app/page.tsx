import Image from "next/image";
import styles from "./page.module.css";
import Task from "../components/Task/task";
import HomeTasksList from "@/components/ClientComponents/HomeTasksList/HomeTasksList";
import axios from "axios";
import { cache } from "react";

// For server side rendering
const GetAllTasks = cache(async (): Promise<Task[]> => {
  try {
    const { data } = await axios.get(`${process.env.API}/tasks`);
    return data;
  } catch (error) {
    console.log("gone error", error);

    return []; // An error retrieving all tasks
  }
});

export default async function HomeServerComponent() {
  const Tasks: Task[] = await GetAllTasks();

  return (
    <div>
      <h1 id={styles.title}>Todo App</h1>
      <HomeTasksList Tasks={Tasks} />
    </div>
  );
}

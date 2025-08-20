import type { ITaskService } from "../../../interfaces/services/taskService.js";

export async function viewAllTasks(taskService: ITaskService) {
    const tasks = await taskService.getAllTasksStartingWith("");

    console.table(
        tasks.map((task) => ({
            Name: task.name,
        })),
    );
}

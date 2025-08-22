# WorkTracker

## Overview

WorkTracker is a CLI application for tracking the time you spend on work tasks.
It helps you organize tasks, record work sessions, and review your logs directly from the command line.

## Getting Started

### Installation

1. Clone the repository.
2. Copy `.env.example` to `.env`.
3. In the `.env` file, set the `DATABASE_URL` to the path where the SQLite database should be stored.
4. Run:

   ```sh
   pnpm deploy:prod
   ```

   This will:

   * Install dependencies
   * Prepare the database at the specified `DATABASE_URL`
   * Build the application
   * Link it globally so you can run the `work` command from anywhere

### Usage

Once installed, you can run:

```sh
work --help
```

to see available commands.

## Commands

### `work task`

Manage tasks. Running this command will present you with interactive options.

Available actions:

1. Create a new task
2. Edit an existing task
3. Delete a task
4. View all tasks
5. View all work logs for a specific task

### `work log`

Manage work logs. Running this command will present you with interactive options.

Available actions:

1. Start working on a task
2. Finish work on a task
3. Add a complete work log manually
4. Edit an existing work log

### `report`

Get reports. Running this command will present you with interactive options.

Available actions:

1. Daily Meeting report - generate a report from last working day
2. Today's report - generate a report from the current working day
3. Choose a day - generate a report from the day specified
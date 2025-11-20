---
description: How to commit and push code to a GitHub repository
---

This workflow guides you through the process of initializing a git repository (if not already done), committing your code, and pushing it to a new GitHub repository.

1.  **Initialize Git (if needed)**
    Check if you are already in a git repo:
    ```bash
    git status
    ```
    If not, initialize it:
    ```bash
    git init
    ```

2.  **Create a Repository on GitHub**
    -   Go to [GitHub.com](https://github.com) and log in.
    -   Click the "+" icon in the top right and select "New repository".
    -   Name your repository (e.g., `clash-of-clans-app`).
    -   Click "Create repository".

3.  **Add Remote Origin**
    Copy the URL of your new repository (e.g., `https://github.com/username/repo-name.git`) and run:
    ```bash
    git remote add origin <YOUR_REPO_URL>
    ```
    *Note: If `origin` already exists, you can remove it first with `git remote remove origin` or use a different name.*

4.  **Stage and Commit Files**
    Add all files to the staging area:
    ```bash
    git add .
    ```
    Commit the changes with a message:
    ```bash
    git commit -m "Initial commit: Full stack Clash of Clans app"
    ```

5.  **Push to GitHub**
    Push your code to the `main` branch:
    ```bash
    git push -u origin main
    ```

6.  **Verify**
    Refresh your GitHub repository page to see your code.

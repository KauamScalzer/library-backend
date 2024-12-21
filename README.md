# library-backend
This project consists of creating an API for managing a library. Developed with Node.js, the goal is to study and apply interesting backend development concepts, such as user authentication, book CRUD operations, and loan management. The project idea was generated with the help of ChatGPT.

## System functionalities

1. [Signup](/docs/signup-specifications.md)
2. [Login](/docs/login-specifications.md)
3. [Change password](/docs/change-password-specifications.md)
4. [Forgot password](/docs/forgot-password-specifications.md)
5. [Reset password](/docs/reset-password-specifications.md)
6. [Edit user](/docs/edit-user-specifications.md)

---

## Libraries and Tools Used

### Code Management
- **[@biomejs/biome](https://github.com/biomejs/biome)**: Used for code formatting and linting to maintain consistent standards across the project.
- **[Husky](https://github.com/typicode/husky)**: Configured to run Git hooks like linting and testing before commits.
- **[lint-staged](https://github.com/okonet/lint-staged)**: Runs linters on staged files before committing, ensuring that only properly formatted code is added to the repository.

### Commit Message Standardization
- **[git-commit-msg-linter](https://github.com/legend80s/git-commit-msg-linter)**: Ensures commit messages follow the project's conventions.

### Development and Build
- **[TypeScript](https://www.typescriptlang.org/)**: Adds static typing and helps in developing robust code.

### Testing
- **[Jest](https://jestjs.io/)**: Used for unit and integration testing.

### Other Tools

# FontEnd
Proyecto administrador clínica PP2
# Clinica

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Clinic Management Frontend

This project is the **Frontend** of a clinic management system built using **Angular**. It communicates with the backend API built in **ASP.NET Core Web API** and is designed to manage patients, appointments, billing, and the liquidation of professional fees. The frontend interacts with the backend via HTTP services and follows a modular architecture to keep the project scalable and maintainable.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [API Communication](#api-communication)
5. [Important Modules](#important-modules)
6. [Dependencies](#dependencies)
7. [License](#license)

## Project Structure

The project follows a modular structure, with each feature (auth, patients, appointments, billing, liquidation, etc.) organized into its own module. This makes the project highly scalable and easy to maintain.

```bash
/src
  /app
    /auth              # Authentication module (Login, Register, etc.)
      /components      # Components related to user authentication
        login.component.ts        # Login form component
        register.component.ts     # Registration form component
      /services        # Services to handle authentication logic
        auth.service.ts            # Handles authentication operations (login, register, etc.)
      /models          # Models and DTOs used by the auth module
        auth.model.ts              # Auth model for frontend
        auth-dto.model.ts          # Auth Data Transfer Object (DTO) used to communicate with backend
      auth.module.ts               # Authentication module declaration
      auth-routing.module.ts       # Routing for authentication-related pages
/dashboard         # Dashboard module for the main application panel
  /components      # Components for the dashboard
  /services        # Services related to dashboard functionalities
  /models          # Models and DTOs for the dashboard

/patients          # Module for managing patients
  /components      # Components for patient management
  /services        # Services to handle patient data
  /models          # Models and DTOs for patients

/appointments      # Module for managing appointments
  /components      # Components for appointment management
  /services        # Services to handle appointments
  /models          # Models and DTOs for appointments

/billing           # Module for billing and payment processing
  /components      # Components for billing and payment management
  /services        # Services for billing management
  /models          # Models and DTOs for billing

/liquidation       # Module for managing professional fee liquidation
  /components      # Components related to professional fee liquidation
  /services        # Services for managing liquidation operations
  /models          # Models and DTOs for liquidation

/shared            # Shared module for reusable components, services, and utilities
  /components      # Reusable components shared across the application
  /services        # General shared services
  /pipes           # Pipes used across the application
  /directives      # Directives shared across the application

/core              # Core module for services used globally in the app
  /services        # Services to interact with the backend API
  /interceptors    # HTTP interceptors to handle cross-cutting concerns

app.module.ts      # Root application module
app.component.ts   # Root application component
app-routing.module.ts # Application-wide routes declaration
```

### Key Modules:
- **Auth**: Manages user authentication (login, register).
- **Dashboard**: Displays application statistics and quick access to different functionalities.
- **Patients**: Manages patient records (view, edit, create).
- **Appointments**: Manages appointment scheduling and details.
- **Billing**: Manages patient billing and payment records.
- **Liquidation**: Handles the liquidation of professional fees.
- **Shared**: Contains components, pipes, and services reusable throughout the app.
- **Core**: Handles services that are used globally across the application, such as API communication and HTTP interceptors.

## Installation

To run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/clinic-management-frontend.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd clinic-management-frontend
   ```

3. **Install dependencies:** Ensure you have Node.js and npm installed. Then run:
   ```bash
    npm install
    ```
4. **Angular CLI:**If you don’t have the Angular CLI installed globally, you can install it with the following command:
   ```bash
    npm install -g @angular/cli
    ```
## Running the Application
To start the application in development mode, run:
   ```bash
    npm install -g @angular/cli
```
The application will be available at http://localhost:4200/.

## API Communication
This Angular frontend communicates with the backend ASP.NET Core API. All API-related services are located in the `/core/services/api/` folder. These services are responsible for handling HTTP requests to the backend and managing responses.

Example services:

- `auth-api.service.ts`: Manages authentication requests (login, register, logout).
- `appointment-api.service.ts`: Handles appointment-related requests (get, create, update, delete).
- `liquidation-api.service.ts`: Communicates with the backend to manage professional fee liquidation.

## Error Handling
All HTTP requests are intercepted by a global HTTP interceptor (http-error.interceptor.ts), which manages error responses (e.g., 401 Unauthorized, 404 Not Found) and displays appropriate error messages.

## Important Modules
### Shared Module
The shared module contains reusable components, services, pipes, and directives used across multiple modules of the app. This ensures consistency and code reuse.

### Core Module
The core module handles services that need to be available globally, like API services and HTTP interceptors.

## Dependencies
Here are some of the core dependencies used in this project:

- Angular: Main framework for building the frontend.
- Angular Router: For handling navigation between different views.
- HttpClientModule: To handle HTTP requests to the backend API.
- ReactiveFormsModule: For managing complex reactive forms.
- Entity Framework Core: For handling database interactions (on the backend side).
- NUnit: For unit testing (backend).

## License
This project is licensed under the MIT License - see the LICENSE file for details.


### Instrucciones de uso:

- **Project Structure**: Explica cómo está organizada la aplicación, con una breve descripción de cada módulo importante.
- **Installation**: Pasos para instalar las dependencias necesarias y ejecutar el proyecto localmente.
- **API Communication**: Detalla cómo el frontend se comunica con el backend mediante los servicios API.
- **Dependencies**: Enumera las dependencias más importantes que el equipo necesita conocer.
- **Running the Application**: Explica cómo iniciar la aplicación en el entorno de desarrollo.
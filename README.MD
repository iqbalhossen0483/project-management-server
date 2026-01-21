# RKB Business Server

This is a backend API server for a business application, providing functionalities for user management, authentication, store management, package management, and administrative tasks.

## User Flow

The application supports different user roles with distinct permissions: **User**, **Admin**, and **System Admin**.

### 1. User Authentication

- **Registration:** New users can create an account by providing necessary details via the `/auth/register` endpoint.
- **Login:** Existing users can authenticate themselves using their credentials via the `/auth/login` endpoint.
- **Profile Management:** Authenticated users can retrieve their profile information using `/auth/get-profile`.
- **Logout:** Authenticated users can terminate their session via the `/auth/logout` endpoint.

### 2. Standard User Operations

- **Profile Update:** Authenticated users can update their personal information and upload a profile picture using `/user/update-profile`.
- **Password Update:** Authenticated users can change their password via `/user/update-password`.
- **Note Management:** Authenticated users can manage their personal notes:
  - Add a new note: `/user/notes/add`
  - View all notes: `/user/notes`
  - Update a note: `/user/notes/:id`
  - Delete a note: `/user/notes/:id`

### 3. Administrator Operations

Admins have access to user and store management functionalities, as well as viewing packages.

- **User Management:** Admins can manage all users in the system:
  - View all users: `/admin/manage-users/all`
  - Add a new user: `/admin/manage-users/add-user`
  - Update an existing user: `/admin/manage-users/update-user/:id`
  - Delete a user: `/admin/manage-users/delete-user/:id`
- **Target Management:** Admins can assign and manage targets for users:
  - Assign a target to a user: `/admin/manage-users/give-target`
  - Update a target: `/admin/manage-users/update-target/:id`
  - View all targets: `/admin/manage-users/targets`
- **Store Management:** Admins can manage store-related operations:
  - View a single store: `/admin/store/:id`
  - Create a new store: `/admin/store/`
  - Update an existing store: `/admin/store/:id`
  - Purchase a store: `/admin/store/purchase`
- **Package Information:** Admins can view available packages:
  - View all packages: `/admin/store/packages`

### 4. System Administrator Operations

System Admins have elevated privileges to manage core system configurations, including packages and stores.

- **Package Management:** System Admins can manage all available packages:
  - Create a new package: `/system-admin/manage-package/`
  - View all packages: `/system-admin/manage-package/`
  - Update a package: `/system-admin/manage-package/:id`
  - Delete a package: `/system-admin/manage-package/:id`
- **Store Management:** System Admins can also manage stores:
  - Manage stores: `/system-admin/manage-store` (This route likely delegates to the admin store management endpoints).

## Project Structure

The project follows a standard Node.js/Express.js structure:

- **`src/`**: Contains the main application source code.
  - **`config/`**: Application configuration files (database, rate limiting, etc.).
  - **`controllers/`**: Handles request logic for different modules (auth, user, admin, systemAdmin).
  - **`libs/`**: Utility functions.
  - **`middlewares/`**: Express middleware for request processing (authentication, validation, etc.).
  - **`models/`**: Mongoose models for database interactions.
  - **`routes/`**: Defines API endpoints and maps them to controllers.
  - **`services/`**: (Currently empty) Business logic layer.
  - **`tests/`**: Unit and API tests.
  - **`types/`**: TypeScript type definitions.
  - **`validations/`**: Request data validation schemas.
- **Root Directory**: Configuration files, Docker setup, package management files (`package.json`, `tsconfig.json`, etc.), and the main `README.MD`.

## API Endpoint Documentation

### Authentication Endpoints (`/auth`)

- **POST /auth/register**
  - **Description:** Registers a new user.
  - **Authentication:** None.
  - **Validation:** `registerSchema`.
- **POST /auth/login**
  - **Description:** Logs in a user.
  - **Authentication:** None.
  - **Validation:** `loginSchema`.
- **GET /auth/get-profile**
  - **Description:** Retrieves the authenticated user's profile.
  - **Authentication:** Required (`authenticationHandler`).
- **POST /auth/logout**
  - **Description:** Logs out the authenticated user.
  - **Authentication:** Required (`authenticationHandler`).

### User Endpoints (`/user`)

- **PUT /user/update-profile**
  - **Description:** Updates the user's profile information and profile picture.
  - **Authentication:** Required (`authenticationHandler`).
  - **Validation:** `updateUserProfileSchema`. Accepts `multipart/form-data` for 'profile' image.
- **PATCH /user/update-password**
  - **Description:** Updates the user's password.
  - **Authentication:** Required (`authenticationHandler`).
  - **Validation:** `updateUserPasswordSchema`.
- **POST /user/notes/add**
  - **Description:** Adds a new note for the user.
  - **Authentication:** Required (`authenticationHandler`).
  - **Validation:** `addNoteSchema`.
- **GET /user/notes**
  - **Description:** Retrieves the user's notes.
  - **Authentication:** Required (`authenticationHandler`).
  - **Validation:** `getNotesSchema` (for query parameters).
- **PUT /user/notes/:id**
  - **Description:** Updates a specific note by its ID.
  - **Authentication:** Required (`authenticationHandler`).
  - **Validation:** `updateNoteSchema`.
- **DELETE /user/notes/:id**
  - **Description:** Deletes a specific note by its ID.
  - **Authentication:** Required (`authenticationHandler`).

### Administrator Endpoints (`/admin`)

#### User Management (`/admin/manage-users`)

- **GET /admin/manage-users/all**
  - **Description:** Retrieves a list of all users.
  - **Authentication:** Required (`authStoreChecker`).
  - **Validation:** `getAllUsersSchema`.
- **POST /admin/manage-users/add-user**
  - **Description:** Adds a new user.
  - **Authentication:** Required (`authStoreChecker`).
  - **Validation:** `addUserSchema`.
- **PUT /admin/manage-users/update-user/:id**
  - **Description:** Updates an existing user by ID.
  - **Authentication:** Required (`authStoreChecker`).
  - **Validation:** `updateUserSchema`.
- **DELETE /admin/manage-users/delete-user/:id**
  - **Description:** Deletes a user by ID.
  - **Authentication:** Required (`authStoreChecker`).
- **POST /admin/manage-users/give-target**
  - **Description:** Assigns a target to a user.
  - **Authentication:** Required (`authStoreChecker`).
  - **Validation:** `giveTargetSchema`.
- **PUT /admin/manage-users/update-target/:id**
  - **Description:** Updates a target by ID.
  - **Authentication:** Required (`authStoreChecker`).
  - **Validation:** `updateTargetSchema`.
- **GET /admin/manage-users/targets**
  - **Description:** Retrieves a list of all targets.
  - **Authentication:** Required (`authStoreChecker`).
  - **Validation:** `getAllTargetsSchema`.

#### Store Management (`/admin/store`)

- **POST /admin/store/purchase**
  - **Description:** Purchases a store.
  - **Authentication:** Required (`authStoreChecker`).
  - **Validation:** `purchaseStoreSchema`.
- **GET /admin/store/packages**
  - **Description:** Retrieves all available packages.
  - **Authentication:** Required (`authStoreChecker`).
- **GET /admin/store/:id**
  - **Description:** Retrieves a single store by its ID.
  - **Authentication:** Required (`authStoreChecker`).
- **POST /admin/store/**
  - **Description:** Creates a new store.
  - **Authentication:** Required (`authStoreChecker`).
  - **Validation:** `storeSchema`.
- **PUT /admin/store/:id**
  - **Description:** Updates an existing store by its ID.
  - **Authentication:** Required (`authStoreChecker`).
  - **Validation:** `updateStoreSchema`.

### System Administrator Endpoints (`/system-admin`)

#### Store Management (`/system-admin/manage-store`)

- **GET /system-admin/manage-store/**
  - **Description:** Retrieves a list of all stores.
  - **Authentication:** None explicitly mentioned in route, but likely requires System Admin privileges.
  - **Validation:** `getStoreSchema` (for query parameters).
- **GET /system-admin/manage-store/:id**
  - **Description:** Retrieves a single store by its ID.
  - **Authentication:** None explicitly mentioned in route, but likely requires System Admin privileges.
- **POST /system-admin/manage-store/**
  - **Description:** Creates a new store.
  - **Authentication:** None explicitly mentioned in route, but likely requires System Admin privileges.
  - **Validation:** `storeSchema`.
- **PUT /system-admin/manage-store/:id**
  - **Description:** Updates an existing store by its ID.
  - **Authentication:** None explicitly mentioned in route, but likely requires System Admin privileges.
  - **Validation:** `updateStoreSchema`.
- **PATCH /system-admin/manage-store/:id**
  - **Description:** Updates the status of a store by its ID.
  - **Authentication:** None explicitly mentioned in route, but likely requires System Admin privileges.
  - **Validation:** `updateStoreStatus`.
- **DELETE /system-admin/manage-store/:id**
  - **Description:** Deletes a store by its ID.
  - **Authentication:** None explicitly mentioned in route, but likely requires System Admin privileges.

#### Package Management (`/system-admin/manage-package`)

- **POST /system-admin/manage-package/**
  - **Description:** Creates a new package.
  - **Authentication:** None explicitly mentioned in route, but likely requires System Admin privileges.
  - **Validation:** `packageSchema`.
- **GET /system-admin/manage-package/**
  - **Description:** Retrieves all packages.
  - **Authentication:** None explicitly mentioned in route, but likely requires System Admin privileges.
- **PUT /system-admin/manage-package/:id**
  - **Description:** Updates a package by its ID.
  - **Authentication:** None explicitly mentioned in route, but likely requires System Admin privileges.
  - **Validation:** `packageSchema`.
- **DELETE /system-admin/manage-package/:id**
  - **Description:** Deletes a package by its ID.
  - **Authentication:** None explicitly mentioned in route, but likely requires System Admin privileges.

## Push versioning of images to docker hub

- git tag -a v1.0.1 -m "Release version 1.0.1"
- git push origin v1.0.1

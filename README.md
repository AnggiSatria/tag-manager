Tag Manager Application
This project implements a Tag Manager component to assign tags to entities. It allows users to create tags, assign them to entities, and remove them. The tags are fetched from a fake API and dynamically managed with React-Select in the frontend.

Features
Tag Management: Users can create new tags, assign them to entities, and remove them.
Tag Color Generation: Each tag has a unique random color.
React-Select Integration: The tag selection is handled using React-Select AsyncCreatable with support for creating new tags on the fly.
Fake API Integration: Uses a mock API to fetch, create, and delete tags.
Tech Stack
Frontend:
Next.js (React framework)
TypeScript
React-Select (AsyncCreatable for dynamic tag creation)
Backend:
Fake API using endpoints to simulate backend functionality:
Fetching tags for entities
Fetching tags for suggestions
Creating new tags
Deleting tags
Prisma ORM (with PostgreSQL as the database)
API Endpoints
GET /api/tags?status=<status>
Fetches tags based on the status parameter.

Parameters:
status: Either suggestions or entities
Response:
json
Copy code
[
{
"id": "1",
"name": "Tag 1",
"color": "#FF5733"
},
{
"id": "2",
"name": "Tag 2",
"color": "#33FF57"
}
]
POST /api/tags
Creates a new tag.

Payload:

json
Copy code
{
"name": "New Tag",
"status": "suggestions"
}
Response:

json
Copy code
{
"id": "3",
"name": "New Tag",
"color": "#123456"
}
DELETE /api/tags/:id
Deletes a tag by ID.

Response:
json
Copy code
{
"message": "Tag deleted successfully"
}
Setup & Installation
Clone the repository:

bash
Copy code
git clone <repo-url>
Install dependencies:

bash
Copy code
cd <project-folder>
pnpm install
Set up the environment variables:

Create a .env file in the root directory and add your PostgreSQL database URL:

makefile
Copy code
DATABASE_URL=your_database_url
Generate Prisma client:

bash
Copy code
pnpm prisma generate
Start the development server:

bash
Copy code
pnpm dev
Visit the application:

Open your browser and go to http://localhost:3000.

Folder Structure
bash
Copy code
/src
/app
/api
/tags
route.ts # API logic for managing tags (GET, POST, DELETE)
/components
/atoms
TagInput.tsx # Atom component for the input to create new tags
/molecules
TagSelect.tsx # Molecule component for the tag selection (using React-Select)
/organisms
TagManager.tsx # Organism component that integrates the tag input and select
/templates
TagManagerPage.tsx # Template component for the page layout and API integration
/lib
prisma.ts # Prisma client setup
/prisma
schema.prisma # Prisma schema for database
.env # Environment variables
tsconfig.json # TypeScript configuration
package.json # Project metadata and dependencies
Components
Atoms:
TagInput.tsx: A simple input field to enter a new tag name.
Molecules:
TagSelect.tsx: A React-Select component for selecting tags, supporting async loading and creatable tags.
Organisms:
TagManager.tsx: The main component that handles tag creation and selection. Integrates both TagInput and TagSelect.
Templates:
TagManagerPage.tsx: The page layout that uses TagManager and connects it with backend APIs.
How to Integrate
To integrate the Tag Manager into an existing app:

Add the TagManager component where needed in your app. You can pass any necessary props such as entityId for context.
The backend should expose the same API endpoints for fetching, creating, and deleting tags.
For real production use, replace the fake API with real database operations (you can use Prisma and a PostgreSQL database, for instance).
Testing
Run the development server:

bash
Copy code
pnpm dev
Test the functionality of tag creation, selection, and deletion.

To test API endpoints:

Fetch tags:

bash
Copy code
GET http://localhost:3000/api/tags?status=suggestions
Create tag:

bash
Copy code
POST http://localhost:3000/api/tags
{
"name": "New Tag",
"status": "entities"
}
Delete tag:

bash
Copy code
DELETE http://localhost:3000/api/tags/1
Contributing
Fork the repository.
Create a new branch for your feature or fix.
Commit your changes.
Push to your fork.
Create a pull request with a detailed description of the changes.
License
This project is licensed under the MIT License - see the LICENSE file for details.

This README.md provides a clear guide on how to set up the project, understand its structure, and integrate it into an existing system, making it easier for other developers to work on or extend the functionality.

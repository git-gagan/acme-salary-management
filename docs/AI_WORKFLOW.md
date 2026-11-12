# AI Development Workflow

As part of the AI-driven development environment expectations, I treated my AI tool (LLM) as an agentic pair-programmer[cite: 7]. I leveraged it not just for boilerplate generation, but for architectural sparring, product scoping, and rapid debugging. 

Here is how I intentionally divided the labor between human engineering judgment and AI execution[cite: 7]:

## 1. Product Scoping & Architecture Spiking
* **Prompt/Interaction:** "I need to build an MVP for an HR manager to view and analyze 10,000 employee salaries[cite: 7]. Help me draft a 1-page PRD and debate the trade-offs of the tech stack[cite: 7]."
* **Human Intent:** Before writing code, I wanted to solidify the scope. I used the AI to help me quickly draft the PRD, but I intentionally drove the architectural decisions (choosing FastAPI over Node.js for data validation, and raw SQLite over an ORM for simplicity and speed). 

## 2. Agentic Pair Programming & Execution
* **Prompt:** "Write a Python script using SQLite3 and the Faker library to generate 10,000 employee records[cite: 7] with columns: id, name, department, country, and salary."
* **Human Intent:** Delegated the tedious task of mock-data creation so I could focus on writing the actual API endpoints and SQL aggregation queries for the dashboard. 
* **Prompt:** "Generate a React functional component using Tailwind CSS and Recharts to display a bar chart of average salaries by department."
* **Human Intent:** UI markup and charting libraries often require heavy documentation lookups. Using AI to scaffold the React components allowed me to focus my engineering bandwidth on the data-fetching logic and server-side pagination implementation.

## 3. Rapid Debugging & Unblocking
* **Interaction:** While setting up the frontend, I encountered a PostCSS pre-transform error because `npm` defaulted to the brand-new Tailwind CSS v4, which broke the standard Vite configuration.
* **Human Intent:** Instead of spending an hour reading migration docs for a take-home assessment, I fed the error logs and file tree directly to the AI. We quickly identified the version mismatch, downgraded to `tailwindcss@3`, and unblocked the UI development in minutes.

## 4. Test Generation & Refinement
* **Prompt:** "Write fast, deterministic pytest functions[cite: 7] using FastAPI's TestClient for a paginated `/employees` endpoint."
* **Human Intent:** Accelerated the creation of the test harness. Once generated, I manually reviewed and refined the assertions to ensure they were deterministic and accurately tested the API contract[cite: 7] without mocking out the database entirely.
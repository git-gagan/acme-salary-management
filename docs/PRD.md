# Product Requirements Document: ACME Salary Management

## Goal
Build a web-based employee salary management software to replace tedious Excel workflows, enabling the HR Manager to efficiently manage and visualize salary data for 10,000 employees globally.

## User Persona
HR Manager of ACME Organization.

## Scope & Features
1. **Global Employee Directory:** A paginated, performant data grid displaying all 10,000 employees, allowing the HR manager to look up individual records.
2. **Salary Analytics Dashboard:** Visualizations (Bar Charts) answering macro-level questions about organizational pay equity, specifically average salary distributed by department.
3. **Automated Seeding:** A programmatic data layer to generate and reset 10,000 realistic employee records for testing and staging.

## Deliberately Left Out & Reasoning
1. **Authentication and Role-Based Access Control (RBAC):** We are optimizing for the single provided persona (HR Manager). Implementing auth adds boilerplate that does not showcase core data management or product thinking.
2. **Real-Time Currency Conversion:** Managing fluctuating exchange rates introduces external API dependencies and breaks deterministic testing. All salaries are normalized to a base currency (USD) at the data-entry level for this MVP.
3. **Complex Tax & Payroll Processing:** The problem statement focuses on managing salary data and answering compensation questions. Full payroll processing is out of scope for a data visibility tool.

## Architectural & Trade-off Explanations
* **Database (SQLite):** Chosen for simplicity and portability. It requires no external server setup, making the application easy to review and run, while still easily handling 10,000 indexed rows.
* **Backend (FastAPI):** Chosen for its speed, automatic OpenAPI documentation, and strict type checking. 
* **Frontend State:** Used React's native `useState`/`useEffect` instead of Redux. For a read-heavy dashboard, local component state is highly maintainable and avoids over-engineering.

## Performance Considerations
* **Server-side Pagination:** Instead of loading 10,000 records into the browser's DOM (which would cause severe lag), the backend uses `LIMIT` and `OFFSET`. The frontend only renders 15 rows at a time, keeping the memory footprint tiny.
* **Database Aggregation:** The analytics chart is powered by a SQL `GROUP BY` clause on the backend, rather than sending thousands of rows to the frontend to be calculated via JavaScript.
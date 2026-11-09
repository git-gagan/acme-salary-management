from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()

# Allow React to talk to FastAPI
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"])

def get_db_connection():
    conn = sqlite3.connect('hr_data.db')
    conn.row_factory = sqlite3.Row # Returns dicts instead of tuples
    return conn

# Endpoint 1: For the Data Table (Pagination is crucial for 10k records)
@app.get("/employees")
def get_employees(limit: int = 100, offset: int = 0):
    conn = get_db_connection()
    employees = conn.execute('SELECT * FROM employees LIMIT ? OFFSET ?', (limit, offset)).fetchall()
    return [dict(emp) for emp in employees]

# Endpoint 2: For the Analytics Chart (Answering how the org pays people)
@app.get("/analytics/salaries-by-department")
def get_salaries_by_department():
    conn = get_db_connection()
    stats = conn.execute('''
        SELECT department, AVG(salary) as avg_salary 
        FROM employees GROUP BY department
    ''').fetchall()
    return [dict(stat) for stat in stats]
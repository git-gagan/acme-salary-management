import sqlite3
import random
from faker import Faker

def seed_db():
    conn = sqlite3.connect('hr_data.db')
    cursor = conn.cursor()
    
    # Create a simple, flat table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY,
            name TEXT, department TEXT, country TEXT, salary REAL
        )
    ''')
    
    fake = Faker()
    departments = ['Engineering', 'Sales', 'HR', 'Marketing', 'Finance']
    countries = ['USA', 'India', 'UK', 'Germany']
    
    # Generate 10,000 records
    data = []
    for _ in range(10000):
        data.append((
            fake.name(),
            random.choice(departments),
            random.choice(countries),
            round(random.uniform(50000, 150000), 2)
        ))
        
    cursor.executemany('INSERT INTO employees (name, department, country, salary) VALUES (?, ?, ?, ?)', data)
    conn.commit()
    print("Database seeded with 10,000 employees!")

if __name__ == "__main__":
    seed_db()
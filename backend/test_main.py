from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_employees_pagination():
    response = client.get("/employees?limit=10&offset=0")
    assert response.status_code == 200
    assert len(response.json()) <= 10
    
def test_analytics_endpoint_returns_data():
    response = client.get("/analytics/salaries-by-department")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if len(data) > 0:
        assert "department" in data[0]
        assert "avg_salary" in data[0]
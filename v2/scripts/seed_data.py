import http.client
import json
import random
import os
from datetime import datetime, timedelta

# Configuration
API_HOST = "localhost"
API_PORT = 3000
API_PATH = "/api/admin/seed"
# Read secret from env or default
SEED_SECRET = os.environ.get("SEED_SECRET", "temp-secret-key")

def generate_mock_data():
    now = datetime.now()
    
    # 1. Professionals
    professionals = []
    specialties = ["Child Psychologist", "Special Educator", "Behavioral Therapist", "Dyslexia Specialist"]
    
    for i, spec in enumerate(specialties):
        professionals.append({
            "name": f"Dr. Mock {i+1}",
            "email": f"dr.mock{i+1}@example.com",
            "password": "password123", # Will be hashed by API
            "bio": f"Experienced {spec} with 10+ years of practice.",
            "specialty": spec,
            "services": [
                {"name": "Initial Consultation", "description": "First meet", "duration": 30, "price": 50.0, "currency": "INR"},
                {"name": "Standard Therapy", "description": "Regular session", "duration": 60, "price": 100.0, "currency": "INR"},
                {"name": "Assessment", "description": "Full assessment", "duration": 90, "price": 150.0, "currency": "INR"}
            ],
            "availability": [
                {"dayOfWeek": 1, "startTime": "09:00", "endTime": "12:00"}, # Mon Morning
                {"dayOfWeek": 1, "startTime": "14:00", "endTime": "17:00"}, # Mon Afternoon
                {"dayOfWeek": 3, "startTime": "10:00", "endTime": "16:00"}, # Wed
                {"dayOfWeek": 5, "startTime": "09:00", "endTime": "13:00"}  # Fri
            ]
        })

    # 2. Patients
    patients = []
    for i in range(5):
        patients.append({
            "name": f"Patient {i+1}",
            "email": f"patient{i+1}@example.com",
            "password": "password123"
        })
        
    return {"professionals": professionals, "patients": patients, "secret": SEED_SECRET}

def seed_database():
    data = generate_mock_data()
    payload = json.dumps(data)
    
    headers = {
        'Content-Type': 'application/json'
    }
    
    print(f"Connecting to {API_HOST}:{API_PORT}...")
    conn = http.client.HTTPConnection(API_HOST, API_PORT)
    
    try:
        conn.request("POST", API_PATH, payload, headers)
        response = conn.getresponse()
        data = response.read()
        
        print(f"Status: {response.status}")
        print(f"Response: {data.decode('utf-8')}")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    seed_database()

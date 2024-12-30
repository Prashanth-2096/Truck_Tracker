import requests
from detection import detection_call
import uuid

license_plate_arr = []
arr = [r"C:\Users\PRASHANTH\Desktop\Truck_Tracker\Truck_Tracker\backend\assets\MH46F4951.jpg"]

url = "http://127.0.0.1:8000/truck"
uuid_value = uuid.uuid4()

for path in arr:
    license_plate = detection_call(path)
    if license_plate:
        license_plate_arr.append(license_plate)

        # Hardcoded data for the other required fields
        data = {
            "id":str(uuid_value),
            "truck_no": license_plate,  # Use the detected license plate
            "truck_type": "Tanker",  # Hardcoded value
            "location_enter": "Gate-a",  # Hardcoded value
            "location_exit": "Gate-d",  # Hardcoded value
            "time_stamp_enter": "2024-12-29 05:26:00",  # Hardcoded timestamp
            "time_stamp_exit": "2024-12-29 07:06:00",  # Hardcoded timestamp
            "location_p": "2024-12-29 05:46:00",  # Hardcoded timestamp
            "location_r": "2024-12-29 06:46:00",  # Hardcoded timestamp
            "location_v": "2024-12-29 06:26:00",  # Hardcoded timestamp
            "location_w": "2024-12-29 06:06:00",  # Hardcoded timestamp
        }

        # Make the POST request
        try:
            response = requests.post(url, json=data)
            if response.status_code == 201:
                print(f"Successfully created tracker for {license_plate}.")
            else:
                print(f"Failed to create tracker for {license_plate}: {response.status_code}, {response.json()}")
        except Exception as e:
            print(f"Error occurred while creating tracker for {license_plate}: {e}")
    else:
        print("Failed to extract license plate:", path)

import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta
import psycopg2
from detection import extract_license_plate
from dotenv import load_dotenv
import random

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Set up upload folder and allowed extensions
UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER')
ALLOWED_EXTENSIONS = set(os.getenv('ALLOWED_EXTENSIONS').split(','))
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Function to check if the file extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return "Welcome to the License Plate Recognition API. Use the /upload-image endpoint to upload an image."

# API endpoint for image upload and license plate recognition
@app.route('/upload-image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"message": "No image file found!"}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400
    
    if file and allowed_file(file.filename):
        # Secure the filename and save the image
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Perform OCR to extract the license plate
        number_plate = extract_license_plate(filepath)
        
        if number_plate:
            # Capture camera_id and timestamp
            truck_type = request.form['truck_type']
            location_enter = request.form['location_enter']
            location_exit = request.form['location_exit']
            time_stamp_enter = datetime.now()  # Current timestamp
            time_stamp_exit = datetime.now() + timedelta(minutes=random.choice([10,15]))

            # Insert the number plate into the database
            try:
                connection = psycopg2.connect(
                    dbname=os.getenv('DB_NAME'),
                    user=os.getenv('DB_USER'),
                    password=os.getenv('DB_PASSWORD'),
                    host=os.getenv('DB_HOST'),
                    port=os.getenv('DB_PORT')
                )
                cursor = connection.cursor()

                # Insert the data into the trucks table
                cursor.execute(
                    "INSERT INTO trucks (truck_no, truck_type, location_enter, location_exit, time_stamp_enter, time_stamp_exit) VALUES (%s, %s, %s, %s, %s, %s)",
                    (number_plate, truck_type, location_enter, location_exit, time_stamp_enter, time_stamp_exit)
                )
                connection.commit()

                cursor.close()
                connection.close()

                return jsonify({"message": "Image uploaded and data inserted!", "license_plate": number_plate}), 200
            except Exception as e:
                return jsonify({"message": str(e)}), 500
        else:
            return jsonify({"message": "No license plate detected in the image."}), 400
    else:
        return jsonify({"message": "Invalid file format. Only jpg, jpeg, and png are allowed."}), 400

if __name__ == '__main__':
    # Make sure the upload folder exists
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    
    # Run the Flask app
    app.run(debug=True)
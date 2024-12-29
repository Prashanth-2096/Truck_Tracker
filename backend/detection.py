from paddleocr import PaddleOCR
import numpy as np
import cv2
from inference_sdk import InferenceHTTPClient

# Initialize client
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="rGsyNaCcRJr3YOlW4x5G"
)

def crop_license_plate(image_path):
    """
    Crops a single license plate from an image using the provided Roboflow API client and model.

    Args:
        image_path (str): Path to the image file.

    Returns:
        numpy.ndarray or None: A cropped license plate image if detected, otherwise None.
    """
    try:
        # Load image
        image_bgr = cv2.imread(image_path)
        if image_bgr is None:
            print(f"Error: Image not loaded from {image_path}")
            return None

        # Perform inference
        result = CLIENT.infer(image_bgr, model_id="license-plate-recognition-rxg4e/6")
        
        # Debug output
        print(f"Inference Result: {result}")

        # Check if predictions exist
        predictions = result.get('predictions', [])
        if not predictions:
            print("No license plates detected.")
            return None

        # Take the first prediction
        prediction = predictions[0]
        x, y, width, height = prediction['x'], prediction['y'], prediction['width'], prediction['height']

        # Calculate coordinates for slicing
        x1, y1 = int(x - width // 2), int(y - height // 2)
        x2, y2 = x1 + int(width), y1 + int(height)
        
        # Crop the image
        cropped_plate = image_bgr[y1:y2, x1:x2]

        return cropped_plate

    except Exception as e:
        print(f"An error occurred: {e}")
        return None
    
def extract_license_plate(image_path):

    img = cv2.imread(image_path)

    cropped_image = crop_license_plate(image_path)
    if cropped_image is None:
        return None

    # Now to do OCR with PddleOCR
    ocr = PaddleOCR(use_angle_cls=True, lang="en",char_type='en')
    if ocr:
        print("OCR initialized successfully.")
    else:
        print("Failed to initialize PaddleOCR.")

    cropped_numpy_image = np.array(cropped_image)
    # cropped_numpy_image_rgb = cropped_numpy_image[:, :, ::-1].copy()

    if cropped_numpy_image is not None:
        print(cropped_numpy_image.shape)
    else:
        print("Input image is None or invalid.")

    result = ocr.ocr(cropped_numpy_image, cls=True)

    if result is None or len(result) == 0 or result[0] is None:
        return None
    else:
        texts = [text for box, (text, confidence) in result[0]]
        predictedLP = ''.join(texts)
        return predictedLP
    return None

def detection_call(path,count=0):
    result=extract_license_plate(path)
    if result:
        return result
    else:
        count+=1
        # If no license plate detected, apply preprocessing steps and retry
        print("License plate not detected, applying preprocessing...")
        from matplotlib import pyplot as plt
        img = cv2.imread(path)
        def grayscale(image):
            return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        gray_image = grayscale(img)
        thresh, im_bw = cv2.threshold(gray_image, 110, 170, cv2.THRESH_BINARY)

        def noise_removal(image):
            kernel = np.ones((1, 1), np.uint8)
            image = cv2.dilate(image, kernel, iterations=1)
            image = cv2.erode(image, kernel, iterations=1)
            image = cv2.morphologyEx(image, cv2.MORPH_CLOSE, kernel)
            image = cv2.medianBlur(image, 3)
            return image
        
        no_noise = noise_removal(im_bw)
        cv2.imwrite("truck_images/no_noise.jpg",no_noise)
        
        # Step 4: Thin the font
        def thin_font(image):
            image = cv2.bitwise_not(image)
            kernel = np.ones((2, 2), np.uint8)
            image = cv2.erode(image, kernel, iterations=1)
            image = cv2.bitwise_not(image)
            return image
        
        eroded_image = thin_font(no_noise)
        
        # Step 5: Thicken the font
        def thick_font(image):
            image = cv2.bitwise_not(image)
            kernel = np.ones((2, 2), np.uint8)
            image = cv2.dilate(image, kernel, iterations=1)
            image = cv2.bitwise_not(image)
            return image
        
        dilated_image = thick_font(eroded_image)
        cv2.imwrite("truck_images/dilated_image.jpg",dilated_image)
        
        # Perform OCR on the preprocessed images #below in the list correct img paths
        for new_path in [r".\truck_images\no_noise.jpg",
                        r".\truck_images\dilated_image.jpg"
                        ]:
            result = extract_license_plate(new_path)
            if result:
                print("Detected License Plate after preprocessing:", result)
                return result
        
        # If all attempts fail, return None
        print("License plate could not be detected.")
        return None
    


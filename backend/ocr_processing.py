import cv2
import easyocr
import numpy as np
import imutils

def extract_license_plate(image_path):
    # Read the image
    img = cv2.imread(image_path)
    
    # Resize image if it's too large
    max_dimension = 1200
    height, width = img.shape[:2]
    if max(height, width) > max_dimension:
        scale = max_dimension / max(height, width)
        img = cv2.resize(img, None, fx=scale, fy=scale)
    
    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Apply CLAHE (Contrast Limited Adaptive Histogram Equalization)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    gray = clahe.apply(gray)
    
    # Noise reduction
    gray = cv2.GaussianBlur(gray, (5, 5), 0)
    
    # Edge detection with adjusted thresholds
    edged = cv2.Canny(gray, 50, 150)
    
    # Dilation to connect edges
    kernel = np.ones((3,3), np.uint8)
    edged = cv2.dilate(edged, kernel, iterations=1)
    
    # Find contours
    contours = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contours = imutils.grab_contours(contours)
    contours = sorted(contours, key=cv2.contourArea, reverse=True)[:15]
    
    # Initialize EasyOCR
    reader = easyocr.Reader(['en'])
    
    # Try direct OCR first on the full image
    results = reader.readtext(gray)
    for (bbox, text, prob) in results:
        # Check if text matches license plate pattern (alphanumeric with common separators)
        cleaned_text = ''.join(e for e in text if e.isalnum())
        if len(cleaned_text) >= 6 and prob > 0.5:  # Adjust confidence threshold as needed
            return cleaned_text
    
    # If direct OCR fails, try contour-based approach
    for contour in contours:
        perimeter = cv2.arcLength(contour, True)
        approx = cv2.approxPolyDP(contour, 0.1 * perimeter, True)
        
        # Check for rectangles (allowing some flexibility in point count)
        if len(approx) >= 4 and len(approx) <= 6:
            x, y, w, h = cv2.boundingRect(contour)
            aspect_ratio = w / float(h)
            
            # Typical license plate aspect ratio is between 2.0 and 5.0
            if 2.0 <= aspect_ratio <= 5.0:
                plate_img = gray[y:y+h, x:x+w]
                
                # Apply additional preprocessing to the plate region
                plate_img = cv2.GaussianBlur(plate_img, (3, 3), 0)
                plate_img = cv2.threshold(plate_img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
                
                # Perform OCR on the plate region
                results = reader.readtext(plate_img)
                
                for (bbox, text, prob) in results:
                    cleaned_text = ''.join(e for e in text if e.isalnum())
                    if len(cleaned_text) >= 6 and prob > 0.5:
                        return cleaned_text
    
    return None
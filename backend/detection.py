import re
import cv2
from transformers import pipeline
from PIL import Image, ImageFilter
from PIL import ImageDraw
from paddleocr import PaddleOCR
import numpy as np

def extract_license_plate(image_path,count=0):
    print(image_path)
    checkpoint = "google/owlv2-base-patch16-ensemble"
    detector = pipeline(
        model=checkpoint,
        task="zero-shot-object-detection",
        device="cpu"
    )
    img = Image.open(f"{image_path}")
    if count==0:
        # preprocessing imge
        gry = img.convert('L')
        blur = gry.filter(ImageFilter.GaussianBlur(1))
        temp_img=blur
    else:
        temp_img=img
    # thresh = gry.point(lambda p: 255 if p > 127 else 0)

    prediction = detector(temp_img,candidate_labels=["truck license plate with english letters and numbers"],)
    if not prediction:
        print("No license plates detected.")
    else:
        prediction = prediction[0]
        temporary_image = blur.copy()
        draw = ImageDraw.Draw(temporary_image)
        box = prediction["box"]
        label = prediction["label"]
        score = prediction["score"]
        xmin, ymin, xmax, ymax = box.values()
        draw.rectangle((xmin, ymin, xmax, ymax), outline="red", width=1)
        draw.text((xmin, ymin), f"{label}: {round(score, 2)}", fill="white")

        cropped_image = blur.crop(list(box.values()))

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

    # if blur doesnt work, try thresholding the imge
    if result is None or len(result) == 0 or result[0] is None:
        thresh = gry.point(lambda p: 255 if p > 127 else 0)
        prediction = detector(thresh,candidate_labels=["truck license plate with english letters and numbers"],)
        if not prediction:
            print("No license plates detected.")
        else:
            prediction = prediction[0]
            temporary_image = thresh.copy()
            draw = ImageDraw.Draw(temporary_image)
            box = prediction["box"]
            label = prediction["label"]
            score = prediction["score"]
            xmin, ymin, xmax, ymax = box.values()
            draw.rectangle((xmin, ymin, xmax, ymax), outline="red", width=1)
            draw.text((xmin, ymin), f"{label}: {round(score, 2)}", fill="white")

            cropped_image = thresh.crop(list(box.values()))

            # Now to do OCR with PddleOCR
            ocr = PaddleOCR(use_angle_cls=True, lang="en",char_type='en')
            if ocr:
                print("OCR initialized successfully.")
            else:
                print("Failed to initialize PaddleOCR.")

            cropped_numpy_image = np.array(cropped_image)
            # not needed since img hs been converted to gry
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
            cleaned_string = re.sub(r'[^A-Za-z0-9]', '', predictedLP)
            return cleaned_string
    else:
        texts = [text for box, (text, confidence) in result[0]]
        predictedLP = ''.join(texts)
        print(predictedLP)
        cleaned_string = re.sub(r'[^A-Za-z0-9]', '', predictedLP)
        return cleaned_string

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
        cv2.imwrite("temp/no_noise.jpg",no_noise)
        
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
        cv2.imwrite("temp/dilated_image.jpg",dilated_image)
        
        # Perform OCR on the preprocessed images #below in the list correct img paths
        for new_path in [r".\temp\no_noise.jpg",
                        r".\temp\dilated_image.jpg"
                        ]:
            result = extract_license_plate(new_path)
            if result:
                print("Detected License Plate after preprocessing:", result)
                return result
        
        # If all attempts fail, return None
        print("License plate could not be detected.")
        return None


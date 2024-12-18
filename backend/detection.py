from transformers import pipeline
from PIL import Image, ImageFilter
from PIL import ImageDraw
from paddleocr import PaddleOCR
import numpy

def extract_license_plate(image_path):
    checkpoint = "google/owlv2-base-patch16-ensemble"
    detector = pipeline(
        model=checkpoint,
        task="zero-shot-object-detection",
        device="cpu"
    )

    img = Image.open(f"{image_path}")

    # preprocessing imge
    gry = img.convert('L')
    blur = gry.filter(ImageFilter.GaussianBlur(1))
    # thresh = gry.point(lambda p: 255 if p > 127 else 0)

    prediction = detector(blur,candidate_labels=["truck license plate with english letters and numbers"],)
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

        cropped_numpy_image = numpy.array(cropped_image)
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

            cropped_numpy_image = numpy.array(cropped_image)
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
            return predictedLP
    else:
        texts = [text for box, (text, confidence) in result[0]]
        predictedLP = ''.join(texts)
        return predictedLP

    return None
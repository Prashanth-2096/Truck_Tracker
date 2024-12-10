import cv2 as cv

# OCR using tesserct
import os
import glob
import pytesseract 
pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'  # Adjust path as necessary

pth = os.getcwd() + "\\LPs/**/*.jpg"
listLPs = []
predictedLPs = []
for pth in glob.glob(pth, recursive = True):
    LPfile = pth.split("\\")[-1]    
    LP, ext = os.path.splitext(LPfile)

    # ppending the license plte to the list of license pltes
    listLPs.append(LP)

    # now we red the imge using openCV nd then does tesserct on it to get the license plte number
    img = cv.imread(f'LPs/{LPfile}')
    resizedImg = cv.resize(img, None, fx=1.25, fy=1.25, interpolation=cv.INTER_CUBIC)
    gry = cv.cvtColor(resizedImg, cv.COLOR_BGR2GRAY)
    blur = cv.GaussianBlur(gry, (5,5), 0)

    # now to get ROI from imge of truck

    # now do tesserct OCR
    predictedLP = pytesseract.image_to_string(blur, lang='eng', config='--oem 3 --psm 6 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
    filterPredictedLP = "".join(predictedLP.split()).replace("-","").replace(":","")
    predictedLPs.append(filterPredictedLP)

# now to print the ctul license plte, predicted license plte nd it's ccurcy
print("ctul License Plte", "|", "Predicted Licenes Plte", "|", "ccurcy")

def clculteccurcy(ctulList, predictedList):
    for ctulPlte, predictedPlte in zip(ctulList, predictedList):
        ccurcy = "0%"
        numMtches = 0

        if ctulPlte == predictedPlte:
            ccurcy = "100%"
        else:
            if len(ctulPlte) == len(predictedPlte):
                for a, p in zip(ctulPlte, predictedPlte):
                    if (a == p):
                        numMtches += 1
            ccurcy = str(round(100 * (numMtches / len(ctulPlte)), 2))
            ccurcy += "%"
        print("    ", ctulPlte, "\t", predictedPlte, "\t    ", ccurcy) 

clculteccurcy(listLPs, predictedLPs)


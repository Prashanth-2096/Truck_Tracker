# import cv2 as cv

# # OCR using tesserct
# import os
# import glob
# import pytesseract 
# pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'  # Adjust path as necessary

# pth = os.getcwd() + "\\LPs/**/*.jpg"
# listLPs = []
# predictedLPs = []
# for pth in glob.glob(pth, recursive = True):
#     LPfile = pth.split("\\")[-1]    
#     LP, ext = os.path.splitext(LPfile)

#     # ppending the license plte to the list of license pltes
#     listLPs.append(LP)

#     # now we red the imge using openCV nd then does tesserct on it to get the license plte number
#     img = cv.imread(f'LPs/{LPfile}')
#     resizedImg = cv.resize(img, None, fx=1.25, fy=1.25, interpolation=cv.INTER_CUBIC)
#     gry = cv.cvtColor(resizedImg, cv.COLOR_BGR2GRAY)
#     blur = cv.GaussianBlur(gry, (5,5), 0)

#     # now to get ROI from imge of truck

#     # now do tesserct OCR
#     predictedLP = pytesseract.image_to_string(blur, lang='eng', config='--oem 3 --psm 6 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
#     filterPredictedLP = "".join(predictedLP.split()).replace("-","").replace(":","")
#     predictedLPs.append(filterPredictedLP)

# # now to print the ctul license plte, predicted license plte nd it's ccurcy
# print("ctul License Plte", "|", "Predicted Licenes Plte", "|", "ccurcy")

# def clculteccurcy(ctulList, predictedList):
#     for ctulPlte, predictedPlte in zip(ctulList, predictedList):
#         ccurcy = "0%"
#         numMtches = 0

#         if ctulPlte == predictedPlte:
#             ccurcy = "100%"
#         else:
#             if len(ctulPlte) == len(predictedPlte):
#                 for a, p in zip(ctulPlte, predictedPlte):
#                     if (a == p):
#                         numMtches += 1
#             ccurcy = str(round(100 * (numMtches / len(ctulPlte)), 2))
#             ccurcy += "%"
#         print("    ", ctulPlte, "\t", predictedPlte, "\t    ", ccurcy) 

# clculteccurcy(listLPs, predictedLPs)

# Loading the required python modules 
import pytesseract # this is tesseract module 
import matplotlib.pyplot as plt 
import cv2 # this is opencv module 
import glob 
import os

# specify path to the license plate images folder as shown below 
path_for_license_plates = os.path.join("backend","assets", "MH46F4951.jpg")
list_license_plates = [] 
predicted_license_plates = [] 
  
for path_to_license_plate in glob.glob(path_for_license_plates, recursive = True): 
      
    license_plate_file = path_to_license_plate.split("/")[-1] 
    license_plate, _ = os.path.splitext(license_plate_file) 
    ''' 
    Here we append the actual license plate to a list 
    '''
    list_license_plates.append(license_plate) 
      
    ''' 
    Read each license plate image file using openCV 
    '''
    img = cv2.imread(path_to_license_plate) 
      
    ''' 
    We then pass each license plate image file 
    to the Tesseract OCR engine using the Python library  
    wrapper for it. We get back predicted_result for  
    license plate. We append the predicted_result in a 
    list and compare it with the original the license plate 
    '''
    predicted_result = pytesseract.image_to_string(img, lang ='eng', 
    config ='--oem 3 --psm 6 -c tessedit_char_whitelist = ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') 
      
    filter_predicted_result = "".join(predicted_result.split()).replace(":", "").replace("-", "") 
    predicted_license_plates.append(filter_predicted_result) 
    print("Inside for loop")

print("Actual License Plate", "\t", "Predicted License Plate", "\t", "Accuracy") 
print("--------------------", "\t", "-----------------------", "\t", "--------") 
print(predicted_license_plates)
def calculate_predicted_accuracy(actual_list, predicted_list): 
    print(actual_list)
    print(predicted_list)
    for actual_plate, predict_plate in zip(actual_list, predicted_list): 
        accuracy = "0 %"
        num_matches = 0
        print("Hello")
        if actual_plate == predict_plate: 
            accuracy = "100 %"
        else: 
            if len(actual_plate) == len(predict_plate): 
                for a, p in zip(actual_plate, predict_plate): 
                    if a == p: 
                        num_matches += 1
                accuracy = str(round((num_matches / len(actual_plate)), 2) * 100) 
                accuracy += "%"
        print("     ", actual_plate, "\t\t\t", predict_plate, "\t\t  ", accuracy) 
  
          
calculate_predicted_accuracy(list_license_plates, predicted_license_plates)
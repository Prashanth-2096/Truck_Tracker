from detection import detection_call
license_plate_arr=[]
arr=[r"{img_path}"]
     
for path in arr:
    license_plate = detection_call(path)
    if license_plate:
        license_plate_arr.append(license_plate)
    else:
        print("Failed to extract license plate.",path)

print(license_plate_arr)


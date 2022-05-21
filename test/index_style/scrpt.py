from pprint import pprint

with open("E:\\Materials\【FDD】\\assignment\\WebSite\\test\\index_style\\style.css", "r+") as f:
    data = f.readlines()

dict = {}

# for ele in data:
#     if ";" in ele:
#         className = ele.split(":")[0]
#         try:
#             dict[className] += 1
#         except:
#             dict[className] = 1

# for ele in data:
#     if ";" in ele:
#         className = ele.split(":")[0]
#         classValue = ele.split(":")[1].strip()
#         try:
#             dict[className][classValue] += 1
#         except:
#             dict[className] = {classValue: 1}

# pprint(dict)

for ele in data:
    if ";" in ele:
        print(ele.strip())

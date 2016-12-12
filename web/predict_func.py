import csv
import json

path = '/home/hs2865/web2/travelcolumbia/algorithm/predict3/'

def predict_rate(business_id, mode):
    if mode == 'demo':
        json_text = open(path + 'demo.json', 'r').read()
        json_data = json_text
        return json_data
    else:
        actual = business_id + '_actual.csv'
        actual_data = open(path + actual , 'r')
        actual_reader = csv.reader(actual_data)

        prediction = business_id + '_prediction.csv'
        prediction_data = open(path + prediction , 'r')
        prediction_reader = csv.reader(prediction_data)

        data_list = {}
        last_date = []
        for r in prediction_reader:
            info = r[0].split('-')
            if info[0] in data_list:
                data_list[info[0]][info[1]] = r[1]
            else:
                data_list[info[0]] = {}
                data_list[info[0]][info[1]] = r[1]
                
        for r in actual_reader:
            info = r[0].split('-')
            last = [info[0], info[1]]
            if info[0] in data_list:
                data_list[info[0]][info[1]] = r[1]
            else:
                data_list[info[0]] = {}
                data_list[info[0]][info[1]] = r[1]
        last_date = last

        result = [data_list, last_date]
        return json.dumps(result) 
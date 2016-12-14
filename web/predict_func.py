import csv
import json
from sklearn.neighbors import NearestNeighbors
from sklearn.externals import joblib
import pandas as pd
import numpy as np

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

def prediction1(lat, lng):
    latitude = lat
    longitude = lng    

    weight =100
    longitude *= weight
    latitude *= weight
    testX = [5,5,5,latitude,longitude]
    prediction1 = joblib.load('prediction1.pkl') 
    result = prediction1.kneighbors(testX)
    knn_df_open_typ = pd.read_pickle("knn_df_open_typ")
    output = knn_df_open_typ.iloc[result[1][0]]
    return output.to_json(orient='index')


from nltk.tokenize import RegexpTokenizer
from stop_words import get_stop_words
from nltk.stem.porter import PorterStemmer
from gensim import corpora, models
import gensim
from os import path
import matplotlib.pyplot as plt
from PIL import Image
import numpy as np
from wordcloud import WordCloud, STOPWORDS

def prediction2(search_word):
    tokenizer = RegexpTokenizer(r'\w+')
    en_stop = get_stop_words('en')
    p_stemmer = PorterStemmer()
    lda_df2 = pd.read_csv('business_LDA.csv')
    ind = [True if search_word in token else False for token in lda_df2.tokens.values]
    lda_df_sub = lda_df2[ind]
    lda_df_target = lda_df_sub.sort(['stars_review'],ascending=[0]).iloc[:20]
    del lda_df_target['stars_review']
    del lda_df_target['votes_funny']
    del lda_df_target['votes_useful']
    del lda_df_target['user_review_count']
    del lda_df_target['average_stars']
    del lda_df_target['fans']    
    del lda_df_target['tokens']        
    return lda_df_target.to_json(orient='index')

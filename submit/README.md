# Wow3 recommender

Below is the demo website for our project.
http://104.154.117.206:8080/index.html


## Contents
- Data Processing : ./data
- Modeling : ./model
- Web development : ./web


## Data Processing
#### Overview
- Data source is "Yelp Dataset Challenge" 
 - https://www.yelp.com/dataset_challenge
 - We decided to use following data sets
  -  Review data: yelp_academic_dataset_review.csv
  -  Business data: yelp_academic_dataset_business.csv
  -  User data: yelp_academic_dataset_user.csv

#### Steps
- Steps for loading and making clean data
 - ./data/mysql_data_preparation.txt
  - We used MYSQL and python to manipulate data
  - MYSQL has innodb storage engine. We added index key on the columns that are used for joining so that they can do join or select operation fast.
  - We output clean files in the format of CSV file
- Script of creating a graph information of users for System G 
 - ./data/create_user_graph.py
  - We clean data so that they can use System G
- Script of creating data used at web system using ML/NLP model
 - ./model/Prediction_func.ipynb

## Modeling
- Nearest Neighbors Recommendation:(Implemented in Recommend1.ipynb)
 - We utilized nearest neighbors algorithm to help user to find out the top 20 restaurants based on his or her current geolocation. After adding features “stars_business”, “stars_review”, “average_stars”, “latitude” and “longitude” , we built the nearest neighbors model by tuning coefficients for each feature and take the highest “start_business”, highest “stars_review”, highest “average_stars”, current “latitude” and current “longitude” as test data to find out the 20 nearest neighbors. 

- Topic Model and Sentiment Analysis with Key Word:(Implemented in Topic Model2-Key Word Sentiment Analysis.ipynb)
 - To build the topic model and conduct sentiment analysis, we first grouped by all review text data for each business and preprocessed data by removing stopwords, removing punctuation, tokenizing and doing stemming and lemmatization.Then, according to the input keyword, we chose a certain number (top 3 in our model) of most related businesses. Then we applied the Latent Dirichlet Allocation to find the most popular ten topics for that business. For these popular topics in each business, we used classification algorithm to give the specific sentiment analysis for each topic. In this way, we can provide user with not only the most popular and related information with key word, but also some sentimental reference for their to make their choices. UI will return all word clouds describing these popular topics , where user can have a clear understanding about this business.


- Sentiment Analysis Classification about Review:(Implemented in Sentiment Analysis3-Review Classification.ipynb)
 - Sometimes some review are ambiguous about corresponding business. To provide more clear review, we also did sentiment analysis towards review data. We first grouped by all review text data for each business and preprocessed data by removing stopwords, removing punctuation, tokenizing and doing stemming and lemmatization. Then we regarded those review data with five stars as positive and those review data with no more than two stars as negative. We took them as training set to build the sentiment analysis classification model. For those ambiguous review, we can use this model to extract the sentiment behind it and give our user more direct information. 

- User Rate Prediction by Time Series Model:(Implemented in Time Series4.ipynb)
 - Sometimes average review star from the yelp can not give you a comprehensive understanding about the immediate feedback about food or service quality. To compensate that, we built the time series model to give the monthly trend of review star. We firstly grouped by the monthly review stars based on their mean values. Then we computed the moving average for the time series and performed Dickey-Fuller test to analyze the results. Besides, we tried different mathematical transformation towards monthly data. After removing the trend and seasonality, we visualized the autocorrelation function and partial autocorrelation function. According to them, we decided the parameter for the autoregressive model(AR), moving average model(RA) and autoregressive moving average(ARMA) model. Then we applied these models to our data and transformed results to the original scale. In the end, we used several statistics to evaluate the model to make our final decision.

## System G, Graph analysis
- Script for inputting graph data
 - ./data/systemg.txt
  - We used to glemlin to input data, extract information, and visualize user graph



## Web development
#### Overview
- Codes for web system is stored at ./web/
 - We used Python, HTML, CSS(Bootstrap), JavaScript(jQuery, CanvasJS)

#### How to set up web system
- Start up python web server for port 8080
 - $ twistd -no web --path=. &
- Start up python web server for port 7777 (REST API)
 - $ python server.py
  - This is for REST API. REST API accepts GET request and return json
- Modify the URL for your own environment at ./web/js/map.js
 - var server = 'http://[your_server_address]:7777/get/';

#### Others
- Detail of the web page
 - https://docs.google.com/a/columbia.edu/presentation/d/1JtQtHJH4WoE8vhOSogcY_9nBZ71_7092mPD6085yAxQ/edit?usp=sharing


## Notification
- Following file/directory are not submitted since the data sizes would be large
 - ./data/source/wow3_all_mysql.csv
 - ./data/source/wow3_business_mysql.csv
 - ./data/source/wow3_review_mysql.csv
 - ./data/source/wow3_user_mysql.csv.csv  
 - ./web/data/business_LDA.csv
 - ./web/data/rate
 - If you run the web server, please prepare these data 

#### Data download
- ./data/source/wow3_all_mysql.csv
 - https://drive.google.com/open?id=0B0MVyAAOEEwhekx0YU41RDVZNnc
- ./data/source/wow3_business_mysql.csv
 - https://drive.google.com/open?id=0B0MVyAAOEEwhd1FVanQ0U0hqaGc
- ./data/source/wow3_review_mysql.csv
 - https://drive.google.com/open?id=0B0MVyAAOEEwhUnpjeFA0dlF6Tmc
- ./data/source/wow3_user_mysql.csv.csv  
 - https://drive.google.com/open?id=0B0MVyAAOEEwhZ19WOFZ6N0NoR3c
- ./web/data/business_LDA.csv
 - https://drive.google.com/open?id=0B0MVyAAOEEwhZHVzNG5fa1lENGM
- ./web/data/rate
 - https://drive.google.com/drive/folders/0B0MVyAAOEEwhdGxaT09SVVYwVVU?usp=sharing

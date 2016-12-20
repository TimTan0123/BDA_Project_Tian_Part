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
Work in progress

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

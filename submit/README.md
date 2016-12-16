# Wow3 recommender

## Contents
- Data Processing : ./data
- Modeling : ./model
- Web development : ./web

## Data Processing
- Data source is "Yelp Dataset Challenge" 
 - https://www.yelp.com/dataset_challenge
  - We decided to use following data sets
   - Review data: yelp_academic_dataset_review.csv
   - Business data: yelp_academic_dataset_business.csv
   - User data: yelp_academic_dataset_user.csv
- Steps for loading and making clean data
 - ./data/mysql_data_preparation.txt
  - We used MYSQL and python to manipulate data
  - MYSQL has innodb storage engine. We added index key on the columns that are used for joining so that they can do join or select operation fast.
  - We output clean files in the format of CSV file
- Script of creating a graph information of users for System G 
 - ./data/create_user_graph.py
  - We clean data so that they can use System G

## Modeling


## Web development
- Codes for web system is stored at ./web/
 - We used Python, HTML, CSS(Bootstrap) and jQuery
- How to set up web system
 - Start up python web server for port 8080
  - $ twistd -no web --path=. &
 - Start up python web server for port 7777 (REST API)
  - $ python server.py
   - This is for REST API. REST API accepts GET request and return json
 - URL for the web service
  - [mod later]
- Detail of the web page
 - https://docs.google.com/a/columbia.edu/presentation/d/1JtQtHJH4WoE8vhOSogcY_9nBZ71_7092mPD6085yAxQ/edit?usp=sharing

## System G, Graph analysis
- Script for inputting graph data
 - ./data/[mod later]
  - We used to glemlin to input data and visualized user graph

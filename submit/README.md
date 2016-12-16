# Wow3 recommender

## Contents
- Data Processing : data
- Modeling : model
- Web development : web

## Data Processing
- Data source is "Yelp Dataset Challenge" 
 - https://www.yelp.com/dataset_challenge
  - We decided to use following data sets
   - Review data: yelp_academic_dataset_review.csv
   - Business data: yelp_academic_dataset_business.csv
   - User data: yelp_academic_dataset_user.csv
- The step for loading and making clean data is written here
 - ~/data/mysql_data_preparation.txt
  - We used MYSQL and python to manipulate data
  - MYSQL has innodb storage engine. We added index key on the columns that are used for joining so that they can do join or select operation fast.
  - We output clean files in the format of CSV file
 

## Modeling


## Web development


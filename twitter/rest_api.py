from requests_oauthlib import OAuth1Session
import json


### Constants
oath_key_dict = {
    "consumer_key": "m53jry8YuHkjmRww919cvIqeB",
    "consumer_secret": "jNXQ5eYYs5K3JpxdB9nx6BpbsTsGZXqOHNwIvCeIfpEm6Vedqd",
    "access_token": "778298323115601920-1K8LPvXQHpyGNZa3HiWvGk6RtbxOapl",
    "access_token_secret": "x8FdF8lPPj24cgRHs2OCHlKiNNhIYf56QNIwu54E6t8wP"
}


### Functions
def main():
    matrix_city = read_list()
    search(["test",40.714,-74.005], "search")
    return


def read_list():
    file = open('city_list.txt', 'r')
    list_city = file.read().split('\n')
    matrix_city = []
    for city in list_city:
        matrix_city.append(city.split(','))
    return matrix_city


def search(keyword, type):
    if type == 'geo':
        tweets = tweet_geo(keyword[0], keyword[1])
    elif type == 'search':
        tweets = tweet_search(keyword)
        for tweet in tweets[u'statuses']:
            tweet_id = tweet[u'id_str']
            text = tweet[u'text']
            created_at = tweet[u'created_at']
            user_id = tweet[u'user'][u'id_str']
            print "tweet_id:", tweet_id
            print "text:", text
            print "created_at:", created_at
            #print "user_id:", user_id


def create_oath_session(oath_key_dict):
    oath = OAuth1Session(
    oath_key_dict["consumer_key"],
    oath_key_dict["consumer_secret"],
    oath_key_dict["access_token"],
    oath_key_dict["access_token_secret"]
    )
    return oath


def tweet_geo(lat, long):
    url = "https://api.twitter.com/1.1/geo/search.json?"
    params = {
        "lat": lat,
        "long": long,
        }
    oath = create_oath_session(oath_key_dict)
    responce = oath.get(url, params = params)
    if responce.status_code != 200:
        print "Error code: %d" %(responce.status_code)
        return None
    tweets = json.loads(responce.text)
    return tweets


def tweet_search(keyword):
    url = "https://api.twitter.com/1.1/search/tweets.json?"
    params = {}
    params["lang"] = "en"
    params["result_type"] = "recent"
    if keyword[0] != "":
        params["q"] = keyword[0]
    if keyword[1] != 0 and keyword[2] != 0:
        params["geocode"] = "%f,%f,%dkm" % (keyword[1], keyword[2], 1)
    oath = create_oath_session(oath_key_dict)
    responce = oath.get(url, params = params)
    if responce.status_code != 200:
        print "Error code: %d" %(responce.status_code)
        return None
    tweets = json.loads(responce.text)
    return tweets

### Execute
if __name__ == "__main__":
    main()



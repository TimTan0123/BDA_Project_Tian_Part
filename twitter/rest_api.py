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
    tweets = tweet_search("#python", oath_key_dict)
    print tweets.keys()
    for tweet in tweets[u'statuses']:
        tweet_id = tweet[u'id_str']
        text = tweet[u'text']
        created_at = tweet[u'created_at']
        user_id = tweet[u'user'][u'id_str']
        print "tweet_id:", tweet_id
        print "text:", text
        print "created_at:", created_at
        print "user_id:", user_id

    #user_description = tweet[u'user'][u'description']
    #screen_name = tweet[u'user'][u'screen_name']
    #user_name = tweet[u'user'][u'name']
    #print "tweet_id:", tweet_id
    #print "text:", text
    #print "created_at:", created_at
    #print "user_id:", user_id
    #print "user_desc:", user_description
    #print "screen_name:", screen_name
    #print "user_name:", user_name
    return


def create_oath_session(oath_key_dict):
    oath = OAuth1Session(
    oath_key_dict["consumer_key"],
    oath_key_dict["consumer_secret"],
    oath_key_dict["access_token"],
    oath_key_dict["access_token_secret"]
    )
    return oath

def tweet_search(search_word, oath_key_dict):
    url = "https://api.twitter.com/1.1/search/tweets.json?"
    params = {
        "q": unicode(search_word),
        "lang": "en",
        "result_type": "recent",
        "count": "15"
        }
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



from requests_oauthlib import OAuth1
import json
import requests

### Constants
oath_key_dict = {
    "consumer_key": "m53jry8YuHkjmRww919cvIqeB",
    "consumer_secret": "jNXQ5eYYs5K3JpxdB9nx6BpbsTsGZXqOHNwIvCeIfpEm6Vedqd",
    "access_token": "778298323115601920-1K8LPvXQHpyGNZa3HiWvGk6RtbxOapl",
    "access_token_secret": "x8FdF8lPPj24cgRHs2OCHlKiNNhIYf56QNIwu54E6t8wP"
}
url = "https://stream.twitter.com/1.1/statuses/filter.json"

def create_oath_session(oath_key_dict):
    oath = OAuth1(
    oath_key_dict["consumer_key"],
    oath_key_dict["consumer_secret"],
    oath_key_dict["access_token"],
    oath_key_dict["access_token_secret"]
    )
    return oath

def main():
    auth = create_oath_session(oath_key_dict)

    r = requests.post(url, auth=auth, stream=True, data={"follow":"783214,6253282", "track":"twitter"})

    count = 0;
    for line in r.iter_lines():
        count = count + 1
        #print line
    #print count

### Execute
if __name__ == "__main__":
    main()

import json

def keyword_search(keyword, mode):
    if mode == 'demo':
        json_text = open('keyword.json', 'r').read()
        #json_data = json.loads(json_text)
        json_data = json_text
    else:
        pass
    return json_data


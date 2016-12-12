import json

def keyword_search(keyword, mode):
    if mode == 'demo':
        json_data = open('bars_ext.json', 'r').read()
    else:
        pass
    return json_data


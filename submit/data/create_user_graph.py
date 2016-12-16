import pandas as pd
user = pd.read_csv("wow3_user_mysql.csv", names = ["user_id", "review_count", "average_stars", "friends", "fans", "votes_cool", "votes_funny", "votes_useful"])


# Creating node
node = []
node_dict_from_id = {}
node_dict_from_user = {}
row = len(user)
for i in range(row):
    try:
        user_id = user['user_id'][i]
        node.append([i, user_id])
        node_dict_from_id[i] = user_id
        node_dict_from_user[user_id] = i
    except:
        print user_id


# Creating edge
edge = []
for i in range(row):
    friend = user['friends'][i]
    if friend == '[]':
        continue
    else:
        friend = friend.replace("[", "")
        friend = friend.replace("]", "")
        friend = friend.replace(" ", "")
        friend = friend.replace("'", "")
        friend_list = friend.split(',')
        fr = node_dict_from_user[user['user_id'][i]]
        for f in friend_list:
            if f in node_dict_from_user:
                to = node_dict_from_user[f]
                edge.append([fr, to])

# Create csv for user graph
node_pd = pd.DataFrame(node)
edge_pd = pd.DataFrame(edge)

node_pd.to_csv('wow3_user_node.csv', index=False, header=False)
edge_pd.to_csv('wow3_user_edge.csv', index=False, header=False)


import requests
from requests.auth import HTTPBasicAuth

res = ''
auth = HTTPBasicAuth(username='kto', password='1')
response = requests.get(res, auth=auth)
print(response.json())

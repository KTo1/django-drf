import requests
from requests.auth import HTTPBasicAuth

if __name__ == '__main__':
    res = 'http://127.0.0.1:8000/api/projects/'
    auth = HTTPBasicAuth(username='Develop', password='111111')
    response = requests.get(res, auth=auth)
    print(response.json())

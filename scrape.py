import requests
from bs4 import BeautifulSoup
url="https://www.youtube.com/"
r=requests.get(url)
html_doc=r.text
soup=BeautifulSoup(html_doc,"html.parser")
text=soup.get_text()
print(text)
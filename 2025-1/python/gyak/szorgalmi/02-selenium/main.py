from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.service import Service as FirefoxService

# firefox van a gepen, amin csinaltam szoval azt hasznaltam
# a v0.34.0 win64 geckodriver-t hasznaltam mert ez volt letoltve
# https://github.com/mozilla/geckodriver/releases/tag/v0.34.0
service = FirefoxService(executable_path="geckodriver.exe") 
driver = webdriver.Firefox(service=service)

driver.get("https://www.hirkereso.hu/tech/")

keywords = ["facebook", "iphone", "apple", "ai", "google",
            "meta", "microsoft", "mi", "nvidia"]

counts = {k: 0 for k in keywords} # dict

links = driver.find_elements(By.TAG_NAME, "a") # hivatkozas tagek

for link in links:
    text = link.text.lower()
    for k in keywords:
        if k in text:
            counts[k] += 1

driver.quit()

print(counts)

import requests

url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart"

try:
    response = requests.get(url)

    if response.status_code == 200:
        joke = response.json()
        print(f"\n{joke}\n")

        print(f"{joke["setup"]}")
        print(f"{joke["delivery"]}")
    else:
        print(f"nem vicces az api, státusz: {response.status_code}")
except BaseException as e:
    print(f"hiba történt a kérésfeldolgozás közben: {e}")
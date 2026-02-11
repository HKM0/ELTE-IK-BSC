import json
from typing import Dict, Any, List
import os

'''
Útmutató a féjl használatához:

Felhasználó adatainak lekérdezése:

user_id = 1
user = get_user_by_id(user_id)
print(f"Felhasználó adatai: {user}")

Felhasználó kosarának tartalmának lekérdezése:

user_id = 1
basket = get_basket_by_user_id(user_id)
print(f"Felhasználó kosarának tartalma: {basket}")

Összes felhasználó lekérdezése:

users = get_all_users()
print(f"Összes felhasználó: {users}")

Felhasználó kosarában lévő termékek összárának lekérdezése:

user_id = 1
total_price = get_total_price_of_basket(user_id)
print(f"A felhasználó kosarának összára: {total_price}")

Hogyan futtasd?

Importáld a függvényeket a filehandler.py modulból:

from filereader import (
    get_user_by_id,
    get_basket_by_user_id,
    get_all_users,
    get_total_price_of_basket
)

 - Hiba esetén ValuErrort kell dobni, lehetőség szerint ezt a 
   kliens oldalon is jelezni kell.

'''

# A JSON fájl elérési útja
JSON_FILE_PATH = os.path.join(os.path.dirname(__file__), "data.json")

#-----------------------------------------------------------------

def load_json() -> Dict[str, Any]:
    try:
        with open(JSON_FILE_PATH, "r", encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError:
        raise ValueError(f"Nincs ilyen fajl: {JSON_FILE_PATH}")
    except json.JSONDecodeError:
        raise ValueError("Hibas json formatum")

#-----------------------------------------------------------------
# get_user_by_id() -t a userhandler.py -ban kezelem

#-----------------------------------------------------------------
def get_basket_by_user_id(user_id: int) -> List[Dict[str, Any]]:
    data = load_json()
    
    for basket in data.get("Baskets", []):
        if basket["user_id"] == user_id:
            return basket["items"]
    
    raise ValueError(f"Nincs a felhasználónak kosara: {user_id}")

#-----------------------------------------------------------------
# get_all_users()-t a userhandler.py -ban kezelem

#-----------------------------------------------------------------
def get_total_price_of_basket(user_id: int) -> float:
    items = get_basket_by_user_id(user_id)
    
    total = 0.0
    for item in items:
        total += item["price"] * item["quantity"]
    
    return round(total, 2)

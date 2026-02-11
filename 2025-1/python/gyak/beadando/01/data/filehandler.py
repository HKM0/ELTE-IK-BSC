import json
from typing import Dict, Any
import os

'''
Útmutató a fájl függvényeinek a használatához

Új felhasználó hozzáadása:

new_user = {
    "id": 4,  # Egyedi felhasználó azonosító
    "name": "Szilvás Szabolcs",
    "email": "szabolcs@plumworld.com"
}

Felhasználó hozzáadása a JSON fájlhoz:

add_user(new_user)

Hozzáadunk egy új kosarat egy meglévő felhasználóhoz:

new_basket = {
    "id": 104,  # Egyedi kosár azonosító
    "user_id": 2,  # Az a felhasználó, akihez a kosár tartozik
    "items": []  # Kezdetben üres kosár
}

add_basket(new_basket)

Új termék hozzáadása egy felhasználó kosarához:

user_id = 2
new_item = {
    "item_id": 205,
    "name": "Szilva",
    "brand": "Stanley",
    "price": 7.99,
    "quantity": 3
}

Termék hozzáadása a kosárhoz:

add_item_to_basket(user_id, new_item)

Hogyan használd a fájlt?

Importáld a függvényeket a filehandler.py modulból:

from filehandler import (
    add_user,
    add_basket,
    add_item_to_basket,
)

 - Hiba esetén ValuErrort kell dobni, lehetőség szerint ezt a 
   kliens oldalon is jelezni kell.

'''

#-----------------------------------------------------------------

# A JSON fájl elérési útja
JSON_FILE_PATH = os.path.join(os.path.dirname(__file__), "data.json")

#-----------------------------------------------------------------
# beleraktam egy try-catch ba hogy a fajl olvasasi hibat kezelni tudjam
def load_json() -> Dict[str, Any]:
    try:
        with open(JSON_FILE_PATH, "r", encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError:
        raise ValueError(f"Nincs ilyen fajl: {JSON_FILE_PATH}")
    except json.JSONDecodeError:
        raise ValueError("Hibas json formatum")

#-----------------------------------------------------------------
# json mentes
def save_json(data: Dict[str, Any]) -> None:
    try:
        with open(JSON_FILE_PATH, "w", encoding="utf-8") as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
    except Exception as e:
        raise ValueError(f"Hiba a menteskor : {str(e)}")

#-----------------------------------------------------------------
# add_user() -t atraktam a userhandler.py -ba

#-----------------------------------------------------------------
def add_basket(basket: Dict[str, Any]) -> None:
    data = load_json()
    
    # check felhaszalo letezik az id-vel
    from data.userhandler import user_exists
    if not user_exists(basket["user_id"]):
        raise ValueError(f"Nincs felhasználó ezzel az id-vel: {basket['user_id']}")
    
    # check van kosar a felhasznalohoz
    for oldbasket in data.get("Baskets", []):
        if oldbasket["user_id"] == basket["user_id"]:
            raise ValueError(f"Már van kosár a felhasználóhoz: {basket['user_id']}")
    
    if "Baskets" not in data:
        data["Baskets"] = []
    
    data["Baskets"].append(basket)
    save_json(data)

#-----------------------------------------------------------------

def add_item_to_basket(user_id: int, item: Dict[str, Any]) -> None:
    data = load_json()
    
    # felhasznalo kosar keres
    basketfound = False
    for basket in data.get("Baskets", []):
        if basket["user_id"] == user_id:
            basketfound = True
            basket["items"].append(item)
            break
    
    if not basketfound:
        raise ValueError(f"Nincs kosár a felhasználóhoz: {user_id}")
    
    save_json(data)

#-----------------------------------------------------------------

def update_item_in_basket(user_id: int, item_id: int, updated_item: Dict[str, Any]) -> None:
    data = load_json()
    
    # felhasznalo kosar keres
    basketfound = False
    itemfound = False
    
    for basket in data.get("Baskets", []):
        if basket["user_id"] == user_id:
            basketfound = True
            for i, item in enumerate(basket["items"]):
                if item["item_id"] == item_id:
                    itemfound = True
                    basket["items"][i] = updated_item
                    break
            break
    
    if not basketfound:
        raise ValueError(f"Nincs kosár a felhasználóhoz: {user_id}")
    if not itemfound:
        raise ValueError(f"Nincs termék ezzel az id-vel: {item_id}")
    
    save_json(data)
    
#-----------------------------------------------------------------

def delete_item_from_basket(user_id: int, item_id: int) -> None:
    data = load_json()
    
    # felhasznalo kosar keres
    basketfound = False
    itemfound = False
    
    for basket in data.get("Baskets", []):
        if basket["user_id"] == user_id:
            basketfound = True
            for i, item in enumerate(basket["items"]):
                if item["item_id"] == item_id:
                    itemfound = True
                    basket["items"].pop(i)
                    break
            break
    
    if not basketfound:
        raise ValueError(f"Nincs kosár a felhasználóhoz: {user_id}")
    if not itemfound:
        raise ValueError(f"Nincs termék az id-vel: {item_id}")
    
    save_json(data)

#-----------------------------------------------------------------

def delete_all_items_from_basket(user_id: int) -> None:

    # termekek torlese felhasznalo kosarbol
    data = load_json()
    basketfound = False
    
    for basket in data.get("Baskets", []):
        if basket["user_id"] == user_id:
            basketfound = True
            basket["items"] = []
            break
    
    if not basketfound:
        raise ValueError(f"Nincs kosár a felhasználóhoz: {user_id}")
    
    save_json(data)

#-----------------------------------------------------------------

def is_basket_empty(user_id: int) -> bool:
    # check felhasznalo kosar ures
    data = load_json()
    
    for basket in data.get("Baskets", []):
        if basket["user_id"] == user_id:
            return len(basket["items"]) == 0
    
    raise ValueError(f"Nincs kosár a felhasználóhoz: {user_id}")

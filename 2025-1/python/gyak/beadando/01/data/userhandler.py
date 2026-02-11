import json
from typing import Dict, Any, List
import os

# A users.json fajl path-ja
USERS_JSON_FILE_PATH = os.path.join(os.path.dirname(__file__), "users.json")

#-----------------------------------------------------------------

def load_users_json() -> Dict[str, Any]:
    # user.json betolt
    try:
        with open(USERS_JSON_FILE_PATH, "r", encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError:
        raise ValueError(f"Nincs meg a {USERS_JSON_FILE_PATH} fájl!")
    except json.JSONDecodeError:
        raise ValueError("Hibás json formátum a users.json fájlban")

#-----------------------------------------------------------------

def save_users_json(data: Dict[str, Any]) -> None:
    # user.json ment
    try:
        with open(USERS_JSON_FILE_PATH, "w", encoding="utf-8") as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
    except Exception as e:
        raise ValueError(f"Hiba a users.json mentéskor: {str(e)}")

#-----------------------------------------------------------------

def add_user(user: Dict[str, Any]) -> None: 
    data = load_users_json()
    
    # check egyedi 
    for olduser in data.get("Users", []):
        if olduser["id"] == user["id"]:
            raise ValueError(f"Van már felhasználó azonos id-vel: {user['id']}")
    
    if "Users" not in data:
        data["Users"] = []
    
    data["Users"].append(user)
    save_users_json(data)

#-----------------------------------------------------------------

def get_user_by_id(user_id: int) -> Dict[str, Any]:
    # felhasznalo id alapjan
    data = load_users_json()
    
    for user in data.get("Users", []):
        if user["id"] == user_id:
            return user
    
    raise ValueError(f"Nincs felhasználó ezzel az id-vel: {user_id}")

#-----------------------------------------------------------------

def get_all_users() -> List[Dict[str, Any]]:
    # minden felhasznalo
    data = load_users_json()
    return data.get("Users", [])

#-----------------------------------------------------------------

def delete_user_by_id(user_id: int) -> None:
    # felhasznalo torol id alapjan
    data = load_users_json()
    
    users = data.get("Users", [])
    user_found = False
    
    for i, user in enumerate(users):
        if user["id"] == user_id:
            user_found = True
            users.pop(i)
            break
    
    if not user_found:
        raise ValueError(f"Nincs felhasználó az id-vel: {user_id}")
    
    data["Users"] = users
    save_users_json(data)

#-----------------------------------------------------------------

def user_exists(user_id: int) -> bool:
    # check letezik a felhasznalo
    try:
        get_user_by_id(user_id)
        return True
    except ValueError:
        return False

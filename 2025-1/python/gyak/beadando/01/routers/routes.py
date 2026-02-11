from schemas.schema import User, Basket, Item
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi import FastAPI, HTTPException, Request, Response, Cookie, Header
from fastapi import APIRouter
from data.filehandler import add_basket, add_item_to_basket, update_item_in_basket, delete_item_from_basket, delete_all_items_from_basket, is_basket_empty
from data.filereader import get_basket_by_user_id, get_total_price_of_basket
from data.userhandler import add_user, get_user_by_id, get_all_users, delete_user_by_id
import os

'''

Útmutató a fájl használatához:

- Minden route esetén adjuk meg a response_modell értékét (típus)
- Ügyeljünk a típusok megadására
- A függvények visszatérési értéke JSONResponse() legyen
- Minden függvény tartalmazzon hibakezelést, hiba esetén dobjon egy HTTPException-t
- Az adatokat a data.json fájlba kell menteni.
- A HTTP válaszok minden esetben tartalmazzák a 
  megfelelő Státus Code-ot, pl 404 - Not found, vagy 200 - OK

'''

routers = APIRouter()

# token beolvas
TOKEN_FILE_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "token.txt")

#-----------------------------------------------------------------
# token beolvas es check

def load_valid_token() -> str:
    try:
        with open(TOKEN_FILE_PATH, "r", encoding="utf-8") as file:
            return file.read().strip()
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Nincs token fájl!")

def verify_token(token: str = Header(None, alias="secret_token")):
    if token is None:
        raise HTTPException(status_code=401, detail="Nincs token a headerben.")
    
    valid_token = load_valid_token()
    if token != valid_token:
        raise HTTPException(status_code=403, detail="Érvénytelen token!")
    
    return token

#-----------------------------------------------------------------

@routers.post('/adduser', response_model=User, status_code=201, summary="Új felhasználó hozzáadása")
def adduser(user: User, token: str = Header(None, alias="secret_token")) -> User:
    """
    felhasznalo hozzaad
    (token kell)
    """
    try:
        verify_token(token)
        user_dict = user.model_dump()
        add_user(user_dict)
        return JSONResponse(content=user_dict, status_code=201)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Szerverhiba: {str(e)}")

#-----------------------------------------------------------------

@routers.post('/addshoppingbag', response_model=str, status_code=201, summary="Új kosár hozzáadása felhasználóhoz")
def addshoppingbag(userid: int, token: str = Header(None, alias="secret_token")) -> str:
    """
    bavasarlo kosar hozzaad    
    (token kell)
    """
    try:
        verify_token(token)
        get_user_by_id(userid)
        
        from data.filereader import load_json
        data = load_json()
        max_basket_id = max([b["id"] for b in data.get("Baskets", [])], default=100)
        new_basket_id = max_basket_id + 1
        
        new_basket = {
            "id": new_basket_id,
            "user_id": userid,
            "items": []
        }
        
        add_basket(new_basket)
        return JSONResponse(content="Sikeres kosár hozzárendelés.", status_code=201)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Szerverhiba: {str(e)}")

 

@routers.post('/additem', response_model=Basket, status_code=200, summary="Termék hozzáadása kosárhoz")
def additem(userid: int, item: Item) -> Basket:
    try:
        item_dict = item.model_dump()
        add_item_to_basket(userid, item_dict)

        from data.filereader import load_json
        data = load_json()
        for basket in data.get("Baskets", []):
            if basket["user_id"] == userid:
                return JSONResponse(content=basket, status_code=200)
        
        raise HTTPException(status_code=404, detail="Nincs kosár!")
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Szerverhiba: {str(e)}")

#-----------------------------------------------------------------

@routers.put('/updateitem', response_model=Basket, status_code=200, summary="Termék módosítása kosárban")
def updateitem(userid: int, itemid: int, updateItem: Item) -> Basket:
    try:
        updated_item_dict = updateItem.model_dump()
        update_item_in_basket(userid, itemid, updated_item_dict)
        from data.filereader import load_json
        data = load_json()
        for basket in data.get("Baskets", []):
            if basket["user_id"] == userid:
                return JSONResponse(content=basket, status_code=200)
        
        raise HTTPException(status_code=404, detail="Nincs kosár!")
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Szerverhiba: {str(e)}")

#-----------------------------------------------------------------

@routers.delete('/deleteitem', response_model=Basket, status_code=200, summary="Termék törlése kosárból")
def deleteitem(userid: int, itemid: int) -> Basket:
    try:
        delete_item_from_basket(userid, itemid)
        
        # vissza frissitett kosar
        from data.filereader import load_json
        data = load_json()
        for basket in data.get("Baskets", []):
            if basket["user_id"] == userid:
                return JSONResponse(content=basket, status_code=200)
        
        raise HTTPException(status_code=404, detail="Nincs kosár!")
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Szerverhiba: {str(e)}")

#-----------------------------------------------------------------

@routers.delete('/deletall', response_model=Basket, status_code=200, summary="Összes termék törlése kosárból")
def deletall(userid: int, token: str = Header(None, alias="secret_token")) -> Basket:
    """
    minden termek torlese a kosarbol id alapjan
    (token kell)
    """
    try:
        verify_token(token)
        delete_all_items_from_basket(userid)
        
        # vissza frissitett üres kosar
        from data.filereader import load_json
        data = load_json()
        for basket in data.get("Baskets", []):
            if basket["user_id"] == userid:
                return JSONResponse(content=basket, status_code=200)
        
        raise HTTPException(status_code=404, detail="Nincs kosár!")
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Szerverhiba: {str(e)}")

#-----------------------------------------------------------------

@routers.get('/user', response_model=User, status_code=200, summary="Felhasználó lekérése")
def user(userid: int, token: str = Header(None, alias="secret_token")) -> User:
    """
    felhasznalo adat lekeres id alapjan
    (token kell)
    """
    try:
        verify_token(token)
        user_data = get_user_by_id(userid)
        return JSONResponse(content=user_data, status_code=200)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Szerverhiba: {str(e)}")

#-----------------------------------------------------------------

@routers.get('/users', response_model=list[User], status_code=200, summary="Összes felhasználó lekérése")
def users(token: str = Header(None, alias="secret_token")) -> list[User]:
    """
    minden felhasznalo lekerdez
    (token kell)
    """
    try:
        verify_token(token)
        all_users = get_all_users()
        return JSONResponse(content=all_users, status_code=200)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Szerverhiba: {str(e)}")

#-----------------------------------------------------------------

@routers.get('/shoppingbag', response_model=list[Item], status_code=200, summary="Kosár tartalmának lekérése")
def shoppingbag(userid: int)-> list[Item]:
    """
    megadja egy felhasznalo kosarat
    """
    try:
        basket_items = get_basket_by_user_id(userid)
        return JSONResponse(content=basket_items, status_code=200)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Szerverhiba: {str(e)}")

#-----------------------------------------------------------------

@routers.get('/getusertotal', response_model=dict, status_code=200, summary="Kosár összértékének lekérése")
def getusertotal(userid: int) -> dict:
    """
    megadja az ossz eretek egy felhasznalo kosaranak id alapjan
    """
    try:
        total = get_total_price_of_basket(userid)
        return JSONResponse(content={"user_id": userid, "total": total}, status_code=200)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Szerverhiba: {str(e)}")

#-----------------------------------------------------------------

@routers.delete('/deleteuser', response_model=dict, status_code=200, summary="Felhasználó törlése")
def deleteuser(userid: int, token: str = Header(None, alias="secret_token")) -> dict:
    """
    torli a felhasznalot id alapjan, ha letezik a felhasznalo es nem ures a kosara
    (token kell)
    """
    try:
        verify_token(token)
        
        # check letezik a felhasznalo
        user_data = get_user_by_id(userid)
        
        # check ures kosar
        if not is_basket_empty(userid):
            raise HTTPException(status_code=400, detail="A felhasználó kosara nem üres, nem lehet törölni!")
        
        # felhasznalo torol
        delete_user_by_id(userid)
        
        return JSONResponse(content={"message": f"Felhasználó törölve: {userid}", "deleted_user": user_data}, status_code=200)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Szerverhiba: {str(e)}")


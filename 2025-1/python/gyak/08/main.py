#Ez a fájl a food.json feltöltött fájlhoz készült, mint alap FastAPI-s alkalmazás.
#A beadandóban kelleni fog a hibák pontos lekezelése!

from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, field_validator
#import pydantic
from typing import *
import json

#print(pydantic.VERSION) # 2-es verzióval field_validator, egyébként sima validator
app = FastAPI()

class Food(BaseModel): #Pydantic modell alkalmazása (típushelyesség miatt)
    id : int
    name : str
    ingredients : List[str] = [] # default érték adása
    kcal : int = Field(..., description="Kalória mértéke az ételben")
    # Field típus megadása - több tulajdonsággal ki lehet így bővíteni az attribútumot!
    description : str = "" #default értékként üres
    
    @field_validator("id", "kcal") #adott mezőket validáló metódus
    def validate_pos_num(num : int) -> int:
        if num <= 0:
            raise ValueError("Az adott érték nem lehet nulla, vagy annál kevesebb!")
        return num

class MessageResponse(BaseModel):
    #Sokszor külön response/lekérdező modell is ajánlott a szebb lekezelés miatt!
    message : str
    
class FoodNotFoundException(Exception): #precízebb lekezeléshez saját Exceptionök is kelleni fognak!
    pass

def save_food(data : Dict[str, Any]) -> None: #str kulcsú, bármilyen típusú dictionary!
    try:
        with open("food.json", "w+", encoding="utf-8") as f:
            json.dump(data, f, indent=4)
    except Exception:
        raise Exception("Hiba történt a fájlírásnál!") #hiba továbbdobása, hogy máshol kezelődjön le

def load_food() ->  List[Dict[str, Any]]: #Dictionary formátumú adatok listája
    try:
        with open("food.json", "r", encoding="utf-8") as f:
            data = json.load(f)
            #    foods = [Food(**food) for food in foods] # ha Food-ként akarjuk, hogy viselkedjen beolvasás után
            # ezesetben a visszatérési értéke a fv-nek List[Food] !
            # a JSON formátum Food listát taratlmaz, ezért listában fogja visszaadni!
            return data
    except FileNotFoundError:
        raise FileNotFoundError("Hiba történt a fájl beolvasásánál!")
    except Exception:
        raise Exception("Hiba történt a beolvasásnál!")

@app.get("/", response_model = MessageResponse) #várhatóan MessageResponse alakú választ fog adni
def root() -> Dict[str, Any]:
    data = {"message" : "hello world"}
    return JSONResponse(content=data, status_code=200)

@app.get("/foods", response_model = List[Food])
def get_foods() -> List[Food]:
    """Returns all food"""
    #docstring szintúgy megjelenik a FastAPI dokumentációban
    try:
        all_food = load_food()
        return JSONResponse(content=all_food, status_code=200)
    except Exception as e:
        raise HTTPException(detail = str(e), status_code=500)
    #hibaüzenet kiiratása str(e)-vel
    
@app.get("/food", response_model = Food)
def get_food(id : int) -> Food:
    try:
        foods = load_food()
        #dictionaryn iteráló megoldás
        # for f in foods:
        #     if f["id"] == id:
        #         return JSONResponse(content=f, status_code=200)
        foods = [Food(**food) for food in foods]
        #objektummá alakítás - konstruktorban kulcs-érték párokként adódnak át az attribútumok
        #dictionary unpackinggel
        for f in foods:
            if f.id == id:
                return JSONResponse(content=f.model_dump(), status_code=200)
            #model_dump, ha objektumból (BaseModel) szeretnénk visszaállítani dictionaryvé (ami JSON kompatibilis)!
        raise FoodNotFoundException("Nincsen adott azonosítójú étel!")
    except FoodNotFoundException as e:
        raise HTTPException(detail = str(e), status_code=404)
    except Exception as e:
        raise HTTPException(detail = str(e), status_code=500)

@app.post("/food", response_model = str)
def post_food(food : Food) -> JSONResponse:
    try:
        data = load_food()
        # itt a dictionarys megjelenítés alapján adjuk hozzá
        data.append(food.model_dump())
        #print(data)
        save_food(data)
        return JSONResponse(content="Sikeres hozzáadás!", status_code=200)
    except Exception as e:
        raise HTTPException(detail="Sikertelen hozzáadás! " + str(e), status_code=500)

@app.delete("/food", response_model = str)
def delete_food(id : int) -> JSONResponse:
    #megoldható listából törléssel is, ha valakinek úgy kényelmesebb
    try: 
        foods = load_food()
        new_foods = []
        found = False
        for f in foods:
            if f["id"] == id:
                found = True
                continue #kihagyjuk az adott azonosítójú ételt, ha megtaláljuk
            new_foods.append(f)
        if found: #ha nem találtuk meg - ne mentsünk feleslegesen
            save_food(new_foods)
            return JSONResponse(content="Sikeres törlés!", status_code=200)
        raise FoodNotFoundException("Nincsen adott azonosítójú étel!")
    except FoodNotFoundException as e:
        raise HTTPException(detail = "Sikertelen törlés! " + str(e), status_code=404)
    except Exception as e:
        raise HTTPException(detail="Sikertelen törlés! " + str(e), status_code=500) 
    

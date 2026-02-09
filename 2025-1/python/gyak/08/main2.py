from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, field_validator

app = FastAPI()
#futtatás: python -m uvicorn fájlnév:változónév (--reload --port 1313)

class Book(BaseModel):
    id : int
    author : str = Field(..., min_length=2) #helybeli megkötések attribútumra
    title : str
    page : int 
    
    @field_validator("page")
    def page_validator(cls, page):
        if page < 0:
            raise HTTPException(status_code=400, detail="Hibás oldalszám!")
        #vissza kell adni az értéket, amit validálunk, így mentődik el!
        return page

lst = [Book(id=0, author = "Tolkien", title="Gyuruk ura", page=600),
       Book(id=1, author = "Second Tolkien", title="Gyuruk ura 2", page=600)]

@app.get("/")
def welcome():
    return {"message" : "hello world"}

@app.get("/items")
def get_items():
    return lst

@app.get("/items/{item_id}")
def get_item(item_id : int):
    #feltételezzük, hogy id-k sorban jönnek
    if item_id < 0 or item_id > len(lst)-1:
        raise HTTPException(404, "item id not found!")
    return lst[item_id]
    

@app.post("/items", response_model=Book)
def add_item(book : Book):
    if not any(b.id == book.id for b in lst):
        lst.append(book)
    else:
        raise HTTPException(400, "book with same id already exists!")
    return book

@app.delete("/items/{item_id}")
def delete_item(item_id : int):
    if item_id < 0 or item_id > len(lst)-1:
        raise HTTPException(404, "item id not found!")
    return lst.pop(item_id)

@app.put("/items/{item_id}", response_model=Book)
def update_item(item_id : int):
    pass
from pydantic import BaseModel, EmailStr, Field, field_validator

'''

Útmutató a fájl használatához:

Az osztályokat a schema alapján ki kell dolgozni.

A schema.py az adatok küldésére és fogadására készített osztályokat tartalmazza.
Az osztályokban az adatok legyenek validálva.
 - az int adatok nem lehetnek negatívak.
 - az email mező csak e-mail formátumot fogadhat el.
 - Hiba esetén ValuErrort kell dobni, lehetőség szerint ezt a 
   kliens oldalon is jelezni kell.

'''

ShopName='Bolt'

#-----------------------------------------------------------------

class Item(BaseModel):
    item_id: int = Field(..., ge=0)
    name: str = Field(..., min_length=1)
    brand: str = Field(..., min_length=1)
    price: float = Field(..., gt=0)
    quantity: int = Field(..., ge=1)

    @field_validator('item_id', 'quantity')
    @classmethod
    def check_non_negative(cls, v):
        if v < 0:
            raise ValueError('Az érték nem lehet negatív')
        return v

#-----------------------------------------------------------------

class Basket(BaseModel):
    id: int = Field(..., ge=0)
    user_id: int = Field(..., ge=0)
    items: list[Item] = Field(default_factory=list)

    @field_validator('id', 'user_id')
    @classmethod
    def check_non_negative(cls, v):
        if v < 0:
            raise ValueError('Az érték nem lehet negatív')
        return v

#-----------------------------------------------------------------

class User(BaseModel):
    id: int = Field(..., ge=0)
    name: str = Field(..., min_length=1)
    email: EmailStr = Field(...)

    @field_validator('id')
    @classmethod
    def check_non_negative(cls, v):
        if v < 0:
            raise ValueError('Az érték nem lehet negatív')
        return v

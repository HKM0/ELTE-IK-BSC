from fastapi import FastAPI
from schemas.schema import ShopName
from routers.routes import routers as routes_router

'''
Útmutató a fájl használatához:

A futó alkalmazás a következő URL-en érhető el:

   127.0.0.1:9000

A webes UI pedig az alábbi URL használatával:

   127.0.0.1:9000/docs

A dokumentáció pedig itt:

   127.0.0.1:9000/redoc

'''

app = FastAPI(
    title="HGSWOU",
    description="REST API beadando: Herceg Kristóf",
    #version="1.0.0"
)
app.include_router(routes_router)

#-----------------------------------------------------------------

@app.get('/', summary="Üdvözlő üzenet")
def route():
    return {'Wellcome in ': ShopName}    

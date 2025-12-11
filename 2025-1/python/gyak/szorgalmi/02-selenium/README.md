## Feladat: Python szkript Selenium segítségével

A [Selenium](https://www.selenium.dev/selenium/docs/api/py/) egy olyan könyvtár, amely lehetővé teszi adatok kinyerését weboldalakról. Mivel összetettebb weboldalakról is tud adatokat kinyerni, böngészőspecifikus webdriver szükséges hozzá (lásd a linkeket lent).

### Feladat leírása

Írj egy Python szkriptet, amely a következő oldalt elemzi:  
[https://www.hirkereso.hu/tech/](https://www.hirkereso.hu/tech/)

A szkript feladata:

- Számolja meg, hogy hányszor szerepel a hivatkozások szövegében az alábbi szövegrészletek valamelyike:
    - Facebook
    - iPhone
    - Apple
    - AI
    - Google
    - Meta
    - Microsoft
    - MI
    - Nvidia
- A számolás kis- és nagybetűtől független legyen.
- Külön-külön jegyezze a szavak előfordulását egy `dictionary`-ben.
- A végén írassa ki a dictionary tartalmát.

> **Megjegyzés:**  
> A megoldáshoz töltsd fel a Seleniumhoz használt webdrivert is a szkript mellé!

### Hasznos linkek

- [Chrome WebDriver letöltése](https://googlechromelabs.github.io/chrome-for-testing/#stable)
- [Selenium dokumentáció (Python)](https://www.selenium.dev/selenium/docs/api/py/)
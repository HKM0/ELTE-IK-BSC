- időben beadni, üres fájl nem töltünk fel
- A `vendor` és `node_modules` (ha létezik) könyvtár beadása **TILOS!**
- nyilatkozatot kitölteni **KÖTELEZŐ!**

letöltendők:
- php composer ([innen](https://github.com/totadavid95/PhpComposerInstaller/releases/tag/v1.2.6))
- kezdőcsomag letöltése és beüzemelése ([canvas](https://canvas.elte.hu/courses/63542/assignments))
- database sqlite 3 telepítése
- php intellephense
- thunder client
- graphiQL
- laravel blade formatter
- graphql highlight


<details>
<summary>Segítség! Elkezdődött a ZH, de nem megy a PHP vagy a Composer!</summary>

Pánikra semmi ok! Ilyenkor is letöltheted a [PHPComposerInstaller.exe](#TODO) legfrissebb verzióját. Ha már offline módban vagyunk, akkor a VC++ Redistributable nem tud települni, ezért az EXE-t terminálból kell az ennek megfelelő kapcsolóval futtatni: `PHPComposerInstaller.exe --no-vc-redist`

Továbbra sem sikerül? Itt az idő, hogy jelezd a teremben felügyelőknek!

Az esetleges egyéb szükséges eszközöket (pl. Postman, GraphiQL) eléred a kezdőcsomag futtatásakor a gyökér útvonalon! Sajnos, ha már ZH mód van, akkor VS Code kiegészítők vagy egyéb szoftver telepítését nem tudjuk biztosítani.

</details>

<details>
<summary>Kezdőcsomag beüzemelése</summary>

1. `cp .env.example .env`
2. `composer install`
3. `php artisan migrate --seed`
4. `php artisan key:generate`
5. `php artisan serve`
</details>

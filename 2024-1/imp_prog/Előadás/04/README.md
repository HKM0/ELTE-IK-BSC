# Utasítások

Az utasítások és vezérlési szerkezetek az imperatív programozási nyelvek alapvető elemei. Ezek segítségével írjuk le, hogyan szeretnénk a programot végrehajtani.

## Kifejezés utasítás

Egy kifejezés az azt követő pontosvesszővel (`;`) egy kifejezés utasítást (expression statement) képez. Például:

```c
printf("Hello world\n")
```

A fenti kifejezés típusa `int`, értéke 12 (ugyanis a `printf` visszatérő értéke a kiírt karakterek száma). Ha pontosvesszőt teszünk utána, akkor utasítást kapunk:

```c
printf("Hello world\n");
```

## Üres utasítás

Az üres utasítás (null statement) hatás nélküli (bár kaphat címkét):

```c
if ( x < 10 )
    ;
else
    printf("else branch");
```

## Összetett utasítás

Az összetett utasítás (compound statement) vagy blokk utasítás arra szolgál, hogy több utasítást összefogjon:

```c
if ( x < 10 )
{
    ;
}
else
{
    printf("compound statement");
    printf("in the else branch");
}
```

Sok véletlen hibát elkerülhetünk, ha a vezérlési szerkezetekben mindig kirakjuk a `{ }` kapcsos-zárójeleket, akkor is, ha csak egyetlen utasítást szeretnénk végrehajtani.

## Elágazás

Az `if` elágazásnak két formája van:

```c
if (expression) statement
if (expression) statement1; else statement2;
```

Az `if` kifejezés feltételét kötelező zárójelbe írni, ahogy azt a `switch`, `while` és `for` esetében is. Az utasítások lehetőleg legyenek összetett utasítások. Az `if` utasítás esetében mindig érdekes kérdés, hogy hova tartoznak a lógó (dangling) `else` utasítások. A C-ben és sok más nyelvben az `else` a hozzá szintaktikusan legközelebbi `if`-hez tartozik.

```c
if ( x < 10 )
    if ( y > 5 )
        printf("x < 10 and y > 5");
else
    printf("x < 10 and y <= 5");
```

Ekvivalens az alábbival:

```c
if ( x < 10 )
{
    if ( y > 5 )
        printf("x < 10 and y > 5");
    else
        printf("x < 10 and y <= 5");
}
```

És eltér ettől:

```c
if ( x < 10 )
{
    if ( y > 5 )
        printf("x < 10 and y > 5");
}
else
    printf("x >= 10");
```

A Pythonban a tabulálás jelöli ki a struktúrát. A C-ben nincsen `elseif` vagy `elif`, de az `else` ág egyetlen utasításaként írhatunk egy újabb `if` utasítást. Ennek hatása hasonló, mintha `elseif`-ünk lenne.

```c
if ( x < 10  &&  y > 5 )
{
    printf("x < 10 and y > 5");
}
else if ( x < 10  &&  y <= 5 )
{
    printf("x < 10 and y <= 5");
}
else if ( x >= 10  &&  y > 5 )
{
    printf("x >= 10 and y > 5");
}
else if ( x >= 10  &&  y <= 5 )
{
    printf("x >= 10 and y <= 5");
}
else
{
    printf("impossible");
}
```

## Szelekciós utasítás

A `switch` utasítás egy alternatív elágazási forma, ahol az elágazást egy kifejezés különböző értékei alapján hajtjuk végre:

```c
switch (expression) statement
```

Az utasítás szinte mindig egy blokk, melyben `case` címkével ellátott utasítások szerepelnek. A címkék értékének fordítási időben megadottnak és egyedinek kell lennie.

```c
int day_of_week;
//...
switch ( day_of_week )
{
    default: printf("Undefined"); break;
    case  2: printf("Monday");    break;
    case  3: printf("Tuesday");   break;
    case  4: printf("Wednesday"); break;
    case  5: printf("Thursday");  break;
    case  6: printf("Friday");    break;
    case  1: /* fallthrough */
    case  7: printf("Week-end");  break;
}
```

A címkéket úgy tekinthetjük, mint célpontokat, ahová odaugrik a vezérlés, ha értékük megegyezik a feltételben megadott értékkel. Onnan a vezérlés a megadott utasításoknak megfelelően, szekvenciálisan folytatódik, amíg el nem érünk egy `break` utasításhoz.

Ha nincsen `break` utasítás, akkor a vezérlés rácsorog a következő címkét tartalmazó utasításra. Ez általában nem jó programozási stratégia, de esetenként ezt használjuk a címkék csoportosítására. Ilyenkor ajánlott ezt a szándékunkat pl. kommentben jelezni.

Ha egyetlen címke sem egyezik meg a feltételben megadott értékkel, és van `default` címke, akkor a vezérlés oda adódik át.

## While ciklus

A C nyelvben többféle módon szervezhetünk ciklust. Az egyik legalapvetőbb konstrukció a `while` ciklus:

```c
while ( expression ) statement
```

A `while` ciklus először ellenőrzi a ciklusfeltétel kifejezést, és addig hajtja végre a ciklusmagot, ameddig a feltétel igaz.

```c
struct list_type
{
    int       value;
    list_type *next;
};
// ...pt-expr
list_type *ptr = first;
while ( NULL != ptr  )
{
    printf( "%d ", ptr->value);
    ptr = ptr->next;
}
```

## Do-while ciklus

A `do-while` ciklus ún. hátul-tesztelő ciklus. Ez azt jelenti, hogy a ciklusmagot egyszer mindenképpen végrehajtjuk, és csak utána ellenőrizzük a feltételt.

```c
do statement while ( expression ) ;
```

Figyeljük meg a feltétel-kifejezés zárójelét lezáró pontosvesszőt. A `do-while` utasítás ekvivalens a következő konstrukcióval:

```c
statement
while ( expression )
    statement
```

A `do-while` konstrukciót néha alkalmazzák, amikor az első ciklusvégrehajtás előtti ellenőrzést ki akarják spórolni pl. hatékonysági okokból.

![do-while ciklus](https://gsd.web.elte.hu/images/do_ciklus.jpg)

## For ciklus

A `for` ciklus az egyik leggyakrabban előforduló ciklusfajta. Kétféle formája van:

```c
for ( opt-expr-1 ; opt-expr-2 ; opt-expr-3 ) statement 
for ( declaration; opt-expr-2 ; opt-expr-3 ) statement  // C99 óta
```

- `opt-expr-1`: opcionális kifejezés, ami a ciklusváltozó kezdeti értékbeállítására szolgál.
- `opt-expr-2`: opcionális feltétel, ami minden ciklusmag végrehajtása előtt kiértékelődik.
- `opt-expr-3`: opcionális kifejezés, ami mindig kiértékelődik a ciklusmag után.

Példa:

```c
for ( e1 ; e2 ; e3 ) s;
```

Ez nagyjából (de nem teljesen) azonos a következő `while` ciklussal:

```c
{
    e1;
    while ( e2 )
    {
        s;
        e3;
    }
}
```

A három opcionális kifejezés bármelyikét elhagyhatjuk. A középső elmaradása olyan, mintha állandóan igaz kifejezést írnánk. A (látszólag) végtelen ciklus egy alakja:

```c
for( ; ; ) statement
```

A C99 óta lehetséges az inicializáló kifejezést helyettesíteni egy ciklusváltozó létrehozásával és inicializálásával:

```c
for ( int i = 0; i < 10; ++i )
{
    printf( "%d ");
}
// i is not visible here.
```

## A break és a continue utasítások

A `break` utasítást nemcsak a `switch`-ben, hanem bármely cikluson belül is alkalmazhatjuk. Hatására a ciklusból azonnal kilépünk.

```c
int t[10];
// ...
for ( int i = 0; i < 10; ++i )
{
    if ( t[i] < 0 )
    {
        printf( "negative found");
        break;
    }
    printf("do something with non-negatives");
}
// break jumps to here
```

A `continue` utasítás átugorja a ciklusmag hátralévő részét és a vezérlés a ciklusmag végére ugrik.

```c
int t[10];
// ...
for ( int i = 0; i < 10; ++i )
{
    if ( t[i] < 0 )
    {
        printf( "negative found");
        continue;
    }
    printf("do something with non-negatives");
    // ...
    // continue jumps to here
}
```

## Return utasítás

A `return` visszatér a kurrens függvény végrehajtásából a hívó függvénybe. A `main` függvény esetében a `return` hatására a program végrehajtása befejeződik.

```c
return;
return expr;
```

Egy függvényben több `return` utasítás is szerepelhet. Ha a függvény visszatérő típusa nem `void`, akkor a `return` argumentuma a függvény visszatérő típusára konvertálódik.

```c
int find_first_negative( int t[], int length)
{
    for ( int i = 0; i < length; ++i )
    {
        if ( t[i] < 0 )
        {
            printf( "negative found");
            return t[i];
        }
    }
    return 0;
}
```

## Goto utasítás

Feltétel nélküli ugró utasítás. Csak az adott függvényen belülre ugorhatunk.

```c
goto label;
/* ... */
label: statement
```

Ahol `label` egy azonosító. **Ne használjunk goto utasítást.**

---

# Példák az utasítások használatára

A következőkben egy példasorozaton keresztül mutatjuk be az utasítások helyes ill. helytelen használatát. A feladat: írjunk olyan C programot, amely a standard inputot olvassa EOF-ig, átmásolva a karaktereket a standard outputra, eközben ciklikusan konvertálva az `a->e->i->o->u` magánhangzókat. Minden más karaktert változás nélkül írunk ki.

## Az if használata

**Hibás megoldás:**

```c
/*
 * A standard input átmásolása a standard outputra, miközben 
 * ciklikus helyettesítést végzünk a->e, e->i, ..., u->a
 * magánhangzókra, a többi karakter változatlan.
 * if használatával.
 *
 * HIBÁS MEGOLDÁS
 */

#include <stdio.h>

char change( char ch);

int main()
{
    int ch; /* int, mert a 256 karakter mellett 
                         ábrázolni kell az EOF szimbólumot is */

    while ( (ch = getchar()) != EOF )
    {
        putchar( change(ch) );
    }
    return 0;
}
char change(char ch)
{
    if ( 'a' == ch )
        ch = 'e';
    if  ( 'e' == ch )
        ch = 'i';
    if  ( 'i' == ch )
        ch = 'o';
    if  ( 'o' == ch )
        ch = 'u';
    if  ( 'u' == ch )
        ch = 'a';
    return ch;
}
```

A fenti program **hibás**, hiszen pl. egy ‘e’ karakter esetén miután átírtuk ‘i’-re, át fogjuk írni az ‘i’-t ‘o’-ra és így tovább… Helyesen használni kell az `else` ágakat:

**Helyes megoldás:**

```c
/*
 * A standard input átmásolása a standard outputra, miközben 
 * ciklikus helyettesítést végzünk a->e, e->i, ..., u->a
 * magánhangzókra, a többi karakter változatlan.
 * if-else használatával.
 *
 * Működik.
 */

#include <stdio.h>

char change( char ch);

int main()
{
    int ch; /* int, mert a 256 karakter mellett 
                         ábrázolni kell az EOF szimbólumot is */

    while ( (ch = getchar()) != EOF )
    {
        putchar( change(ch) );
    }
    return 0;
}
char change(char ch)
{
    if ( 'a' == ch )
        ch = 'e';
    else if  ( 'e' == ch )
        ch = 'i';
    else if  ( 'i' == ch )
        ch = 'o';
    else if  ( 'o' == ch )
        ch = 'u';
    else if  ( 'u' == ch )
        ch = 'a';
    else /* do nothing */ ;

    return ch;
}
```

## A switch használata

Az if-else-ek hosszú sorozata meglehetősen olvashatatlanná teszi a kódot. Ha egy konkrét értéken szeretnénk szétválasztani a tevékenységeket, akkor használhatunk `switch` szerkezetet.

**Hibás megoldás:**

```c
/*
 * A standard input átmásolása a standard outputra, miközben 
 * ciklikus helyettesítést végzünk a->e, e->i, ..., u->a
 * magánhangzókra, a többi karakter változatlan.
 * switch  használatával.
 *
 * HIBÁS MEGOLDÁS
 */

#include <stdio.h>

char change( char ch);

int main()
{
    int ch; /* int, mert a 256 karakter mellett 
                         ábrázolni kell az EOF szimbólumot is */

    while ( (ch = getchar()) != EOF )
    {
        putchar( change(ch) );
    }
    return 0;
}
char change(char ch)
{
    switch ( ch )
    {
    case 'a': ch = 'e'; 
    case 'e': ch = 'i';
    case 'i': ch = 'o';
    case 'o': ch = 'u';
    case 'u': ch = 'a';
    }
    return ch;
}
```

A fenti megoldás **hibás**, mert pl. ha ch értéke ‘e’, akkor miután átírtuk ‘i’-re, a vezérlés “továbbcsorog” a következő utasításra, egészen a switch aljáig. Helyesen alkalmaznunk kell a `break` utasítást, illetve ajánlatos használnunk a `default` címkét is.

**Helyes megoldás:**

```c
/*
 * A standard input átmásolása a standard outputra, miközben 
 * ciklikus helyettesítést végzünk a->e, e->i, ..., u->a
 * magánhangzókra, a többi karakter változatlan.
 * switch  használatával.
 *
 * Működik
 */

#include <stdio.h>

char change( char ch);

int main()
{
    int ch; /* int, mert a 256 karakter mellett 
                         ábrázolni kell az EOF szimbólumot is */

    while ( (ch = getchar()) != EOF )
    {
        putchar( change(ch) );
    }
    return 0;
}
char change(char ch)
{
    switch ( ch )
    {
    default : /* nop */; break;
    case 'a': ch = 'e';  break;
    case 'e': ch = 'i';  break;
    case 'i': ch = 'o';  break;
    case 'o': ch = 'u';  break;
    case 'u': ch = 'a';  break;
    }
    return ch;
}
```

## Ciklusok használata

Ha a konverziót “beégetjük” az utasításokba, az elég rugalmatlan megoldás. Nem tudjuk például a konvertálandó karaktereket futási időben beállítani vagy módosítani. A következő példákban a konverziót adatok segítségével definiáljuk.

**While ciklussal:**

```c
/*
 * A standard input átmásolása a standard outputra, miközben 
 * ciklikus helyettesítést végzünk a->e, e->i, ..., u->a
 * magánhangzókra, a többi karakter változatlan.
 * while  használatával.
 *
 * Működik, de nem túl hatékony és biztonságos
 */

#include <stdio.h>

char change( char ch);

int main()
{
    int ch; /* int, mert a 256 karakter mellett 
                         ábrázolni kell az EOF szimbólumot is */

    while ( (ch = getchar()) != EOF )
    {
        putchar( change(ch) );
    }
    return 0;
}
char change(char ch)
{
    char from[5] = {'a', 'e', 'i', 'o','u'};
    char to[5]   = {'e', 'i', 'o','u', 'a'};

    int i = 0;
    while ( i < 5 )
    {
        if ( from[i] == ch )
            return to[i];
        ++i;
    }
    return ch;
}
```

A fenti megoldás használható, de se nem túl hatékony, se nem túl karbantartható. A tömbök minden függvényhíváskor újra és újra létrejönnek. Praktikusabb, ha a tömbök méretét nem írjuk ki, hanem a fordító számolja ki.

**For ciklussal, konstans tömbökkel:**

```c
/*
 * A standard input átmásolása a standard outputra, miközben 
 * ciklikus helyettesítést végzünk a->e, e->i, ..., u->a
 * magánhangzókra, a többi karakter változatlan.
 * for  használatával.
 *
 * Működik
 */

#include <stdio.h>

char change( char ch);

int main()
{
    int ch; /* int, mert a 256 karakter mellett 
                         ábrázolni kell az EOF szimbólumot is */

    while ( (ch = getchar()) != EOF )
    {
        putchar( change(ch) );
    }
    return 0;
}

char change( char ch )
{
    static const char from[] = {'a', 'e', 'i', 'o','u'};
    static const char to[]   = {'e', 'i', 'o','u', 'a'};
    
    unsigned int i; /* size_t */
    for ( i = 0; i < sizeof(from)/sizeof(from[0]); ++i )
    {
        if ( from[i] == ch )
            return to[i];
    }
    return ch;
}
```

**For ciklussal, sentinel karakterrel:**

```c
/*
 * A standard input átmásolása a standard outputra, miközben 
 * ciklikus helyettesítést végzünk a->e, e->i, ..., u->a
 * magánhangzókra, a többi karakter változatlan.
 * for és sentinel használatával.
 *
 * Működik
 */

#include <stdio.h>

char change( char ch);

int main()
{
    int ch; /* int, mert a 256 karakter mellett 
                         ábrázolni kell az EOF szimbólumot is */

    while ( (ch = getchar()) != EOF )
    {
        putchar( change(ch) );
    }
    return 0;
}

char change( char ch )
{
    static const char from[] = "aeiou"; // {'a','e','i','o','u','\0'}
    static const char to[]   = "eioua"; // {'e','i','o','u','a','\0'}
    
    unsigned int i; /* size_t */
    for ( i = 0; '\0' != from[i]; ++i )
    {
        if ( from[i] == ch )
            return to[i];
    }
    return ch;
}
```

**For ciklussal, struct használatával:**

```c
/*
 * A standard input átmásolása a standard outputra, miközben 
 * ciklikus helyettesítést végzünk a->e, e->i, ..., u->a
 * magánhangzókra, a többi karakter változatlan.
 * for és struct használatával.
 *
 * Működik
 */

#include <stdio.h>

char change( char ch);

int main()
{
    int ch; /* int, mert a 256 karakter mellett 
                         ábrázolni kell az EOF szimbólumot is */

    while ( (ch = getchar()) != EOF )
    {
        putchar( change(ch) );
    }
    return 0;
}

struct conv_t
{
    char from;
    char to;
};

char change( char ch )
{
    static const struct conv_t conv_table[] = {
        {'a', 'e'},
        {'e', 'i'}, 
        {'i', 'o'},
        {'o', 'u'},
        {'u', 'a'}
    };
    unsigned int i; /* size_t */
    for ( i = 0; i < sizeof(conv_table)/sizeof(conv_table[0]); ++i )
    {
        if ( conv_table[i].from == ch )
            return conv_table[i].to;
    }
    return ch;
}
```

## Konverziós tábla

A következő megoldás valószínűleg a leggyorsabb. A megoldás alapja egy táblázat, amit úgy inicializáltunk, hogy a `ch` karakter lesz a tömb indexe, a megfelelő tömbelem pedig a kívánt visszatérő érték.

```c
/*
 * A standard input átmásolása a standard outputra, miközben 
 * ciklikus helyettesítést végzünk a->e, e->i, ..., u->a
 * magánhangzókra, a többi karakter változatlan.
 * konverziós tábla használatával.
 *
 * Működik és gyors
 */

#include <stdio.h>

void init();
char change( unsigned char ch);

static char table[256];

int main()
{
    int ch; /* int, mert a 256 karakter mellett 
                         ábrázolni kell az EOF szimbólumot is */

    init();

    while ( (ch = getchar()) != EOF )
    {
        putchar( change(ch) );
    }
    return 0;
}

void init()
{
    int i; 
    for (i = 0; i < 256; ++i) 
    {
        table[i] = i;
    }
    table['a'] = 'e';
    table['e'] = 'i';
    table['i'] = 'o';
    table['o'] = 'u';
    table['u'] = 'a';
}

char change( unsigned char ch )
{
    return table[ch];
}
```

Figyeljük meg, hogy a `change()` függvény paraméterét `unsigned char` típusnak deklaráltuk. Ez amiatt szükséges, hogy a 127 feletti kódú karakterek is pozitív számként viselkedjenek.

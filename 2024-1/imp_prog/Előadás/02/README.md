# Statikus típusrendszer

## forrás: 
Az egész markdown fájl tartalma egy átirat itt a forrás: [Dr. Porkoláb Zoltán oldala](https://gsd.web.elte.hu/imper/)

![Statikus típusrendszer 1](https://gsd.web.elte.hu/images/lectures/imper/total1.png)
![Statikus típusrendszer 2](https://gsd.web.elte.hu/images/lectures/imper/total2.png)

## Statikus vagy dinamikus típusrendszer

A programozási nyelvek egy részénél a fordítóprogram már a fordítási időben minden egyes részkifejezésről el tudja dönteni, hogy az milyen típusú. Ezeket a nyelveket **statikus típusrendszerrel** rendelkezőnek nevezzük. Ennek előnyei:

- Alaposabb ellenőrzések
- Optimálisabb kódgenerálás

**Statikus típusrendszerű nyelvek:** Fortran, Algol, C, Pascal, C++, Java, C#, Go.

Más nyelveknél, legtöbbször az interpretált nyelveknél, egy változó idővel más típusú értékekre is hivatkozhat. Ilyenkor a fordító futási időben kezeli a típusinformációkat. Ezt **dinamikus típusrendszernek** nevezzük. Ilyen nyelv pl. a Python.

A dinamikus típusrendszer is ellenőrizheti a típusok alkalmazását, és helytelen alkalmazás hibát okozhat. Azokat a nyelveket, ahol ilyen hibák előfordulnak, **erősen típusosnak** nevezzük, szemben a **gyengén típusos** nyelvekkel.

- **C:** erősen típusos, statikus típusrendszer
- **Python:** erősen típusos, dinamikus típusrendszer

---

## A második C program: Fahrenheit - Celsius konverzió

> *A jó, a rossz és a csúf* ([IMDb](https://www.imdb.com/title/tt0060196/))

**Feladat:** -100 és +400 közötti Fahrenheit értékek Celsius megfelelőinek kiírása 100-as lépésközzel.

### Hibás verzió

```c
/*
 *  BAD VERSION !!!
 *  Convert Fahrenheit to Celsius
 *  between -100F and +400F  by 100F  
 */
#include <stdio.h>
int main()
{
    int fahr;

    for ( fahr = -100; fahr <= 400; fahr += 100 )
    {
        printf("Fahr = %d,\tCels = %d\n", fahr, 5/9*(fahr-32));
    }
    return 0;
}
```

Fordítás és futtatás:

```sh
$ gcc -ansi -pedantic -W -Wall -std=c11 fahrenheit.c -o fahrenheit
$ ./fahrenheit
Fahr = -100,	Cels = 0
Fahr = 0,	Cels = 0
Fahr = 100,	Cels = 0
Fahr = 200,	Cels = 0
Fahr = 300,	Cels = 0
Fahr = 400,	Cels = 0
```

**Hiba oka:**  
A `5/9` egész osztás eredménye 0, így a Celsius érték mindig 0 lesz.

---

### Más nyelvekben

- **Pascal:** `div` egész osztás, `/` lebegőpontos
- **Python3:** `/` mindig lebegőpontos eredményt ad

---

### Hibás verzió 2

```c
/*
 *  BAD VERSION !!!
 *  Convert Fahrenheit to Celsius
 *  between -100F and +400F  by 100F  
 */
#include <stdio.h>
int main()
{
    int fahr;

    for ( fahr = -100; fahr <= 400; fahr += 100 )
    {
        printf("Fahr = %d,\tCels = %d\n", fahr, 5./9.*(fahr-32));
    }
    return 0;
}
```

Fordítás:

```sh
$ gcc -ansi -pedantic -W -Wall fahrenheit.c -o fahrenheit
fahrenheit.c: In function ‘main’:
warning: format ‘%d’ expects argument of type ‘int’, but argument 3 has type ‘double’ [-Wformat=]
```

Futtatás:

```sh
$ ./fahrenheit 
Fahr = -100,	Cels = 913552376
Fahr = 0,	Cels = -722576928
...
```

**Hiba oka:**  
A `%d` formátum int-et vár, de double-t kap.

---

### "Ugly" verzió

```c
/*
 *  UGLY VERSION
 *  Convert Fahrenheit to Celsius
 *  between -100F and +400F  by 100F  
 */
#include <stdio.h>
int main()
{
    int fahr;

    for ( fahr = -100; fahr <= 400; fahr += 100 )
    {
        printf("Fahr = %d,\tCels = %f\n", fahr, 5./9.*(fahr-32));
    }
    return 0;
}
```

Futtatás:

```sh
$ ./fahrenheit 
Fahr = -100,	Cels = -73.333333
Fahr = 0,	Cels = -17.777778
...
```

---

### Refaktorált, függvényes verzió

```c
/*
 *  OK
 *  Convert Fahrenheit to Celsius
 *  between -100F and +400F  by 100F  
 */
#include <stdio.h>
double fahr2cels(double f)
{
    return 5./9. * (f-32);
}
int main()
{
    int fahr;

    for ( fahr = -100; fahr <= 400; fahr += 100 )
    {
        printf("Fahr = %4d,\tCels = %7.2f\n", fahr, fahr2cels(fahr));
    }
    return 0;
}
```

---

### Mágikus konstansok kiemelése: `#define`

```c
/*
 *  OK, with #define
 */
#include <stdio.h>
#define LOWER -100
#define UPPER  400
#define STEP   100
double fahr2cels(double f)
{
    return 5./9. * (f-32);
}
int main()
{
    int fahr;

    for ( fahr = LOWER; fahr <= UPPER; fahr += STEP )
    {
        printf("Fahr = %4d,\tCels = %7.2f\n", fahr, fahr2cels(fahr));
    }
    return 0;
}
```

---

### Konstansok `const`-tal

```c
/*
 *  OK, with const
 */
#include <stdio.h>
const int lower = -100;
const int upper =  400;
const int step  =  100;
double fahr2cels(double f)
{
    return 5./9. * (f-32);
}
int main()
{
    int fahr;

    for ( fahr = lower; fahr <= upper; fahr += step )
    {
        printf("Fahr = %4d,\tCels = %7.2f\n", fahr, fahr2cels(fahr));
    }
    return 0;
}
```

---

# A C programok szerkezete

A C programokat különálló fordítási egységekben (translational unit, TU), azaz forrásfájlokban írjuk meg (`.c` kiterjesztés).

A forrásfájlokba háromféle dolgot írhatunk:

1. **Előfordító utasítások** (preprocessor directive)
2. **Kommentek** (comment)
3. **C nyelvi tokenek** (token)

Példa:

```c
/*
 * my first C program    <--- comment 
 *
 */
#include <stdio.h>   // preprocessor directive

int main()           // int: type name (keyword), main: function name (identifier)
{                    // { block begin (separator)
    printf("Hello world"); // printf: function name, "Hello world": string literal
    return 0;          // return: keyword, 0: int literal
}                    // } block end (separator)
```

---

## Preprocesszor utasítások

Az előfordító (preprocessor) a C/C++ fordítás első lépése. Feladatai:

- Header fájlok betöltése
- Makrók kifejtése
- Feltételes fordítás
- Sorok kezelése

Példa:

```c
#include <stdio.h>
#include "filename2"
#include "../relative/filename3.h"
```

Keresési útvonal bővítése:

```sh
$ gcc -I/usr/local/include/add/path1 -I/usr/local/include/add/path2 ...
```

---

### Makró definíciók

- **Változószerű makró:** nincs paramétere
- **Függvényszerű makró:** van paramétere

```c
#define BUFSIZE    1024
#define PI         3.14159
#define USAGE_MSG  "Usage: command -flags args..."
#define LONG_MACRO struct MyType \
                                     { int data; };
#define FAHR2CELS(x)  ((5./9.)*(x-32))
#define MAX(a,b)  ((a) > (b) ? (a) : (b))
```

Használat:

```c
char buffer[BUFSIZE];
fgets(buffer, BUFSIZE, stdin);
c = FAHR2CELS(f);
x = MAX(x, -x);
x = MAX(++y, z);
```

---

### Feltételes fordítás

Bizonyos kódrészletek fordítását ki- vagy bekapcsolhatjuk:

```c
#if DEBUG_LEVEL > 2
    fprintf("program was in file %s, line %d\n", __FILE__, __LINE__);
#endif

#ifdef __unix__
#  include <unistd.h>
#elif defined _WIN32
#  include <windows.h>
#endif

#if !(defined(__unix__) || defined(_WIN32))
    /* ... */
#else
    /* ... */
#endif

#if RUBY_VERSION == 190
# error 1.9.0 not supported
#endif
```

**Header guard:**

```c
#ifndef MYHEADER_H
#define MYHEADER_H
/* header content */
#endif /* MYHEADER_H */
```

---

### Standard makrók

- `__FILE__`
- `__LINE__`
- `__DATE__`
- `__TIME__`
- `__STDC__`
- `__STDC_VERSION__`
- `__cplusplus`

```c
#line 1000 "myfile.c"
fprintf("program was in file %s, line %d\n", __FILE__, __LINE__);
```

---

### String műveletek

**Stringesítés:**

```c
#define str(s) #s
#define BUFSIZE 1024
str(\n)       // -->   "\n"
str(BUFSIZE)  // -->   1024
```

**String konkatenáció:**

```c
#define DECLARE_ARRAY(NAME, TYPE, SIZE) \
typedef struct TYPE##_##SIZE##_array    \
{ TYPE v[SIZE]; } NAME##_t;

DECLARE_ARRAY(yours, float, 10);
yours_t x, y;
```

---

### Egyéb: `#pragma`

A `#pragma` utasítás fordítófüggő akciókat definiálhat.  
A `#pragma once` nem szabványos, de gyakran használják header guard helyett.

---

## Kommentek

A kommentek nem kerülnek a fordító által felhasználásra, de segítik a program megértését.

- **C komment:** `/* ... */` (többsoros, nem ágyazható)
- **C99-től:** `// ...` (egysoros)

Példák:

```c
/* multi
     line    
     comments  // hiding single line comments
*/
/*************************************\
*                                     *
*  exist in various style and format  *
*                                     *
\*************************************/
```

**Figyelem:** Stringeken belül nem használhatunk kommenteket.

---

## C tokenek

A C forrásfájl a kommenteken és előfordító utasításokon túl **C nyelvi tokeneket** tartalmaz.  
A token tovább nem bontható elemi nyelvi egység.

Token típusok:

- **Kulcsszavak** (keyword)
- **Azonosítók** (identifier)
- **Konstansok/literálok** (literal)
- **Operátorok** (operator)
- **Szeparátorok** (separators)

---

### Kulcsszavak

A programozási nyelv beépített szavai (pl. `if`, `while`, `int`, `double`, `extern`, `typedef`).

- **C89:** 32
- **C99:** +5
- **C11:** +7

---

### Azonosítók

- Betűvel kezdődnek (az `_` is betűnek számít)
- Betűkkel és számokkal folytatódhatnak
- Fordító csak az első 63/31 betűt veszi figyelembe
- Kulcsszavakat tilos használni
- Kis- és nagybetűk különböznek

**Névkonvenciók:**

- `camelCaseNotation`
- `CTypenamesStartsWithUppercase`
- `under_score_notation`
- Makrók: `MACRO_NEVEK_MINDIG_CSUPA_NAGYBETUSOK`
- [Hungarian Notation](https://en.wikipedia.org/wiki/Hungarian_notation)

---

### Konstansok/Literálok

**Egész számok:**

| Megnevezés           | Példa   | Típus             | Értéke |
|----------------------|---------|-------------------|--------|
| decimális egész      | 25      | int               | 25     |
| oktális egész        | 031     | int               | 25     |
| hexadecimális egész  | 0x19    | int               | 25     |
| hosszú egész         | 12L     | long int          | 12     |
| C99 hosszabb egész   | 12LL    | long long int     | 12     |
| előjel nélküli egész | 12u     | unsigned int      | 12     |

A C nyelv a típusok méretét nem definiálja, csak a minimumot adja meg.  
A méreteket a `sizeof` operátorral lehet lekérdezni.

```c
sizeof(short) <= sizeof(int) <= sizeof(long) <= sizeof(long long)
```

---

### Karakterek

- `'a'` egyszerű karakter
- Escape sorozatok: `'\n'`, `'\t'`, `'\xFF'`, `'\377'`, stb.
- Unicode: `'\U1234'`, `'\U12345678'` (C99 óta)
- Típusok: `char`, `char16_t`, `char32_t`, `wchar_t`

```c
char ch = '\xff';
unsigned char uch = '\xff';
signed char sch = '\xff';
```

---

### Boolean

- **C99:** `_Bool` típus, `stdbool.h`-ban: `bool`, `true`, `false`
- Nulla hamis, minden nem nulla igaz

```c
#include <stdio.h>
int main()
{
    printf("_Bool == %d\t int == %d\n", (_Bool)0.5, (int)0.5 );
    return 0;
}
```

---

### Lebegőpontos számok

A modern számítógépek az **IEEE 754** lebegőpontos ábrázolást használják.

| Típus         | Példa  | IEEE 754      |
|---------------|--------|---------------|
| float         | 3.14f  | egyszeres     |
| double        | 3.14   | dupla         |
| long double   | 3.14l  | kiterjesztett |

```c
sizeof(float) <= sizeof(double) <= sizeof(long double)
```

**Ábrázolás:**

![IEEE 754 Double](https://gsd.web.elte.hu/images/618px-IEEE_754_Double_Floating_Point_Format.svg.png)

---

### Komplex számok

- **C99 óta:** `_Complex` kulcsszó, `<complex.h>`
- Típusok: `float complex`, `double complex`, `long double complex`

Példa:

```c
#include <complex.h>
#include <stdio.h>
int main(void)
{
        double complex z = 1 + 2*I;
        z = 1/z;
        printf("1/(1.0+2.0i) = %.1f%+.1fi\n", creal(z), cimag(z));
}
```

Fordítás:

```sh
$ gcc -ansi -pedantic -Wall -W complex.c -lm
$ ./a.out
1/(1.0+2.0i) = 0.2-0.4i
```

---

### String literálok

- A C-ben a stringek karaktertömbök, lezáró NUL karakterrel (`'\0'`)
- A string literálok immutábilisak
- Tömb vagy pointer inicializálására használhatók

Példa:

```c
char t1[] = {'H','e','l','l','o','\0'}; // sizeof(t1) == 6
char t2[] = "Hello";                    // sizeof(t2) == 6
t1[1] = 'a';         // módosítható
t2[1] = 'o';         // módosítható
char *p = "Hello";   // pointer
char *q = "Hello";   // q ugyanoda mutathat, mint p
char *s = "lo";      // s mutathat p[3]-ra
p[1] = 'a';          // undefined behavior
char *r = "Hi" " " "world"; // ugyanaz, mint "Hi world"
```

---

### void

- A `void` típus az üreshalmaznak felel meg, nem lehet értéket létrehozni vele
- Visszatérő érték nélküli függvények deklarációjához, paraméter nélküli függvényekhez
- Létezik `void *` típusú pointer (általános, típustalan mutató)


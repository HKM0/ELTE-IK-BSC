# Operátorok, kifejezések, utasítások

## forrás: 
Az egész markdown fájl tartalma egy átirat itt a forrás: [Dr. Porkoláb Zoltán oldala](https://gsd.web.elte.hu/lectures/imper/imper-lecture-4/)

## Kifejezések

A legelső magas szintű programozási nyelvek, mint például a Fortran, egyik fő célja az volt, hogy a programokban matematikai kifejezéseket használhassunk. A kifejezések változókból (memóriaterületeket azonosítanak) és operátorokból (matematikai műveleti jelek) állnak. Általában a programozási nyelvekben kifejezéseket operátorokból, konstans értékekből vagy változókból alkotunk.

Például az alábbi kifejezés sok nyelvben érvényes:

```
A + B * C
```

A kifejezésekben fontos a műveletek sorrendje, amit az operátorok **precedenciája** (erőssége) határoz meg. A szorzás magasabb precedenciájú, mint az összeadás, ezért a fenti kifejezés így értelmezendő:

```
A + (B * C)
```

Ha ettől eltérő viselkedést szeretnénk, zárójelezéssel jelezhetjük. Fontos, hogy a programozási nyelvekben a kifejezések nem mindig viselkednek pontosan úgy, mint a matematikai képletek: lehetnek **mellékhatásaik** (side effect), azaz kiértékelésük közben egyéb akciókat is végrehajthatnak.

A funkcionális programozási nyelvekben ezek a mellékhatások hiányoznak, ezért ott a függvények inkább matematikai értelemben "tiszta" (pure) jellegűek.

A FORTRAN77-ben az azonos precedenciájú műveletek sorrendje nem volt meghatározott. Például:

```
A * B / C * D
```

Ez többféleképpen is értelmezhető volt:

- ((A * B) / C) * D
- (A * B * D) / C
- (A / C) * B * D

Ez egész számok esetén eltérő eredményeket adhatott. A modern nyelvekben a kifejezések értelmét az **operátor-precedencia** és az **asszociativitás** határozza meg. Az asszociativitás azt mondja meg, hogy azonos precedenciájú operátorok esetén balról-jobbra vagy jobbról-balra kell-e zárójelezni.

A kifejezéseknek típusa és értéke van. Statikus típusrendszerű nyelvekben (pl. C, Java, C#) a típus fordítási időben ismert, az érték általában futási időben derül ki. Ha az érték fordítási időben ismert, azt **konstans kifejezésnek** (constant expression) nevezzük.

---

## A C nyelv operátorai

A C nyelv sok operátort kínál, köztük olyanokat is, amelyek más nyelvekben utasítások vagy függvények.

| Precedencia | Operátor | Leírás | Asszociativitás |
|-------------|----------|--------|-----------------|
| Posztfix    | `++`     | posztfix növelés | L→R |
|             | `--`     | posztfix csökkentés |     |
|             | `()`     | függvényhívás |     |
|             | `[]`     | tömb index |     |
|             | `.`      | struct/union tag elérés |     |
|             | `->`     | tag elérés mutatóval |     |
|             | `(type){list}` | összetett literál (C99) |     |
| Unáris      | `++`     | prefix növelés | R→L |
|             | `--`     | prefix csökkentés |     |
|             | `+`      | pozitív előjel |     |
|             | `-`      | negatív előjel |     |
|             | `!`      | logikai negáció |     |
|             | `~`      | bitenkénti negáció |     |
|             | `(type)` | típus konverzió |     |
|             | `*`      | pointer indiekció |     |
|             | `&`      | címoperátor |     |
|             | `sizeof` | típus/objektum mérete |     |
|             | `_Alignof` | igazítási követelmény (C11) |     |
| Multiplikatív | `* / %` | szorzás, osztás, maradék | L→R |
| Additív     | `+ -`    | összeadás, kivonás | L→R |
| Léptetés    | `<< >>`  | bitenkénti bal/jobb léptetés | L→R |
| Relációs    | `< <= > >=` | relációs műveletek | L→R |
| Egyenlőség  | `== !=`  | egyenlő, nem egyenlő | L→R |
| Bitenkénti  | `&`      | bitenkénti ÉS (AND) | L→R |
|             | `^`      | bitenkénti kizáró vagy (XOR) | L→R |
|             | `|`      | bitenkénti vagy (OR) | L→R |
| Logikai     | `&&`     | logikai ÉS (AND) | L→R |
|             | `||`     | logikai VAGY (OR) | L→R |
| Terciális   | `? :`    | feltételes kifejezés | R→L |
| Értékadás   | `=`      | értékadás | R→L |
|             | `+= -=`  | összetett értékadások |     |
|             | `*= /= %=` |     |     |
|             | `<<= >>=` |     |     |
|             | `&= |= ^=` |     |     |
| Szekvencia  | `,`      | vessző (szekvencia) operátor | L→R |

---

### Megjegyzések

#### Nem kiértékelt operátorok

Néhány operátor ún. **nem kiértékelt** (unevaluated), azaz futási időben nem történik velük semmi, csak fordítási időben szolgáltatnak információt. Ilyen például a `sizeof`:

```c
size_t int_size = sizeof(printf("%d", 42));
```

Ez nem ír ki semmit, de `int_size` értéke például 4 lesz (ha az `int` 4 bájtos).

#### Bináris vagy/és precedenciája

A bitenkénti ÉS/VAGY operátorok precedenciája alacsonyabb, mint a relációs operátoroké, ezért érdemes zárójelezni:

```c
if ( (flag & 0xff) == 0 )
```

#### Értékadás vs. egyenlőségvizsgálat

Az értékadás (`=`) és az egyenlőségvizsgálat (`==`) könnyen összekeverhető:

```c
if ( x = 0 ) // értékadás, nem összehasonlítás!
```

Javasolt a konstans balra írása ("Yoda conditions"):

```c
if ( 0 == x )
```

#### Értékadás operátor és másolás szemantikája

C-ben az értékadásnak van eredménye, így kifejezésként is használható:

```c
int a, b;
a = 3 + (b = 5); // a = 8, b = 5
```

Több változónak is adhatunk értéket egy sorban:

```c
double a, c;
int b;
a = b = c = 3.14; // c = 3.14, b = 3, a = 3.0
```

Struktúrák esetén tagonkénti értékadás történik:

```c
#include <stdio.h>

struct X {
    int i;
    double d;
    int *ptr;
};

void f() {
    int zz = 1;
    struct X aa, bb;
    aa.i = 1;
    aa.d = 3.14;
    aa.ptr = &zz;
    bb = aa;
    ++*aa.ptr;
}
```

Ilyenkor a pointer tagok ugyanarra a memóriára mutatnak.

Objektum-orientált nyelvekben gyakran szükséges a mutatott terület másolása is (pl. C++ másoló konstruktor, Java `clone` metódus).

---

## Konverziók

A kifejezések kiértékelésekor gyakran történik típuskonverzió:

- Értékadás, változó inicializálás, paraméterátadás, `return` utasításkor.
- Aritmetikai konverziók: `char → short → int → long → long long`, előjeles → előjelnélküli, egész → lebegőpontos.
- Tömb → első elemre mutató pointer.

A részletek a C szabványban és szakkönyvekben találhatók.

---

## Kifejezések kiértékelése

A precedencia és asszociativitás meghatározza a kifejezések értelmét, de a kiértékelés sorrendje bizonyos esetekben nem meghatározott.

Példa:

```c
#include <stdio.h>
int main() {
    int i = 1;
    printf("i = %d, ++i = %d\n", i, ++i);
    return 0;
}
```

Ez **nemdefiniált viselkedésű** (undefined behavior), mert `i` és `++i` ugyanazt a memóriát érik el, és egyikük módosítja is azt.

A **szekvencia pont** (sequence point) garantálja, hogy az előző kiértékelések befejeződnek, mielőtt a következő elkezdődne. Szekvencia pont például az utasítás vége, a logikai rövidzáras operátorok (`&&`, `||`), a feltételes operátor (`? :`), a vessző operátor (`,`).

Függvényhívásnál a paraméterek kiértékelésének sorrendje nem meghatározott.

Példa:

```c
#include <stdio.h>
int f() { printf("f\n"); return 2; }
int g() { printf("g\n"); return 1; }
int h() { printf("h\n"); return 0; }
void func() {
    printf("(f() == g() == h()) == %d", f() == g() == h());
}
int main() {
    func();
    return 0;
}
```

A függvényhívások sorrendje fordítótól függhet.

---

## Hibás és helyes példák

**Hibás:**

```c
#include <stdio.h>
int main() {
    int t[10];
    int i = 0;
    while (i < 10) {
        t[i] = i++;
    }
    for (i = 0; i < 10; ++i) {
        printf("%d ", t[i]);
    }
    return 0;
}
```

Ez nemdefiniált viselkedésű, mert `i`-t egyszerre olvassuk és módosítjuk.

**Helyes:**

```c
#include <stdio.h>
int main() {
    int t[10];
    int i = 0;
    while (i < 10) {
        t[i] = i;
        ++i;
    }
    for (i = 0; i < 10; ++i) {
        printf("%d ", t[i]);
    }
    return 0;
}
```

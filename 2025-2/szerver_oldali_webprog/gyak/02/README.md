# Laravel Projekt Telepítési Útmutató

## 1. Laravel Telepítése és Projekt Létrehozása

### Laravel Installer telepítése globálisan
```bash
composer global require laravel/installer
```

### Új Laravel projekt létrehozása
```bash
laravel new myblog
```

**Beállítások kérdések során:**
- **Testing framework:** `none`
- **Testing framework:** `Pest` 
- **Git initialization:** `no`
- **Database:** `sqlite`
- **Migrate database:** `yes`

### Projekt könyvtárba lépés
```bash
cd myblog
```

### Development szerver indítása
```bash
composer run dev
```

---

## 2. Laravel Breeze Telepítése (Autentifikáció)

### Breeze csomag telepítése
```bash
composer require laravel/breeze
```

### Breeze beállítása
```bash
php artisan breeze:install
```

**Beállítások kérdések során:**
- **Frontend stack:** `blade`
- **Dark mode:** `no`
- **Testing framework:** `0` (Pest)

---

## 3. Modellek és Migrációk Létrehozása

### Post model létrehozása migrációval
```bash
php artisan make:model Post --migration
```

**Parancs kimenet:**
```
  What should the model be named?
❯ Post

  Would you like any of the following? [None]
❯ None 

  Database Seeder ......................................................................................... seed  
  Factory ................................................................................................. factory  
  Form Requests ........................................................................................... requests  
  Migration ............................................................................................... migration  
  Policy .................................................................................................. policy  
  Resource Controller ..................................................................................... resource  
❯ migration 

   INFO  Model [app\Models\Post.php] created successfully.   
   INFO  Migration [database\migrations\2026_02_18_140743_create_posts_table.php] created successfully.
```

### Category model létrehozása
```bash
php artisan make:model Category --migration
```

### Pivot tábla létrehozása (category_post)
```bash
php artisan make:migration create_category_post_table
```

**Parancs kimenet:**
```
  What should the migration be named?
❯ create_category_post_table

   INFO  Migration [database\migrations\2026_02_18_141955_create_category_post_table.php] created successfully.
```

---

## 4. Migrációk Futtatása

### Migrációk futtatása
```bash
php artisan migrate
```

**Kimenet:**
```
   INFO  Running migrations.

  2026_02_18_140743_create_posts_table ................................................................... 16.07ms DONE
  2026_02_18_141218_create_categories_table ............................................................... 6.80ms DONE
  2026_02_18_141955_create_category_post_table ........................................................... 21.60ms DONE
```

### Migrációk állapotának ellenőrzése
```bash
php artisan migrate:status
```

**Kimenet:**
```
  Migration name ...................................................................................... Batch / Status  
  0001_01_01_000000_create_users_table ....................................................................[1] Ran  
  0001_01_01_000001_create_cache_table ....................................................................[1] Ran  
  0001_01_01_000002_create_jobs_table .....................................................................[1] Ran  
  2026_02_18_140743_create_posts_table ....................................................................[2] Ran  
  2026_02_18_141218_create_categories_table ...............................................................[2] Ran  
  2026_02_18_141955_create_category_post_table ............................................................[2] Ran  
```

### Pending migrációk esetén
Ha vannak pending migrációk, használhatók az alábbi parancsok:
```bash
php artisan migrate:fresh
php artisan migrate
```
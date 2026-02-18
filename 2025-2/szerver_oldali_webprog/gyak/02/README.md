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

 
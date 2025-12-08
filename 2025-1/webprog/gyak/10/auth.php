<?php
/*Ez az osztály egy session-alapú biztonságos felhasználókezelő rendszer.
felhasználókezelő (Auth) osztályt tartalmaz, amely a következő feladatokat végzi:
- regisztráció (jelszót hash-eli)
- bejelentkezés (ellenőrzi username + password)
- session alapú beléptetés: a session_start az index tetején van
- kijelentkezés
- jogosultságkezelés (roles)
- lekérdezi, hogy van-e bejelentkezett user*/
class Auth
{
   // Az Auth osztály úgy tudja használni a Storage osztály metódusait, hogy konstruktorban függőséginjektálással kap egy IStorage típusú objektumot (UserStorage), amely örökli a Storage osztály implementációját, így elérhetőek a metódusok.
    //Storage objektum, amely egy IStorage interfészt implementáló osztály példánya lesz, amely a felhasználókat egy fájlban tárolja ( users.json)
    private $user_storage;
    //az aktuálisan bejelentkezett felhasználó, vagy NULL, ha nincs bejelentkezett user
    private $user = NULL;

    public function __construct(IStorage $user_storage)

    {
        //Ha beérkezik egy Storage objektum, azt elmenti az osztályban.
        $this->user_storage = $user_storage;
        //A PHP session-ben tárolt user alapján eldönti, hogy valaki be van-e jelentkezve. Ha van sessionben user kulcs, akkor betölti a bejelentkezett felhasználót.
        if (isset($_SESSION["user"])) {
            $this->user = $_SESSION["user"];
        }
    }

    public function register($data)
    {
        $user = [
            'username'  => $data['username'],
            'password'  => password_hash($data['password'], PASSWORD_DEFAULT),
            'fullname'  => $data['fullname'],
            "roles"     => ["user"],
        ];
        return $this->user_storage->add($user);
    }
    //foglalt már  a user név? findOne egy usert vagy NULL-t ad vissza
    public function user_exists($username)
    {
        $user = $this->user_storage->findOne(['username' => $username]);
        return !is_null($user);
    }
    //Bejelentkezés: ellenőrzi a username és password párost
    public function authenticate($username, $password)
    {
        // Felhasználó keresése a username alapján
        $user = $this->user_storage->findOne(['username' => $username]);
        // Ha nincs ilyen user vagy a jelszó hibás → NULL
        if (!$user || !password_verify($password, $user['password'])) {
            return NULL;
        }
        // Minden rendben → visszaadjuk a usert
        return $user;
    }
    //Be vagyunk-e jelentkezve? True vagy false
    public function is_authenticated()
    {
        return !is_null($this->user);
    }
    //Jogosultságellenőrzés: ha nincs user: false, ha be van lépve és van bármelyik elvárt role: true, különben false
    public function authorize($roles = []): bool
{
    // Ha nincs bejelentkezett felhasználó → NEM engedélyezett
    if (!$this->is_authenticated()) {
        return false;
    }

    // Ha nem adtak meg szerepkört, akkor elég hogy be van jelentkezve
    if (empty($roles)) {
        return true;
    }

    // Ellenőrizzük, hogy van-e egyezés
    $user = $this->authenticated_user();

    // Biztonság kedvéért: ha nincs roles mező → hibát megelőzve kezeljük
    if (!isset($user['roles']) || !is_array($user['roles'])) {
        return false;
    }

    // Legalább egy szerepkör egyezzen
    return count(array_intersect($roles, $user['roles'])) > 0;
}
    public function login($user)
    {
        $this->user = $user;
        $_SESSION["user"] = $user;
    }

    public function logout()
    {
        $this->user = NULL;
        unset($_SESSION["user"]);
    }

    public function authenticated_user()
    {
        return $this->user;
    }
}

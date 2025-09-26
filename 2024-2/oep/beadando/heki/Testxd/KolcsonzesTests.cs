using KonyvtarBeadando;

namespace Testxd
{
    [TestClass]
    public class KolcsonzesTests
    {
        [TestMethod]
        public void Kolcsonzes_Hozzaadas_Sikeres()
        {
            var konyvtar = new Konyvtar();
            var tag = new Tag("Teszt Elek", "Debrecen", "6789", konyvtar);
            var konyv = new Termeszettudomanyi("Biológia", "Kovács", "OFI", "9876", Keves.Instance);

            var kolcsonzes = new Kolcsonzes(DateTime.Today, DateTime.Today.AddDays(14), konyv, tag);

            Assert.AreEqual(1, kolcsonzes.kolcsonKonyvek.Count);
        }

        [TestMethod]
        public void Kolcsonzes_Keses_Szamit()
        {
            var konyvtar = new Konyvtar();
            var tag = new Tag("Teszt Elek", "Debrecen", "6789", konyvtar);
            var konyv = new Termeszettudomanyi("Biológia", "Kovács", "OFI", "9876", Keves.Instance);

            var kolcsonzes = new Kolcsonzes(DateTime.Today, DateTime.Today.AddDays(7), konyv, tag);
            int dij = kolcsonzes.KesesiDijSzamolasa(DateTime.Today.AddDays(7), DateTime.Today.AddDays(10));

            Assert.AreEqual(3, dij);
        }

        [TestMethod]
        public void KonyvHozzaadas_UjKonyvSikeresen()
        {
            var konyvtar = new Konyvtar();
            var tag = new Tag("Teszt Béla", "Szeged", "1122", konyvtar);
            var elso = new Termeszettudomanyi("Matematika", "Dr. Kovács", "Nemzeti", "0001", Sok.Instance);
            var masodik = new Szepirodalmi("Irodalom", "Nagy Ágnes", "KisKiadó", "0002", Keves.Instance);

            var kolcsonzes = new Kolcsonzes(DateTime.Today, DateTime.Today.AddDays(14), elso, tag);

            kolcsonzes.KonyvHozzaadas(masodik);

            Assert.AreEqual(2, kolcsonzes.kolcsonKonyvek.Count);
        }

        [TestMethod]
        [ExpectedException(typeof(Exception), "Null eretket adtal meg.")]
        public void KonyvHozzaadas_NullKonyvDobKivetelt()
        {
            var konyvtar = new Konyvtar();
            var tag = new Tag("Teszt Béla", "Szeged", "1122", konyvtar);
            var elso = new Termeszettudomanyi("Matematika", "Dr. Kovács", "Nemzeti", "0001", Sok.Instance);

            var kolcsonzes = new Kolcsonzes(DateTime.Today, DateTime.Today.AddDays(14), elso, tag);

            kolcsonzes.KonyvHozzaadas(null);
        }

        [TestMethod]
        public void KonyvVisszahozas_Sikeres()
        {
            var konyvtar = new Konyvtar();
            var tag = new Tag("Teszt Katalin", "Budapest", "3344", konyvtar);
            var konyv = new Termeszettudomanyi("Fizika", "Dr. Fény", "OFI", "1122", Ritka.Instance);

            var kolcsonzes = new Kolcsonzes(DateTime.Today, DateTime.Today.AddDays(10), konyv, tag);

            int dij = kolcsonzes.KonyvVisszahozas(konyv, tag);

            Assert.AreEqual(konyv.kesesdij, dij);
            Assert.AreEqual(0, kolcsonzes.kolcsonKonyvek.Count);
        }

        [TestMethod]
        [ExpectedException(typeof(Exception), "Nincs \"Történelem\" cimu konyv kikolcsonozve.")]
        public void KonyvVisszahozas_NincsKonyvDobKivetelt()
        {
            var konyvtar = new Konyvtar();
            var tag = new Tag("Teszt János", "Győr", "5566", konyvtar);
            var elso = new Termeszettudomanyi("Földrajz", "Dr. Térkép", "OFI", "9988", Keves.Instance);
            var masik = new Termeszettudomanyi("Történelem", "Dr. Idő", "OFI", "7766", Ritka.Instance);

            var kolcsonzes = new Kolcsonzes(DateTime.Today, DateTime.Today.AddDays(5), elso, tag);

            kolcsonzes.KonyvVisszahozas(masik, tag);
        }

        [TestMethod]
        [ExpectedException(typeof(Exception), "Null eretket adtal meg.")]
        public void KonyvVisszahozas_NullKonyvDobKivetelt()
        {
            var konyvtar = new Konyvtar();
            var tag = new Tag("Teszt Zsolt", "Pécs", "7788", konyvtar);
            var elso = new Szepirodalmi("Zene", "Mozart", "Kotta", "5566", Keves.Instance);

            var kolcsonzes = new Kolcsonzes(DateTime.Today, DateTime.Today.AddDays(3), elso, tag);

            kolcsonzes.KonyvVisszahozas(null, tag);
        }

        [TestMethod]
        public void Kolcsonzes_TobbKonyv_KonstruktorTeszt()
        {
            var konyvtar = new Konyvtar();
            var tag = new Tag("Teszt Dóra", "Veszprém", "1010", konyvtar);
            var k1 = new Szepirodalmi("Regény1", "Szerző1", "Kiadó1", "1111", Keves.Instance);
            var k2 = new Szepirodalmi("Regény2", "Szerző2", "Kiadó2", "2222", Sok.Instance);

            var lista = new List<Konyv> { k1, k2 };

            var kolcsonzes = new Kolcsonzes(DateTime.Today, DateTime.Today.AddDays(10), lista, tag);

            Assert.AreEqual(2, kolcsonzes.kolcsonKonyvek.Count);
        }
    }
}

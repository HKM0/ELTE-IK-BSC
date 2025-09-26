using KonyvtarBeadando;

namespace Testxd
{
    [TestClass]
    public class TagTestsKiegeszitve
    {
        private Konyvtar konyvtar;
        private Tag tag;

        [TestInitialize]
        public void Setup()
        {
            konyvtar = new Konyvtar();
            tag = new Tag("Teszt Elek", "Debrecen", "ID123", konyvtar);
            konyvtar.TagRegisztral(tag);
        }

        [TestMethod]
        public void VanKesese_Hamis_HaNincsTartozas()
        {
            Assert.IsFalse(tag.vanKesese());
        }

        [TestMethod]
        public void Tartozas_SzamitKesesDijat()
        {
            var konyv = new Termeszettudomanyi("Kémia", "Szerző", "Kiadó", "1122", Sok.Instance);
            var kolcsonzes = new Kolcsonzes(DateTime.Now.AddDays(-10), DateTime.Now.AddDays(-7), konyv, tag);
            tag.Kolcsonzesek.Add(kolcsonzes);

            int elvart = konyv.kesesdij * 7; 
            Assert.AreEqual(elvart, tag.tartozas());
        }

        [TestMethod]
        public void DijFizetes_Sikeres()
        {
            tag.tartozik = 100;
            tag.dijFizet(50);
            Assert.AreEqual(50, tag.tartozik);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void DijFizetes_NegativErtek_DobKivetelt()
        {
            tag.dijFizet(-10);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void DijFizetes_TobbMintTartozas_DobKivetelt()
        {
            tag.tartozik = 20;
            tag.dijFizet(50);
        }

        [TestMethod]
        public void KonyvKolcsonzes_EgyKonyv_Sikeres()
        {
            var konyv = new Termeszettudomanyi("Biológia", "Kovács", "OFI", "9876", Keves.Instance);
            konyvtar.KonyvHozzaad(konyv);

            tag.KonyvKolcsonzese(konyv);

            Assert.AreEqual(1, tag.Kolcsonzesek.Count);
            Assert.AreEqual(konyv, tag.Kolcsonzesek[0].kolcsonKonyvek[0]);
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void KonyvKolcsonzes_TobbMint5_DobKivetelt()
        {
            var konyvek = new List<Konyv>();
            for (int i = 0; i < 6; i++)
            {
                var k = new Termeszettudomanyi($"K{i}", "Szerző", "Kiadó", $"ISBN{i}", Keves.Instance);
                konyvtar.KonyvHozzaad(k);
                tag.KonyvKolcsonzese(k);
            }
        }

        [TestMethod]
        public void KonyvVisszahozas_Sikeres()
        {
            var konyv = new Termeszettudomanyi("Fizika", "Kovács", "OFI", "1234", Keves.Instance);
            konyvtar.KonyvHozzaad(konyv);
            tag.KonyvKolcsonzese(konyv);

            tag.konyvVisszahozas(konyv);

            Assert.IsTrue(tag.Kolcsonzesek[0].kolcsonKonyvek.Count == 0);
        }

        [TestMethod]
        public void Kilepes_SikeresEltavolitas()
        {
            tag.Kilepes();
            Assert.IsFalse(konyvtar.tagok.Contains(tag));
        }
    }
}

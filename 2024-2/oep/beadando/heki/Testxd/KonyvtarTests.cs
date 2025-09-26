using KonyvtarBeadando;

namespace Testxd
{
    [TestClass]
    public class KonyvtarTests
    {
        [TestMethod]
        public void Konyvtar_KonyvHozzaadas_Sikeres()
        {
            var konyvtar = new Konyvtar();
            var konyv = new Ifjusagi("Harry Potter", "J.K. Rowling", "Animus", "1111", Keves.Instance);

            konyvtar.KonyvHozzaad(konyv);

            Assert.AreEqual(1, konyvtar.konyvek.Count);
        }

        [TestMethod]
        public void Konyvtar_TagRegisztralas_Sikeres()
        {
            var konyvtar = new Konyvtar();
            var tag = new Tag("Teszt Elek", "Debrecen", "6789", konyvtar);

            konyvtar.TagRegisztral(tag);

            Assert.AreEqual(1, konyvtar.tagok.Count);
        }

        [TestMethod]
        [ExpectedException(typeof(Exception), "Ne null erteket adj a konyvnek!")]
        public void KonyvHozzaadas_NullKonyv()
        {
            var konyvtar = new Konyvtar();
            konyvtar.KonyvHozzaad(null);
        }

        [TestMethod]
        public void TagKileptetes_Sikeres()
        {
            var konyvtar = new Konyvtar();
            var tag = new Tag("Tag Elek", "Cím", "9999", konyvtar);
            konyvtar.TagRegisztral(tag);

            konyvtar.TagKileptet(tag);

            Assert.AreEqual(0, konyvtar.tagok.Count);
        }

        [TestMethod]
        [ExpectedException(typeof(Exception), "A tag mar regisztralva van.")]
        public void TagRegisztral_Duplikalt()
        {
            var konyvtar = new Konyvtar();
            var tag = new Tag("Tag Elek", "Cím", "9999", konyvtar);
            konyvtar.TagRegisztral(tag);
            konyvtar.TagRegisztral(tag);
        }

        [TestMethod]
        public void KonyvElerheto_VanSzabadKonyv()
        {
            var konyvtar = new Konyvtar();
            var konyv = new Termeszettudomanyi("Biológia", "Szerző", "Kiadó", "123", Sok.Instance);
            konyvtar.KonyvHozzaad(konyv);

            bool elerheto = konyvtar.KonyvElerheto("Biológia");

            Assert.IsTrue(elerheto);
        }

        [TestMethod]
        public void TagE_Letezik()
        {
            var konyvtar = new Konyvtar();
            var tag = new Tag("Valaki", "Cím", "0000", konyvtar);
            konyvtar.TagRegisztral(tag);

            bool eredmeny = konyvtar.TagE("Valaki");

            Assert.IsTrue(eredmeny);
        }

        [TestMethod]
        public void TagE_NemLetezik()
        {
            var konyvtar = new Konyvtar();
            bool eredmeny = konyvtar.TagE("Senki");

            Assert.IsFalse(eredmeny);
        }

        [TestMethod]
        [ExpectedException(typeof(Exception), "Nincs ilyen tag ragisztralva.")]
        public void TagKileptet_NemLetezik()
        {
            var konyvtar = new Konyvtar();
            var tag = new Tag("Ismeretlen", "Cím", "0001", konyvtar);

            konyvtar.TagKileptet(tag);
        }

        [TestMethod]
        [ExpectedException(typeof(Exception), "Valodi nevet adj meg!")]
        public void TagE_UresNev()
        {
            var konyvtar = new Konyvtar();
            konyvtar.TagE("");
        }
    }
}

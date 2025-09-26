using KonyvtarBeadando;

namespace Testxd
{
    [TestClass]
    public class KonyvTests
    {
        [TestMethod]
        public void Konyv_Letrehozas_Sikeres()
        {
            var ritkasag = Sok.Instance;
            var konyv = new Szepirodalmi("Egri csillagok", "Gárdonyi Géza", "Móra", "1234567890", ritkasag);

            Assert.AreEqual("Egri csillagok", konyv.cim);
            Assert.AreEqual("Gárdonyi Géza", konyv.szerzo);
            Assert.AreEqual("Móra", konyv.kiado);
            Assert.AreEqual("1234567890", konyv.isbn);
            Assert.AreEqual(ritkasag, konyv.ritkasag);
        }

        [TestMethod]
        public void Konyv_Kesesdij_Szepirodalmi_Sok()
        {
            var ritkasag = Sok.Instance;
            var konyv = new Szepirodalmi("Verseskötet", "Valaki", "Kiado", "0001", ritkasag);

            Assert.AreEqual(ritkasag.GetFactor(konyv), konyv.kesesdij);
        }

        [TestMethod]
        public void Konyv_Kesesdij_Termeszettudomanyi_Keves()
        {
            var ritkasag = Keves.Instance;
            var konyv = new Szepirodalmi("Biológia", "Kovács", "OFI", "0002", ritkasag);

            Assert.AreEqual(ritkasag.GetFactor(konyv), konyv.kesesdij);
        }

        [TestMethod]
        public void Konyv_Kesesdij_Ifjusagi_Ritka()
        {
            var ritkasag = Ritka.Instance;
            var konyv = new Szepirodalmi("Harry Potter", "J.K. Rowling", "Animus", "0003", ritkasag);

            Assert.AreEqual(ritkasag.GetFactor(konyv), konyv.kesesdij);
        }
    }
}
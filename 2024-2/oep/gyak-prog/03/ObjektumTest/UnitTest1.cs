using Objuktumok;

namespace ObjektumTest
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            Assert.AreEqual(2, 1 + 1);
        }

        [TestMethod]
        public void TestMethod2()
        {
            Assert.AreEqual(5, 2 * 2);
        }

        [TestMethod]
        public void TestTanul()
        {
            Hallgato h = new Hallgato(130, "Bela");

            h.Tanul();
            Assert.AreEqual(150, h.Iq);

            h.Tanul();
            Assert.AreEqual(170, h.Iq);

            h.Tanul();
            Assert.AreEqual(190, h.Iq);

            h.Tanul();
            Assert.AreEqual(200, h.Iq);

            h.Tanul();
            Assert.AreEqual(200, h.Iq);
        }

        [TestMethod]
        public void TestOkos()
        {
            Hallgato h = new Hallgato(100, "Bela");
            Assert.AreEqual(false, h.Okos);

            h.Iq = 120;
            Assert.AreEqual(true, h.Okos);

            h.Iq = 150;
            Assert.AreEqual(true, h.Okos);
        }

        [TestMethod]
        public void TestJegyAnalizis()
        {
            Hallgato h = new Hallgato(100, "Bela");

            Assert.AreEqual(5, h.Jegy("Analizis"));
        }

        [TestMethod]
        public void TestJegyOEP()
        {
            Hallgato h = new Hallgato(100, "Bela");

            Assert.AreEqual(1, h.Jegy("OEP"));
            h.Iq = 150;
            Assert.AreEqual(2, h.Jegy("OEP"));
        }

        [TestMethod]
        public void TestJegyMas()
        {
            Hallgato h = new Hallgato(130, "Bela");

            Assert.AreEqual(4, h.Jegy("Webprogramozas"));
            h.Iq = 110;
            Assert.AreEqual(2, h.Jegy("Webprogramozas"));
        }
    }
}
using KonyvtarBeadando;

namespace Testxd
{
    [TestClass]
    public class RitkasagTests
    {
        private Termeszettudomanyi a = new Termeszettudomanyi("Cím", "Szerző", "Kiadó", "1234", Sok.Instance);
        private Szepirodalmi b = new Szepirodalmi("Cím", "Szerző", "Kiadó", "2345", Sok.Instance);
        private Ifjusagi c = new Ifjusagi("Cím", "Szerző", "Kiadó", "3456", Sok.Instance);

        private Termeszettudomanyi d = new Termeszettudomanyi("Cím", "Szerző", "Kiadó", "1234", Keves.Instance);
        private Szepirodalmi e = new Szepirodalmi("Cím", "Szerző", "Kiadó", "2345", Sok.Instance);
        private Ifjusagi f = new Ifjusagi("Cím", "Szerző", "Kiadó", "3456", Sok.Instance);

        private Termeszettudomanyi g = new Termeszettudomanyi("Cím", "Szerző", "Kiadó", "1234", Ritka.Instance);
        private Szepirodalmi h = new Szepirodalmi("Cím", "Szerző", "Kiadó", "2345", Ritka.Instance);
        private Ifjusagi i = new Ifjusagi("Cím", "Szerző", "Kiadó", "3456", Ritka.Instance);

        [TestMethod]
        public void Sok_GetFactor_ReturnsCorrectValues()
        {
            var ritkasag = Sok.Instance;
    
            Assert.AreEqual(20, ritkasag.GetFactor(a));
            Assert.AreEqual(10, ritkasag.GetFactor(b));
            Assert.AreEqual(5, ritkasag.GetFactor(c));
        }
    
        [TestMethod]
        public void Keves_GetFactor_ReturnsCorrectValues()
        {
            var keves = Keves.Instance;
    
            Assert.AreEqual(60, keves.GetFactor(d));
            Assert.AreEqual(30, keves.GetFactor(e));
            Assert.AreEqual(10, keves.GetFactor(f));
        }
    
        [TestMethod]
        public void Ritka_GetFactor_ReturnsCorrectValues()
        {
            var ritka = Ritka.Instance;
    
            Assert.AreEqual(100, ritka.GetFactor(g));
            Assert.AreEqual(50, ritka.GetFactor(h));
            Assert.AreEqual(30, ritka.GetFactor(i));
        }
    }
}
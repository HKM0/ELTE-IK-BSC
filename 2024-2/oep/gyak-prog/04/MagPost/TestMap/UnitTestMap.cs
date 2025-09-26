using Map;

namespace TestMap
{
    [TestClass]
    public class UnitTestMap
    {
        [TestMethod]
        public void TestSetEmpty()
        {
            Map.Map map = new();

            map.Insert(new Item(5, ""));
            map.SetEmpty();
            Assert.AreEqual(0, map.Count());

            map.Insert(new Item(4, ""));
            map.Insert(new Item(5, ""));
            map.SetEmpty();
            Assert.AreEqual(0, map.Count());
        }

        [TestMethod]
        public void TestInsert()
        {
            Map.Map map = new();

            map.Insert(new Item(5, "kacsa"));
            Assert.AreEqual(1, map.Count());
            Assert.AreEqual("kacsa", map[5]);

            map.Insert(new Item(2, "halacska"));
            map.Insert(new Item(3, "cica"));

            Assert.AreEqual(5, map.Count());
            Assert.AreEqual("halacska", map[2]);
            Assert.AreEqual("cica", map[3]);
            Assert.AreEqual("kacsa", map[5]);

            Assert.ThrowsException<Map.Map.ExistingKeyException>(
                () => map.Insert(new Item(5, "ponilo")), "Hiba kellett volna!"
            );
        }

        [TestMethod]
        public void TestRemoveY()
        {
            Map.Map map = new();

            bool voltHiba = false;
            try
            {
                map.Remove(0);
            }
            catch (Map.Map.NonExistingKeyException e)
            {
                voltHiba = true;
            }
            Assert.AreEqual(true, voltHiba, "");
            Assert.IsTrue(voltHiba);
            Assert.IsFalse(false);
            Assert.AreNotEqual(false, voltHiba);
            Assert.AreEqual(3.5, 3.4, 0.4);

            Assert.ThrowsException<Map.Map.NonExistingKeyException>(
                () => map.Remove(0)
            );
        }

        [TestMethod]
        [ExpectedException(typeof(Map.Map.NonExistingKeyException))]
        public void TestRemoveX()
        {
            Map.Map map = new();
            map.Remove(0);
        }

        [TestMethod]
        public void TestSelect()
        {
            
        }

        [TestMethod]
        public void TestCount()
        {
            
        }

        [TestMethod]
        public void TestIn()
        {
            
        }
    }
}
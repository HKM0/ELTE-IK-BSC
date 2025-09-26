using Fisher_Contest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FisherContestTest
{
    [TestClass]
    public class FishTest
    {
        [TestMethod]
        public void InstanceTest()
        {
            Assert.AreEqual(Carp.Instance(), Carp.Instance());
            Assert.AreEqual(Bream.Instance(), Bream.Instance());
            Assert.AreEqual(Catfish.Instance(), Catfish.Instance());
        }

        [TestMethod]
        public void MultiplierTest()
        {
            Assert.AreEqual(Carp.Instance().Multiplier(), 2);
            Assert.AreEqual(Bream.Instance().Multiplier(), 1);
            Assert.AreEqual(Catfish.Instance().Multiplier(), 3);
        }
    }
}

using Fisher_Contest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FisherContestTest
{
    [TestClass]
    public class FisherTest
    {
        [TestMethod]
        public void CatchTest()
        {
            Organization org = new Organization();
            Fisher f = new("Hohoho🦢");
            org.Join(f);

            Contest contest = org.Organize("Itt", DateTime.Now);
            contest.SignUp(f);

            f.Catch(DateTime.Parse("3:00"), Carp.Instance(), 3.0, contest);

            Assert.ThrowsException<Fisher.ExistingCatchingException>(() => f.Catch(DateTime.Parse("3:00"), Catfish.Instance(), 1.0, contest));

            Contest contest2 = org.Organize("Itt", DateTime.Now.AddDays(1));
            contest2.SignUp(f);

            f.Catch(DateTime.Parse("3:00"), Carp.Instance(), 3.0, contest2);
        }

        [TestMethod]
        public void TotalValueTest()
        {
            Organization org = new Organization();
            Fisher f = new("Hohoho🦢");
            org.Join(f);

            Contest contest = org.Organize("Itt", DateTime.Now);
            Contest contest2 = org.Organize("Itt", DateTime.Now.AddDays(1));
            contest.SignUp(f);
            contest2.SignUp(f);

            Assert.AreEqual(0, f.TotalValue(contest));
            f.Catch(DateTime.Parse("3:00"), Bream.Instance(), 1.0, contest);
            Assert.AreEqual(1, f.TotalValue(contest));
            f.Catch(DateTime.Parse("4:00"), Catfish.Instance(), 3.0, contest);
            Assert.AreEqual(10, f.TotalValue(contest));

            Assert.AreEqual(0, f.TotalValue(contest2));
            f.Catch(DateTime.Parse("3:00"), Bream.Instance(), 1.0, contest2);
            Assert.AreEqual(1, f.TotalValue(contest2));
            Assert.AreEqual(10, f.TotalValue(contest));

            try
            {
                f.Catch(DateTime.Parse("3:00"), Catfish.Instance(), 1.0, contest);
            }
            catch { }

            Assert.AreEqual(10, f.TotalValue(contest));
        }
    }
}

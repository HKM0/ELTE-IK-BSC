package suites;

import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;

import tests.UpgradeTest;
import structuretests.PurchasableStructureTest;
import structuretests.UpgradeStructureTest;
import structuretests.PurchaseExceptionStructureTest;

@SelectClasses({
	GTA6Part2TestSuite.StructuralTests.class,
	GTA6Part2TestSuite.FunctionalTests.class,
})
@Suite public class GTA6Part2TestSuite {
    @SelectClasses({
    	PurchasableStructureTest.class
      , PurchaseExceptionStructureTest.class
      , UpgradeStructureTest.class
    })
    @Suite public static class StructuralTests {}

    @SelectClasses({
    	UpgradeTest.class
      ,
    })
    @Suite public static class FunctionalTests {}
}
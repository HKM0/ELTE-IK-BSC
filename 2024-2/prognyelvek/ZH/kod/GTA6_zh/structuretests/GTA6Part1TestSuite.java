package suites;

import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;

import tests.GrannyTest;
import structuretests.ItemTypeStructureTest;
import structuretests.GrannyStructureTest;

@SelectClasses({
	GTA6Part1TestSuite.StructuralTests.class,
	GTA6Part1TestSuite.FunctionalTests.class,
})
@Suite public class GTA6Part1TestSuite {
    @SelectClasses({
        ItemTypeStructureTest.class
      , GrannyStructureTest.class
    })
    @Suite public static class StructuralTests {}

    @SelectClasses({
        GrannyTest.class
      ,
    })
    @Suite public static class FunctionalTests {}
}
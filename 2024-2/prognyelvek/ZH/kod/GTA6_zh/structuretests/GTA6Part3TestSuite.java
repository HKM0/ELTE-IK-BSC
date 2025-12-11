package suites;

import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;

import tests.LaboratoryTest;
import structuretests.LaboratoryStructureTest;

@SelectClasses({
	GTA6Part3TestSuite.StructuralTests.class,
	GTA6Part3TestSuite.FunctionalTests.class,
})
@Suite public class GTA6Part3TestSuite {
    @SelectClasses({
    	LaboratoryStructureTest.class
      ,
    })
    @Suite public static class StructuralTests {}

    @SelectClasses({
    	LaboratoryTest.class
      ,
    })
    @Suite public static class FunctionalTests {}
}
package suites;

import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;


@SelectClasses({
      GTA6Part1TestSuite.class
    , GTA6Part2TestSuite.class
    , GTA6Part3TestSuite.class
})
@Suite public class GTA6TestSuite {}


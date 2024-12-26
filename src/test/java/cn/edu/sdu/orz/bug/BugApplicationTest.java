package cn.edu.sdu.orz.bug;

import cn.edu.sdu.orz.bug.entity.*;
import cn.edu.sdu.orz.bug.entity.Module;
import cn.edu.sdu.orz.bug.repository.BugRepository;
import cn.edu.sdu.orz.bug.repository.ModuleRepository;
import cn.edu.sdu.orz.bug.vo.*;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

/**
 * BugApplication test.
 */
@SpringBootTest
public class BugApplicationTest {
    @Mock
    private BugRepository bugRepository;
    @Mock
    private ModuleRepository moduleRepository;

    /**
     * Test entities.
     */
    @Test
    void testEntities() {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        UserRole userRole = new UserRole();
        User user = new User(
                "37A89B5A9D864C7482476CAA52758AC9", "test", "e10adc3949ba59abbe56e057f20f883e",
                "Test User", userRole, "test@example.com", 0, List.of()
        );
        Project project = new Project(
                "37A89B5A9D864C7482476CAA52758AC9", "Project Test",
                "test", "Project Test Description", user, timestamp, List.of()
        );
        Module module = new Module(
                "37A89B5A9D864C7482476CAA52758AC9", "Module Test",
                project, List.of());
        Bug bug = getBug(module, user, timestamp);
        Mockito.when(moduleRepository.findAll()).thenReturn(List.of(module));
        Mockito.when(bugRepository.findAll()).thenReturn(List.of(bug));
    }

    /**
     * Test VOs.
     */
    @Test
    void testVOs() {
        System.out.println(new BugVO());
        System.out.println(new BugVO("", 0, ""));

        System.out.println(new BugCreateVO());
        System.out.println(new BugCreateVO(""));

        System.out.println(new BugQueryVO());
        System.out.println(new BugQueryVO("", "", "", "",
                0, 0, 0, 0));

        System.out.println(new BugUpdateVO());
        System.out.println(new BugUpdateVO("", "", 0, 0, ""));

        System.out.println(new FeatureVO());
        System.out.println(new FeatureVO("", BigDecimal.ZERO));

        System.out.println(new FeatureCreateVO());
        System.out.println(new FeatureCreateVO("", BigDecimal.ZERO, ""));

        System.out.println(new FeatureUpdateVO());
        System.out.println(new FeatureUpdateVO("", BigDecimal.ZERO, "", ""));

        System.out.println(new ModuleCreateVO());
        System.out.println(new ModuleCreateVO("", ""));

        System.out.println(new ProjectVO());
        System.out.println(new ProjectVO(""));

        System.out.println(new ProjectCreateVO());
        System.out.println(new ProjectCreateVO("", "", ""));

        System.out.println(new ProjectQueryVO());
        System.out.println(new ProjectQueryVO(0, 0));

        System.out.println(new ProjectUpdateVO());
        System.out.println(new ProjectUpdateVO("", "", "", ""));

        System.out.println(new ModuleUpdateVO());
        System.out.println(new ModuleUpdateVO(""));

        System.out.println(new TaskAssignVO());
        System.out.println(new TaskAssignVO("", Map.of()));

        System.out.println(new TaskAssignFeatureVO());
        System.out.println(new TaskAssignFeatureVO("", ""));

        System.out.println(new UserVO());
        System.out.println(new UserVO("", "", 0, ""));

        System.out.println(new UserCreateVO());
        System.out.println(new UserCreateVO(""));

        System.out.println(new UserLoginVO());
        System.out.println(new UserLoginVO("", ""));

        System.out.println(new UserPasswordVO());
        System.out.println(new UserPasswordVO("", ""));

        System.out.println(new UserQueryVO());
        System.out.println(new UserQueryVO(0, 0));

        System.out.println(new UserUpdateVO());
        System.out.println(new UserUpdateVO("", "", 0, "", ""));
    }

    private static Bug getBug(Module module, User user, Timestamp timestamp) {
        Feature feature = new Feature(
                "37A89B5A9D864C7482476CAA52758AC9", "Feature Test",
                BigDecimal.ZERO, module, user, List.of()
        );
        BugGrade bugGrade = new BugGrade();
        BugStatus bugStatus = new BugStatus();
        BugSolveType bugSolveType = new BugSolveType();
        return new Bug(
                "37A89B5A9D864C7482476CAA52758AC9", "Bug Test",
                "Bug Test Description", bugGrade,
                user, bugStatus, bugSolveType, timestamp,
                timestamp, feature, List.of()
        );
    }
}

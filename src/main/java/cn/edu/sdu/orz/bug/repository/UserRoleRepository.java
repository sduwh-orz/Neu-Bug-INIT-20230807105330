package cn.edu.sdu.orz.bug.repository;

import cn.edu.sdu.orz.bug.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * User role Repository
 */
@SuppressWarnings("unused")
public interface UserRoleRepository extends JpaRepository<UserRole, Integer>, JpaSpecificationExecutor<UserRole> {

}
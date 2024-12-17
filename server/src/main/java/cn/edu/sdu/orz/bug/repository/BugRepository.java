package cn.edu.sdu.orz.bug.repository;

import cn.edu.sdu.orz.bug.entity.Bug;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BugRepository extends JpaRepository<Bug, String>, JpaSpecificationExecutor<Bug> {

}
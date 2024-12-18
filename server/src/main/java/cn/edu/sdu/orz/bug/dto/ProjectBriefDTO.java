package cn.edu.sdu.orz.bug.dto;

import cn.edu.sdu.orz.bug.entity.Project;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;

public class ProjectBriefDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private String id;

    private String name;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static ProjectBriefDTO toDTO(Project original) {
        ProjectBriefDTO bean = new ProjectBriefDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }
}

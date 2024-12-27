package cn.edu.sdu.orz.bug.vo;

import lombok.Getter;
import lombok.Setter;

/**
 * The type Project create vo.
 */
@Setter
@Getter
public class ProjectCreateVO extends ProjectVO {
    protected String keyword;

    protected String description;

    protected String owner;
}

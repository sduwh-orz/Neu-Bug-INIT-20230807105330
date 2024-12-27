package cn.edu.sdu.orz.bug.vo;

import lombok.Getter;
import lombok.Setter;

/**
 * The type Project query vo.
 */
@Setter
@Getter
public class ProjectQueryVO extends ProjectVO {
    private Integer page;

    private Integer size;
}

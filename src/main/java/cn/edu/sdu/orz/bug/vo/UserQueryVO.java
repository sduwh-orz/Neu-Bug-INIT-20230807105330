package cn.edu.sdu.orz.bug.vo;

import lombok.Getter;
import lombok.Setter;

/**
 * The type User query vo.
 */
@Setter
@Getter
public class UserQueryVO extends UserVO {
    private Integer page;

    private Integer size;
}

package cn.edu.sdu.orz.bug.vo;


/**
 * The type User update vo.
 */
public class UserUpdateVO extends UserVO {

    private String id;

    /**
     * Gets id.
     *
     * @return the id
     */
    public String getId() {
        return id;
    }

    /**
     * Sets id.
     *
     * @param id the id
     */
    public void setId(String id) {
        this.id = id;
    }

    public UserUpdateVO() {
        super();
    }

    public UserUpdateVO(String username, String realName, Integer role, String email, String id) {
        super(username, realName, role, email);
        setId(id);
    }
}

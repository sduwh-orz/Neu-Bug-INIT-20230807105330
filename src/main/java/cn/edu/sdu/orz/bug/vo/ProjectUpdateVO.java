package cn.edu.sdu.orz.bug.vo;

/**
 * The type Project update vo.
 */
public class ProjectUpdateVO extends ProjectCreateVO {

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

    public ProjectUpdateVO() {
        super();
    }

    public ProjectUpdateVO(String keyword, String description, String owner, String id) {
        super(keyword, description, owner);
        setId(id);
    }
}

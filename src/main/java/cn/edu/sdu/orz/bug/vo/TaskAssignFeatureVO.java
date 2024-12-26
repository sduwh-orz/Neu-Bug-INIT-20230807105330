package cn.edu.sdu.orz.bug.vo;

/**
 * The type Task assign feature vo.
 */
public class TaskAssignFeatureVO {

    private String id;

    private String owner;

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

    /**
     * Gets owner.
     *
     * @return the owner
     */
    public String getOwner() {
        return owner;
    }

    /**
     * Sets owner.
     *
     * @param owner the owner
     */
    public void setOwner(String owner) {
        this.owner = owner;
    }

    public TaskAssignFeatureVO() {
        super();
    }

    public TaskAssignFeatureVO(String id, String owner) {
        setId(id);
        setOwner(owner);
    }

    @Override
    public String toString() {
        return "TaskAssignFeatureVO{" +
                "id='" + getId() + '\'' +
                ", owner='" + getOwner() + '\'' +
                '}';
    }
}

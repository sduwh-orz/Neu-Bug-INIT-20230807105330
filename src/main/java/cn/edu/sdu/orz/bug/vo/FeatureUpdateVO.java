package cn.edu.sdu.orz.bug.vo;

import java.math.BigDecimal;

/**
 * The type Feature update vo.
 */
public class FeatureUpdateVO extends FeatureVO {

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

    public FeatureUpdateVO() {
        super();
    }

    public FeatureUpdateVO(String name, BigDecimal hours, String id, String owner) {
        super(name, hours);
        setId(id);
        setOwner(owner);
    }
}

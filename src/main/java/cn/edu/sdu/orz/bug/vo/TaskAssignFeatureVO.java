package cn.edu.sdu.orz.bug.vo;

import java.io.Serializable;

public class TaskAssignFeatureVO implements Serializable {

    private String id;

    private String owner;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }
}

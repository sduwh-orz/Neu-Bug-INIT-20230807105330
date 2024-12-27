package cn.edu.sdu.orz.bug.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

/**
 * The Type Class.
 */
@Getter
@Setter
@MappedSuperclass
@SuppressWarnings("unused")
public class Type {
    @Id
    @Column(name = "id", nullable = false)
    protected Integer id;

    @Column(name = "name", nullable = false)
    protected String name;
}

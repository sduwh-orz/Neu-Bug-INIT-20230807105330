package cn.edu.sdu.orz.bug.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * The type Stats dto.
 */
@Getter
@Setter
public class StatsDTO {
    private String name;
    private String count;

    /**
     * Instantiates a new Stats dto.
     *
     * @param name  the name
     * @param count the count
     */
    public StatsDTO(String name, String count) {
        this.name = name;
        this.count = count;
    }

}

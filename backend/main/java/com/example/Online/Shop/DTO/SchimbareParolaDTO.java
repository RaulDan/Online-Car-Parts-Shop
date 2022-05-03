package com.example.Online.Shop.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SchimbareParolaDTO {

    @JsonProperty("username")
    private String nume;

    @JsonProperty("cod")
    private Integer cod;

    @JsonProperty("parola")
    private String parola;
}

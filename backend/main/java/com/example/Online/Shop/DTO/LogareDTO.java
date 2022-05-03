package com.example.Online.Shop.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class LogareDTO {
    @JsonProperty("username")
    private String username;
    @JsonProperty("password")
    private String password;
}

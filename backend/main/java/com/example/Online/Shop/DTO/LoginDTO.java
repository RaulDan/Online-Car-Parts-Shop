package com.example.Online.Shop.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LoginDTO {

    @JsonProperty("username")
    private String username;

    @JsonProperty("password")
    private String password;
}

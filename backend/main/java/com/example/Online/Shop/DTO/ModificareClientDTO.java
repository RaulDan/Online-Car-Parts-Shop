package com.example.Online.Shop.DTO;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ModificareClientDTO {

    @JsonProperty("nume")
    private String nume;
    @JsonProperty("parola")
    private String parola;
    @JsonProperty("email")
    private String email;
    @JsonProperty("numarTelefon")
    private String numarTelefon;

}

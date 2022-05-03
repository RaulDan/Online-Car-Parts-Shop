package com.example.Online.Shop.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProdusDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("nume")
    private String nume;

    @JsonProperty("descriere")
    private String descriere;

    @JsonProperty("pret")
    private Double pret;

    @JsonProperty("cantitate")
    private Long cantitate;

}

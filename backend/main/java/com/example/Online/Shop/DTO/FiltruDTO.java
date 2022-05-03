package com.example.Online.Shop.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.stereotype.Service;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FiltruDTO {

    @JsonProperty("min")
    @DecimalMin(value="10.0",message="Dati un numar mai mare ca 10")
    private Double min;

    @JsonProperty("max")
   @DecimalMax(value = "500",message = "Dati un numar mai mare ca 500")
    private Double max;
}

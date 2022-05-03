package com.example.Online.Shop.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReviewDTO {

    @JsonProperty("id")
    private Long id;
    @JsonProperty("review")
    private String review;
    @JsonProperty("nume")
    private String numeClient;

}

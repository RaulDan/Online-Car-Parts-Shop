package com.example.Online.Shop.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.w3c.dom.stylesheets.LinkStyle;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder

public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String marca;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
   // @JoinColumn(name="id",referencedColumnName = "id")
    private List<Model> models;

}

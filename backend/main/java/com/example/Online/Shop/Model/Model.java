package com.example.Online.Shop.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.persistence.*;
import java.util.List;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Model {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  Long id;
    private String model;
    //private String marca;

    @OneToMany(targetEntity = Produs.class,fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Produs> produses;

//    @ManyToOne
//    private Marca marca;



}

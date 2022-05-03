package com.example.Online.Shop.Model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import java.util.List;


@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@XmlAccessorType(XmlAccessType.FIELD)
public class Produs {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nume;
    private String descriere;
    private Double pret;
    private Long cantitate;

    @OneToMany(fetch = FetchType.EAGER)
    private List<Review> reviews;


//    @OneToMany(cascade = CascadeType.ALL)
//    @JoinColumn(name = "model_id",referencedColumnName = "id")
//    private List<Model> models;

//    @OneToOne
//    private Model model;






}

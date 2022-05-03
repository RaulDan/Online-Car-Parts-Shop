package com.example.Online.Shop.Link;


import com.example.Online.Shop.Actori.Client;
import com.example.Online.Shop.Model.Produs;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)

public class Comanda {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @XmlTransient
    private Long id;
    @OneToMany
    private List<Produs> produse;
    private String data;
    @OneToOne
    private Client client;
    private Long cantitate;
    private Double pret;
    private String cod;

}


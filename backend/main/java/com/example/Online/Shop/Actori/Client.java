package com.example.Online.Shop.Actori;

import com.example.Online.Shop.Model.Logari;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlTransient;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@XmlAccessorType(XmlAccessType.FIELD)

public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @XmlTransient
    private Long id;

    private String nume;
    @XmlTransient
    private String parola;
    private String email;
    @Size(min=10,max=10,message = "Numarul de telefon trebuie sa contina 10 cifre")
    private String numarTelefon;
    //Istoricul logarilor
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @XmlTransient
    private List<Logari> istoricLogari;

}

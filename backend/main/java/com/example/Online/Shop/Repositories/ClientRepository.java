package com.example.Online.Shop.Repositories;

import com.example.Online.Shop.Actori.Client;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends CrudRepository<Client,Long> {

    Client findFirstById(Long id);
    Client findFirstByIdAndParola(Long id,String pass);
    Client findFirstByNume(String nume);
    Client findFirstByNumeAndParola(String nume,String parola);
    List<Client> findAll();


}
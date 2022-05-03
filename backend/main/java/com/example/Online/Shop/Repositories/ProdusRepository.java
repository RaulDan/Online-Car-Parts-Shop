package com.example.Online.Shop.Repositories;

import com.example.Online.Shop.Model.Marca;
import com.example.Online.Shop.Model.Model;
import com.example.Online.Shop.Model.Produs;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdusRepository extends CrudRepository<Produs,Long> {

    Produs findFirstById(Long id);
    Produs findFirstByNume(String nume);
    List<Produs> findAll();

}

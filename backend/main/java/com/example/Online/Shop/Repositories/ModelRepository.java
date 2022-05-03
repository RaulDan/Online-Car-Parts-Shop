package com.example.Online.Shop.Repositories;

import com.example.Online.Shop.Model.Marca;
import com.example.Online.Shop.Model.Model;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModelRepository extends CrudRepository<Model,Long> {

    Model findFirstByModel(String model);
    Model findFirstByIdAndModel(Long id,String model);


}

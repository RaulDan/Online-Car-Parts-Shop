package com.example.Online.Shop.Repositories;

import com.example.Online.Shop.Model.Marca;
import com.example.Online.Shop.Model.Model;
import org.dom4j.rule.Mode;
//import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface MarcaRepository extends CrudRepository<Marca,Long> {

   Marca findFirstByMarca(String marca);
   List<Marca> findAll();
   List<Model> findAllByMarca(Marca marca);
   //List<Model> findAllModels();



}

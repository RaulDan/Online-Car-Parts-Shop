package com.example.Online.Shop.Service;

import com.example.Online.Shop.DTO.ModelDTO;
import com.example.Online.Shop.Model.Marca;
import com.example.Online.Shop.Model.Model;
import com.example.Online.Shop.Model.Produs;
import org.dom4j.rule.Mode;
import org.springframework.stereotype.Component;

import java.util.List;

@Component

public interface ModelService {

    List<Model> findAll(String marca);

    List<Produs> findAllProd(ModelDTO modelDTO) ;

}

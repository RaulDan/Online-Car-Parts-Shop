package com.example.Online.Shop.Service;

import com.example.Online.Shop.DTO.MarcaDTO;
import com.example.Online.Shop.Model.Marca;
import com.example.Online.Shop.Model.Model;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface MarcaService {

    List<Marca> findAll();
    List<Model> findAllForMarca(MarcaDTO marcaDTO);
    //List<String> findAllMarca();
}

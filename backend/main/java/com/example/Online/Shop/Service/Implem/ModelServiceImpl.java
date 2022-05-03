package com.example.Online.Shop.Service.Implem;


import com.example.Online.Shop.DTO.ModelDTO;
import com.example.Online.Shop.Model.Marca;
import com.example.Online.Shop.Model.Model;
import com.example.Online.Shop.Model.Produs;
import com.example.Online.Shop.Repositories.MarcaRepository;
import com.example.Online.Shop.Repositories.ModelRepository;
import com.example.Online.Shop.Service.ModelService;
import lombok.RequiredArgsConstructor;
import org.dom4j.rule.Mode;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ModelServiceImpl implements ModelService {

    private final ModelRepository modelRepository;
    private final MarcaRepository marcaRepository;
    @Override
    public List<Model> findAll(String marca) {
        Marca marca1=marcaRepository.findFirstByMarca(marca);
        System.out.println(marca1+" afisam marca");
        return marcaRepository.findAllByMarca(marca1);
    }

    @Override
    public List<Produs> findAllProd(ModelDTO modelDTO) {

        System.out.println("MOdel:"+modelDTO);
        Model model=modelRepository.findFirstByModel(modelDTO.getModel());
        return  model.getProduses();
    }
}

package com.example.Online.Shop.Service.Implem;

import com.example.Online.Shop.DTO.MarcaDTO;
import com.example.Online.Shop.Model.Marca;
import com.example.Online.Shop.Model.Model;
import com.example.Online.Shop.Repositories.MarcaRepository;
import com.example.Online.Shop.Service.MarcaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MarcaServiceImpl implements MarcaService {

    private final MarcaRepository marcaRepository;
    @Override
    public List<Marca> findAll() {

        return this.marcaRepository.findAll();
    }

    @Override
    public List<Model> findAllForMarca(MarcaDTO marcaDTO) {

        Marca marca=marcaRepository.findFirstByMarca(marcaDTO.getMarca());
        System.out.println("Service Marca");
        System.out.println(marca.getModels());
        return marca.getModels();

    }

//    @Override
//    public List<String> findAllMarca() {
//        return marcaRepository.findMarca();
//    }
}

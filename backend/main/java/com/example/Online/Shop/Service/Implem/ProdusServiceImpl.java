package com.example.Online.Shop.Service.Implem;

import com.example.Online.Shop.DTO.*;
import com.example.Online.Shop.Model.Marca;
import com.example.Online.Shop.Model.Produs;
import com.example.Online.Shop.Repositories.MarcaRepository;
import com.example.Online.Shop.Repositories.ProdusRepository;
import com.example.Online.Shop.Service.ProdusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.sound.sampled.Port;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdusServiceImpl implements ProdusService {

    private final ProdusRepository produsRepository;
    private final MarcaRepository marcaRepository;

    @Override
    public List<Produs> findAll() {
        return produsRepository.findAll();
    }

    @Override
    public List<Produs> filtru(FiltruDTO dto) {
        System.out.println("Service:"+dto);
        Double min=dto.getMin();
        Double max=dto.getMax();
//        Double min=Double.parseDouble(dto.getMinim());
//        Double max=Double.parseDouble(dto.getMaxim());
        List<Produs> all=produsRepository.findAll();
        System.out.println(all);
        List<Produs> result=new ArrayList<>();
        for(Produs p:all)
        {
            if(p.getPret()>min && p.getPret()<max){
                System.out.println("PRod:"+p);
                Produs aux=p;
                result.add(aux);
            }
        }

        return  result;
    }


    @Override
    @Transactional
    public Produs sterge(Long id) {

        Produs p=produsRepository.findFirstById(id);
        produsRepository.delete(p);
        return p;

    }

    @Override
    @Transactional
    public Produs modifica(Long id, ProdusDTO dto) {

        Produs p=produsRepository.findFirstById(id);
        if(!(dto.getNume().equals(null)))
        {
            p.setNume(dto.getNume());
        }
        if(!(dto.getDescriere().equals(null) )){
            p.setDescriere(dto.getDescriere());
        }

        if(!(dto.getPret().equals(null))){
            p.setPret(dto.getPret());
        }
        if(!(dto.getCantitate().equals(null)))
        {
            p.setCantitate(dto.getCantitate());

        }
        return p;

    }




}

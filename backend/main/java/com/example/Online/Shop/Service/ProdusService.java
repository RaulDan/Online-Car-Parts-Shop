package com.example.Online.Shop.Service;

import com.example.Online.Shop.DTO.*;
import com.example.Online.Shop.Model.Produs;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ProdusService {

    List<Produs> findAll();
    List<Produs> filtru(FiltruDTO dto);
    Produs sterge(Long id);
    Produs modifica(Long id, ProdusDTO dto);


}

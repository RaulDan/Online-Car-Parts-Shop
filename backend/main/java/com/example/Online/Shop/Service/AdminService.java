package com.example.Online.Shop.Service;

import com.example.Online.Shop.Actori.Client;
import com.example.Online.Shop.DTO.*;
import com.example.Online.Shop.Exceptii.ApiExceptionResponse;
import com.example.Online.Shop.Link.Comanda;
import com.example.Online.Shop.Model.Produs;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface AdminService {

    String sendMail(RegisterClientDTO registerClientDTO);
    String procesareComanda(List<ProdusDTO> produsDTOList, Long id);
    SchimbareParolaDTO trimitereMailCodParola(String numeClient) throws ApiExceptionResponse;
    Client schimbareParola(SchimbareParolaDTO dto);
    String login(LogareDTO dto);
    String mailComanda(Long id,DataDTO dto);


}

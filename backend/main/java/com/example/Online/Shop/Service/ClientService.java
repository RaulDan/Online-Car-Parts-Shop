package com.example.Online.Shop.Service;

import com.example.Online.Shop.Actori.Client;
import com.example.Online.Shop.DTO.*;
import com.example.Online.Shop.Exceptii.ApiExceptionResponse;
import com.example.Online.Shop.Model.Logari;
import com.example.Online.Shop.Model.Review;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public interface ClientService {

    Client save(RegisterClientDTO registerClientDTO);

    Client logare(LogareDTO dto) throws ApiExceptionResponse;

    List<Client> findAll();

    Client modifica(Long id, ModificareClientDTO dto,String mesaj,String data);

    String review(ReviewDTO dto);

    List<Review> findAllReviews(Long id);

    Client findFirstByID(Long id);

    List<Logari> logari(Long id);

    String abuz(Long id,String text);


}

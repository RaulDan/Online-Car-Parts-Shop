package com.example.Online.Shop.Repositories;

import com.example.Online.Shop.Model.Notificare;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificareRepository extends CrudRepository<Notificare,Long> {

    List<Notificare> findAll();
}

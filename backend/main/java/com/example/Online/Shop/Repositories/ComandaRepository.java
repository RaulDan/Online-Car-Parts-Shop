package com.example.Online.Shop.Repositories;

import com.example.Online.Shop.Link.Comanda;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComandaRepository extends CrudRepository<Comanda,Long>
{

}

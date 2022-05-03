package com.example.Online.Shop.Repositories;

import com.example.Online.Shop.Actori.Admin;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends CrudRepository<Admin,Long> {

    Admin findFirstByNume(String nume);
    Admin findFirstByParola(String pss);
    Admin findFirstByNumeAndParola(String nume,String pss);
}

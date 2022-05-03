package com.example.Online.Shop.Repositories;

import com.example.Online.Shop.Model.Review;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends CrudRepository<Review,Long> {


}

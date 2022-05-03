package com.example.Online.Shop.Controler;

import com.example.Online.Shop.DTO.*;
import com.example.Online.Shop.Repositories.ClientRepository;
import com.example.Online.Shop.Service.ClientService;
import com.example.Online.Shop.Service.MarcaService;
import com.example.Online.Shop.Service.ModelService;
import com.example.Online.Shop.Service.ProdusService;
import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.metadata.HsqlTableMetaDataProvider;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin

@RequiredArgsConstructor
public class ProdusControler {

    private final ProdusService produsService;
    private final ModelService modelService;
    private final MarcaService marcaService;
    private final ClientService clientService;


    @PostMapping("produs")
    public ResponseEntity returnClient(ClientDTO clientDTO)
    {
        return  null;
    }

    @GetMapping("AllProd")
    public ResponseEntity findProducts(){

        return ResponseEntity.status(HttpStatus.OK).body(produsService.findAll());
    }

    @PostMapping("AllProdMarca")
    public  ResponseEntity findProductsMarca(@RequestBody MarcaDTO marca)
    {

        return ResponseEntity.status(HttpStatus.OK).body(marcaService.findAllForMarca(marca));
    }



    @PostMapping("AllProduseModel")
    public ResponseEntity findAllProducts(@RequestBody ModelDTO dto)
    {

        return ResponseEntity.status(HttpStatus.OK).body(modelService.findAllProd(dto));
    }


    //Iau toate revieurile pentru un produs
    @PostMapping("/Reviews")
    public ResponseEntity reviews(@RequestBody String val)
    {

        Long id=Long.parseLong(val);
        return ResponseEntity.status(HttpStatus.OK).body(clientService.findAllReviews(id));
        //return null;
    }

    @PutMapping("/ModificareProdus/{id}")
    public  ResponseEntity modificareProdus(@PathVariable Long id, @RequestBody ProdusDTO dto)
    {

        return ResponseEntity.status(HttpStatus.OK).body(produsService.modifica(id,dto));
    }




    @DeleteMapping("/Stergere/{id}")
    public ResponseEntity sterge(@PathVariable Long id)
    {


        return ResponseEntity.status(HttpStatus.OK).body(produsService.sterge(id));

    }

}

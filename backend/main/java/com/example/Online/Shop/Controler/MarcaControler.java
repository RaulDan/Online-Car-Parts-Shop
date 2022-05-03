package com.example.Online.Shop.Controler;

import com.example.Online.Shop.DTO.MarcaDTO;
import com.example.Online.Shop.Repositories.MarcaRepository;
import com.example.Online.Shop.Service.MarcaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class MarcaControler {

    private final MarcaService marcaService;
    @PostMapping("/marca")
    public ResponseEntity returnMarca(MarcaDTO marcaDTO)
    {
        return  null;
    }

    @GetMapping("AllMarca")
    public ResponseEntity findMarca(){

        return ResponseEntity.status(HttpStatus.OK).body(marcaService.findAll());
       // return ResponseEntity.status(HttpStatus.OK).body(marcaService.findAllMarca());
    }
}

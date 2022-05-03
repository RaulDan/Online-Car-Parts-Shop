package com.example.Online.Shop.Controler;

import com.example.Online.Shop.DTO.MarcaDTO;
import com.example.Online.Shop.DTO.ModelDTO;
import com.example.Online.Shop.Service.Implem.MarcaServiceImpl;
import com.example.Online.Shop.Service.Implem.ModelServiceImpl;
import com.example.Online.Shop.Service.MarcaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class ModelControler {

    private final ModelServiceImpl modelServiceImpl;
    private final MarcaServiceImpl marcaServiceImpl;

    @PostMapping("/modelMasina")
    public ResponseEntity returnModel(ModelDTO modelDTO)
    {
        return  null;
    }

    @GetMapping("/AllModels")
    public ResponseEntity returnModels(MarcaDTO marca)
    {
        System.out.println("Returnam marcile "+marca);
        return ResponseEntity.status(HttpStatus.OK).body(modelServiceImpl.findAll(marca.getMarca()));
    }
}

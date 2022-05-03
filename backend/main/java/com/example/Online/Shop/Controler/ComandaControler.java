package com.example.Online.Shop.Controler;


import com.example.Online.Shop.DTO.DataDTO;
import com.example.Online.Shop.DTO.ProdusDTO;
import com.example.Online.Shop.Repositories.ClientRepository;
import com.example.Online.Shop.Service.Implem.AdminServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class ComandaControler {

    private final SimpMessagingTemplate messagingTemplate;
    private final AdminServiceImpl adminServiceImpl;
    private final ClientRepository clientRepository;


    @PostMapping("/Comm/{id}")
    public  ResponseEntity comm(@PathVariable Long id,@RequestBody List<ProdusDTO> produsDTO){

        return ResponseEntity.status(HttpStatus.OK).body(adminServiceImpl.procesareComanda(produsDTO,id));

    }

    @PostMapping("/MailComanda/{id}")
    public ResponseEntity mail(@PathVariable Long id, @RequestBody DataDTO dto)
    {
        System.out.println("XXXXXXX:"+dto);
        return ResponseEntity.status(HttpStatus.OK).body(adminServiceImpl.mailComanda(id,dto));
    }




}

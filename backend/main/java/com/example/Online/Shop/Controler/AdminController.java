package com.example.Online.Shop.Controler;

import com.example.Online.Shop.Actori.Client;
import com.example.Online.Shop.DTO.ConditieDTO;
import com.example.Online.Shop.DTO.FiltruDTO;
import com.example.Online.Shop.Repositories.AdminRepository;
import com.example.Online.Shop.Service.Implem.AdminServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class AdminController {

    private final AdminServiceImpl adminService;

    @PostMapping("/salvareLogIn")
    public ResponseEntity salvareLogIn(@RequestBody Client client)
    {


        return null;
    }


}

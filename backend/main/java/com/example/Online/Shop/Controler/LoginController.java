package com.example.Online.Shop.Controler;

import com.example.Online.Shop.Actori.Client;
import com.example.Online.Shop.DTO.LogareDTO;
import com.example.Online.Shop.DTO.LoginDTO;
import com.example.Online.Shop.DTO.RegisterClientDTO;
import com.example.Online.Shop.Service.ClientService;
import com.example.Online.Shop.Service.Implem.AdminServiceImpl;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequiredArgsConstructor
public class LoginController {

    private final ClientService clientService;
    private final AdminServiceImpl adminService;

    @PostMapping("/loginAdmin")
    public ResponseEntity logareAdmin(@RequestBody LogareDTO dto)
    {

        return ResponseEntity.status(HttpStatus.OK).body(adminService.login(dto));


    }




}

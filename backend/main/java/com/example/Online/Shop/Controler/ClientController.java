package com.example.Online.Shop.Controler;

import com.example.Online.Shop.Actori.Client;
import com.example.Online.Shop.DTO.*;
import com.example.Online.Shop.Exceptii.ApiExceptionResponse;
import com.example.Online.Shop.Model.Produs;
import com.example.Online.Shop.Repositories.ClientRepository;
import com.example.Online.Shop.Service.Implem.AdminServiceImpl;
import com.example.Online.Shop.Service.Implem.ClientServiceImpl;
import com.example.Online.Shop.Service.Implem.ProdusServiceImpl;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@RequestMapping
@RestController
@CrossOrigin
@RequiredArgsConstructor
public class ClientController {

    private final ClientServiceImpl clientServiceImpl;
    private final AdminServiceImpl adminServiceImpl;
    private final ClientRepository clientRepository;





    public PasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

    @ApiOperation(value = "Register a new client")
    @PostMapping("/RegClient")//Metoda prin care inregistrez un nou client in magazin
    public ResponseEntity saveClient2(@ApiParam(value = "Creare Client")@RequestBody RegisterClientDTO client){


        return ResponseEntity.status(HttpStatus.OK).body(adminServiceImpl.sendMail(client));


    }

    @PutMapping("/modificaClient/{id}")
    public ResponseEntity modificaClient(@PathVariable Long id, @RequestBody ModificareClientDTO dto)
    {

        String data = new SimpleDateFormat("dd-MM-yyyy 'at' HH:mm:ss").format(new Date());
        String mesaj="Modificare Date Client\n";
        mesaj+="Clientul "+dto.getNume()+" si-a modificat datele\n";
        mesaj+="Datele vechi erau:\nNume:"+dto.getNume()+"\nParola:"+dto.getParola()+"\nEmail:"+dto.getEmail()+"\nNumarTelefon:"+dto.getNumarTelefon()+"\n";
        return ResponseEntity.status(HttpStatus.OK).body(clientServiceImpl.modifica(id,dto,mesaj,data));

    }



    @PostMapping("/review")
    //id produs
    //Nume Client
    //Review
    public ResponseEntity adaugareReview(@RequestBody ReviewDTO dto)
    {
        return ResponseEntity.status(HttpStatus.OK).body(clientServiceImpl.review(dto));


    }

    @PostMapping("/forgotpassword")//Trimit codul care se genereaza cand schimb parola
    public ResponseEntity trimitereCod(@RequestBody SchimbareParolaDTO dto) throws ApiExceptionResponse {

        return ResponseEntity.status(HttpStatus.OK).body(adminServiceImpl.trimitereMailCodParola(dto.getNume()));
    }

    @PostMapping("/modificareParola")//Modific efectiv parola cu cea data de utilizator
    public ResponseEntity modificaParola(@RequestBody SchimbareParolaDTO dto)
    {

            return ResponseEntity.status(HttpStatus.OK).body(adminServiceImpl.schimbareParola(dto));
    }

    @PostMapping("/Abuz/{id}")
    public ResponseEntity raportareAbuz(@PathVariable Long id,@RequestBody DataDTO dto)
    {

        return ResponseEntity.status(HttpStatus.OK).body(clientServiceImpl.abuz(id,dto.getData()));
    }

    @ApiOperation(value = "Login client")

    @GetMapping("AllClients")
    public ResponseEntity findClients()
    {

        return  ResponseEntity.status(HttpStatus.OK).body(clientServiceImpl.findAll());
    }

    @PostMapping("/login")
    public ResponseEntity saveClient(@ApiParam(value = "Logare Client") @RequestBody LogareDTO dto) throws ApiExceptionResponse
    {

        return  ResponseEntity.status(HttpStatus.OK).body(clientServiceImpl.logare(dto));


    }

    @PostMapping("/dataLogari/{id}")
    public ResponseEntity getLogs(@PathVariable Long id){

        return  ResponseEntity.status(HttpStatus.OK).body(clientServiceImpl.logari(id));
    }

    @PostMapping("/logout/{id}")
    @Transactional
    public ResponseEntity logOut(@PathVariable Long id){
        Client c=clientServiceImpl.findFirstByID(id);

        if(c.getIstoricLogari().get(c.getIstoricLogari().size()-1).getDataLogin()==null){
            return ResponseEntity.status(HttpStatus.OK).body("bad");

        }
        else{
            String data = new SimpleDateFormat("dd-MM-yyyy 'at' HH:mm:ss").format(new Date());
            c.getIstoricLogari().get(c.getIstoricLogari().size()-1).setDataLogout(data);
            clientRepository.save(c);
        }
        return ResponseEntity.status(HttpStatus.OK).body("ok");
    }

}
